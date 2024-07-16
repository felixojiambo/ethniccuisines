import express from 'express';
import { RestaurantController } from './restaurant.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const restaurantController = new RestaurantController();

router.post('/', authMiddleware, (req, res) => restaurantController.create(req, res));
router.get('/', (req, res) => restaurantController.getAll(req, res));
router.get('/:id', (req, res) => restaurantController.getById(req, res));
router.put('/:id', authMiddleware, (req, res) => restaurantController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => restaurantController.delete(req, res));

export { router as restaurantRouter };
