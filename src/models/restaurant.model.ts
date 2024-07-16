import { Schema, model } from 'mongoose';

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Restaurant = model('Restaurant', RestaurantSchema);
export default Restaurant;
