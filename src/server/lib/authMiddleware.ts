// src/server/lib/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './jwt.ts';
import cookie from 'cookie';

export const getUserFromRequest = (req: NextApiRequest) => {
  try {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies.token;
    if (!token) return null;
    const payload = verifyToken(token as string);
    return payload; // contém userId, role, iat, exp
  } catch {
    return null;
  }
};

export const requireAuth = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = getUserFromRequest(req);
    if (!payload) return res.status(401).json({ message: 'Não autenticado' });
    // anexar payload se precisar:
    // @ts-ignore
    req.user = payload;
    return handler(req, res);
  };
};
