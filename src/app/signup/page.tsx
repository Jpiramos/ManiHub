'use client';

import { useState } from 'react';
//@ts-ignore
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  // Formata celular enquanto digita
  const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setCelular(value);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validação celular
    const celularRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!celularRegex.test(celular)) {
      setError('Número de celular inválido. Use o formato (00) 00000-0000');
      setLoading(false);
      return;
    }

    try {
      let avatarUrl: string | null = null;

      // Upload da foto para ImgBB
      if (foto) {
        const formData = new FormData();
        formData.append('image', foto);

        const resImg = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
          method: "POST",
          body: formData
        });

        const dataImg = await resImg.json();
        if (!resImg.ok || !dataImg.data?.url) throw new Error('Falha ao enviar imagem para ImgBB');
        avatarUrl = dataImg.data.url;
        console.log('URL da foto enviada:', avatarUrl);
      }

      // Envia dados do usuário para backend
      const res = await fetch('http://localhost:2222/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome,
          email,
          phone: celular,
          password,
          avatarUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
      // Checa erros específicos retornados do backend
      if (data.message === 'EmailAlreadyExists') {
        throw new Error('Esse email já está cadastrado.');
      }
      if (data.message === 'PhoneAlreadyExists') {
        throw new Error('Esse número de celular já está cadastrado.');
      }
      throw new Error(data.message || 'Erro ao criar usuário');
    }
      alert('Conta criada com sucesso!');
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-purple-100 p-6">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-10 sm:p-12">
        <h1 className="text-4xl font-extrabold text-pink-600 text-center mb-8 tracking-wide">
          Criar conta no Manihub
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-pink-700 mb-2">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Seu nome completo"
              className="w-full rounded-xl border border-pink-300 bg-pink-50 px-5 py-3 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="foto" className="block text-sm font-medium text-pink-700 mb-2">
              Foto de Perfil
            </label>
            <input
              id="foto"
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files?.[0] || null)}
              className="w-full rounded-xl border border-pink-300 bg-pink-50 px-3 py-2 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-pink-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="exemplo@email.com"
              className="w-full rounded-xl border border-pink-300 bg-pink-50 px-5 py-3 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="celular" className="block text-sm font-medium text-pink-700 mb-2">
              Celular
            </label>
            <input
              id="celular"
              type="tel"
              value={celular}
              onChange={handleCelularChange}
              placeholder="(00) 00000-0000"
              required
              className="w-full rounded-xl border border-pink-300 bg-pink-50 px-5 py-3 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-pink-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-pink-300 bg-pink-50 px-5 py-3 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition duration-200"
            />
          </div>

          {error && <p className="text-red-600 font-semibold text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-colors duration-200 ${loading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'
              }`}
          >
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        <p className="mt-8 text-center text-pink-700 text-sm select-none">
          Já tem conta?{' '}
          <a href="/login" className="font-semibold underline hover:text-pink-900">
            Entre aqui
          </a>
        </p>
      </div>
    </main>
  );
}
