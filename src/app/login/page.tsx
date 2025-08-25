'use client';

import { useState } from 'react';
//@ts-ignore
import Link from 'next/link';
import { Button } from "../../components/ui/button.tsx";
import { Card } from "../../components/ui/card.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";

export default function LoginPage() {
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

      // Navegação no Next.js 13+ (App Router)
      window.location.href = '/'; 
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-background p-6">
      <div className="w-full max-w-md">
        <Card className="bg-gradient-card border-0 shadow-elegant p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              ManiHub
            </h1>
            <p className="text-muted-foreground text-lg">Bem-vinda de volta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="exemplo@email.com"
                className="rounded-xl border-border bg-background/50 focus:bg-background transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="rounded-xl border-border bg-background/50 focus:bg-background transition-colors"
              />
            </div>

            {error && (
              <div className="text-destructive font-medium text-center text-sm bg-destructive/10 py-3 px-4 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} variant="hero" className="w-full">
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Não tem conta?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:text-accent transition-colors">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
