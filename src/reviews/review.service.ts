import { IReview, Review } from '../models/review.model';

class ReviewService {
  async createReview(userId: string, restaurantId: string, rating: number, comment: string): Promise<IReview> {
    const review = new Review({ userId, restaurantId, rating, comment });
    await review.save();
    return review;
  }

  async getReviews(): Promise<IReview[]> {
    return Review.find().populate('userId', 'name').populate('restaurantId', 'name');
  }

  async getReview(id: string): Promise<IReview | null> {
    return Review.findById(id).populate('userId', 'name').populate('restaurantId', 'name');
  }

  async updateReview(id: string, userId: string, updateData: Partial<IReview>): Promise<IReview | null> {
    const review = await Review.findById(id);
    if (!review) {
      throw new Error('Review not found');
    }
    if (review.userId.toString() !== userId) {
      throw new Error('Unauthorized');
    }
    Object.assign(review, updateData);
    await review.save();
    return review;
  }

  async deleteReview(id: string, userId: string): Promise<void> {
    const review = await Review.findById(id);
    if (!review) {
      throw new Error('Review not found');
    }
    if (review.userId.toString() !== userId) {
      throw new Error('Unauthorized');
    }
    await review.deleteOne();
  }
}

export const reviewService = new ReviewService();
