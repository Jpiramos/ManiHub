// src/server/lib/jwt.ts
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;

export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const setTokenCookie = (res: NextApiResponse, token: string) => {
  const isProd = process.env.NODE_ENV === 'production';
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax', // ou 'strict' conforme seu fluxo
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // em segundos (7 dias)
  });
  res.setHeader('Set-Cookie', cookie);
};

export const clearTokenCookie = (res: NextApiResponse) => {
  const cookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  res.setHeader('Set-Cookie', cookie);
};
