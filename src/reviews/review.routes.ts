import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { authMiddleware } from '../middleware/authMiddleware';
import { reviewController } from './review.controller';
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  [
    check('restaurantId').not().isEmpty().withMessage('Restaurant ID is required'),
    check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    check('comment').not().isEmpty().withMessage('Comment is required'),
  ],
  (req: Request, res: Response) => reviewController.createReview(req, res)
);

router.get('/', (req: Request, res: Response) => reviewController.getReviews(req, res));
router.get('/:id', (req: Request, res: Response) => reviewController.getReview(req, res));

router.put('/:id', authMiddleware, (req: Request, res: Response) => reviewController.updateReview(req, res));

router.delete('/:id', authMiddleware, (req: Request, res: Response) => reviewController.deleteReview(req, res));

export { router as reviewRouter };
