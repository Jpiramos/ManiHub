'use client';

import { useState } from 'react';
//@ts-ignore
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Erro ao fazer login');
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-purple-100 p-6">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-10 sm:p-12">
        <h1 className="text-4xl font-extrabold text-pink-600 text-center mb-8 tracking-wide">
          Bem-vinda ao Manihub
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-pink-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="exemplo@email.com"
              className="w-full rounded-xl border border-pink-300 bg-pink-50 px-5 py-3
                text-pink-900 placeholder-pink-400
                focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400
                transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-pink-700 mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-pink-300 bg-pink-50 px-5 py-3
                text-pink-900 placeholder-pink-400
                focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400
                transition duration-200"
            />
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white
              transition-colors duration-200
              ${
                loading
                  ? 'bg-pink-300 cursor-not-allowed'
                  : 'bg-pink-500 hover:bg-pink-600'
              }`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-8 text-center text-pink-700 text-sm select-none">
          Não tem conta?{' '}
          <a href="/signup" className="font-semibold underline hover:text-pink-900">
            Cadastre-se aqui
          </a>
        </p>
      </div>
    </main>
  );
}
