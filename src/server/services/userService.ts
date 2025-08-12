import { Role } from '@prisma/client';
import prisma from '../lib/prisma.ts';
import bcrypt from 'bcrypt';

export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      avatarUrl: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createUser = async (data: { name?: string; email: string; password: string; role?: Role; phone?: string; avatarUrl?: string; }) => {
  const hashedPassword = await bcrypt.hash(data.password, 12);

  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        phone: data.phone,
        avatarUrl: data.avatarUrl,
      },
    });
  } catch (error: any) {
    // Prisma unique constraint
    if (error.code === 'P2002') {
      throw new Error('EmailAlreadyExists');
    }
    throw error;
  }
};


export const updateUser = async (
  id: number,
  data: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    phone?: string;
    avatarUrl?: string;
    isActive?: boolean;
  }
) => {
  // Construir objeto somente com campos definidos (sem null ou undefined)
  const updateData: any = {};
for (const key in data) {
  const typedKey = key as keyof typeof data;
  if (data[typedKey] !== undefined && data[typedKey] !== null) {
    updateData[typedKey] = data[typedKey];
  }
}



  // Se senha for passada, faz hash
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  console.log('Dados para update no prisma:', updateData);

  try {
    // Atualiza usuário pelo prisma
    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  } catch (error: any) {
    // Se não achar o usuário no banco, lança erro customizado
    if (error.code === 'P2025') {
      throw new Error('UserNotFound');
    }
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};
