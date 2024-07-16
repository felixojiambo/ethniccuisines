import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  restaurantId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema: Schema<IReview> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    restaurantId: { type: Schema.Types.ObjectId, required: true, ref: 'Restaurant' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>('Review', reviewSchema);

export { Review, IReview };
