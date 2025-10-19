import express from 'express';

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post('/', authController.create);
authRouter.get('/', authController.findAll);
authRouter.get('/:id', authController.findOne);
authRouter.patch('/:id', authController.update);
authRouter.delete('/:id', authController.remove);

export default authRouter;