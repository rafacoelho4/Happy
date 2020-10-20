import { Router } from 'express';
import multer from 'multer';
import OrphanageController from './controllers/OrphanageController';
import UserController from './controllers/UserController';
import authController from './controllers/authController';
import uploadConfig from './config/upload';
import authMiddleware from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:id', OrphanageController.show);
routes.post('/orphanages', authMiddleware, upload.array('images'), OrphanageController.create);
routes.delete('/orphanages/:id', OrphanageController.destroy);

routes.get('/users', UserController.index);
routes.get('/users/:id', authMiddleware, UserController.show);
routes.post('/users', UserController.create);
routes.delete('/users/:id', UserController.destroy);

routes.post('/auth', authController.authenticate);

export default routes;