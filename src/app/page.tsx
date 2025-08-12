// src/client/app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
        Bem-vindo ao Manihub!
      </h1>
      <p className="text-lg text-gray-700">
        Essa é a sua primeira página usando Next.js App Router com Tailwind CSS.
      </p>
      <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Clique aqui
      </button>
    </main>
  );
}
