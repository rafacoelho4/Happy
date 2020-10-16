import { Router } from 'express';
import OrphanageController from './controllers/OrphanageController';

const routes = Router();

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:id', OrphanageController.show);
routes.post('/orphanages', OrphanageController.create);
routes.delete('/orphanages/:id', OrphanageController.destroy);

export default routes;