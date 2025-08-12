import { Request, Response } from 'express';
import * as userService from '../services/userService.ts';
import { Role } from '@prisma/client';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone, avatarUrl } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    // Validar e converter role para enum Role
    let userRole: Role | undefined;
    if (role && Object.values(Role).includes(role)) {
      userRole = role as Role;
    } else {
      userRole = undefined; // Ou Role.CLIENT para definir padrão, se quiser
    }

    const user = await userService.createUser({ name, email, password, role: userRole, phone, avatarUrl });

    // Remover password antes de enviar resposta
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // Pega o id da rota e converte para número
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    

    const data = req.body;

    
    console.log('ID para atualizar:', id);
    console.log('Dados recebidos para atualização:', data);

    // Valida e converte role se for passado
    if (data.role && Object.values(Role).includes(data.role)) {
      data.role = data.role as Role;
    } else {
      delete data.role; // remove se inválido
    }

    // Se senha vazia, não atualiza
    if (data.password === '') {
      delete data.password;
    }

    // Chama o service para atualizar
    const updatedUser = await userService.updateUser(id, data);

    // Remove password da resposta
    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);

  } catch (error: any) {
    if (error.message === 'UserNotFound') {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};
