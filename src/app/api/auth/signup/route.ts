import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { bucket } from "../../../../server/lib/firebaseAdmin.ts";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await (request as any).formData();

    const nome = formData.get("nome")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const celular = formData.get("celular")?.toString() ?? "";
    const foto = formData.get("foto") ?? null;

    console.log("Signup request:", {
      nome,
      email,
      celular,
      hasFile: !!foto,
      bucketName: bucket?.name,
    });

    if (!nome || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Dados obrigatórios faltando" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const celularRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (celular && !celularRegex.test(celular)) {
      return new Response(
        JSON.stringify({ message: "Celular inválido. Use (00) 00000-0000" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "Email já cadastrado" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let avatarUrl: string | null = null;

    if (foto && bucket) {
      try {
        const arrayBuffer = await (foto as any).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const originalName = ((foto as any).name ?? "avatar").toString();
        const filename = `${Date.now()}-${originalName.replace(/\s+/g, "_")}`;
        const remotePath = `avatars/${filename}`;

        const file = bucket.file(remotePath);

        await file.save(buffer, { contentType: (foto as any).type || "application/octet-stream" });
        await file.makePublic();

        avatarUrl = `https://storage.googleapis.com/${bucket.name}/${remotePath}`;
        console.log("✅ Upload realizado:", avatarUrl);
      } catch (uploadErr) {
        console.error("❌ Erro no upload da foto:", uploadErr);
        return new Response(
          JSON.stringify({ message: "Falha ao fazer upload da foto" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    } else if (!bucket) {
      console.warn("⚠️ Bucket não inicializado — pula upload da foto.");
    }

    const newUser = await prisma.user.create({
      data: {
        name: nome,
        email,
        phone: celular || null,
        password: hashedPassword,
        avatarUrl,
      },
    });

    console.log("✅ Usuário criado, id:", newUser.id);

    return new Response(
      JSON.stringify({ message: "Usuário criado", userId: newUser.id, avatarUrl }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Erro no signup:", err);
    return new Response(
      JSON.stringify({ message: "Erro interno no servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
