import { Router } from 'express';
import * as userController from '../controllers/userController.ts';

const router = Router();

console.log('userRoutes carregado');


router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);



export default router;
