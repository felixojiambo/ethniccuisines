import Restaurant from '../models/restaurant.model';

export class RestaurantService {
  async create(data: any) {
    const restaurant = new Restaurant(data);
    await restaurant.save();
    return restaurant;
  }

  async getAll() {
    return Restaurant.find();
  }

  async getById(id: string) {
    return Restaurant.findById(id);
  }

  async update(id: string, data: any) {
    return Restaurant.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Restaurant.findByIdAndDelete(id);
  }
}
