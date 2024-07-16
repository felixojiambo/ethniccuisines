import { Request, Response } from 'express';
import { reviewService } from './review.service';

class ReviewController {
  async createReview(req: Request, res: Response): Promise<Response> {
    try {
      const { restaurantId, rating, comment } = req.body;
      const userId = (req.user as { _id: string })._id;

      const review = await reviewService.createReview(userId, restaurantId, rating, comment);
      return res.status(201).send(review);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create review';
      return res.status(500).send({ error: errorMessage });
    }
  }

  async getReviews(req: Request, res: Response): Promise<Response> {
    try {
      const reviews = await reviewService.getReviews();
      return res.status(200).send(reviews);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reviews';
      return res.status(500).send({ error: errorMessage });
    }
  }

  async getReview(req: Request, res: Response): Promise<Response> {
    try {
      const review = await reviewService.getReview(req.params.id);
      if (!review) {
        return res.status(404).send({ error: 'Review not found' });
      }
      return res.status(200).send(review);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch review';
      return res.status(500).send({ error: errorMessage });
    }
  }

  async updateReview(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req.user as { _id: string })._id;
      const review = await reviewService.updateReview(req.params.id, userId, req.body);
      return res.status(200).send(review);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update review';
      if (errorMessage === 'Review not found') {
        return res.status(404).send({ error: 'Review not found' });
      }
      if (errorMessage === 'Unauthorized') {
        return res.status(403).send({ error: 'Unauthorized' });
      }
      return res.status(500).send({ error: errorMessage });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req.user as { _id: string })._id;
      await reviewService.deleteReview(req.params.id, userId);
      return res.status(200).send({ message: 'Review deleted successfully' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete review';
      if (errorMessage === 'Review not found') {
        return res.status(404).send({ error: 'Review not found' });
      }
      if (errorMessage === 'Unauthorized') {
        return res.status(403).send({ error: 'Unauthorized' });
      }
      return res.status(500).send({ error: errorMessage });
    }
  }
}

export const reviewController = new ReviewController();
