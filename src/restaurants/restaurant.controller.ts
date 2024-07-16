import { Request, Response } from 'express';
import { RestaurantService } from './restaurant.service';

export class RestaurantController {
  private restaurantService: RestaurantService;

  constructor() {
    this.restaurantService = new RestaurantService();
  }

  async create(req: Request, res: Response) {
    const restaurant = await this.restaurantService.create(req.body);
    res.json(restaurant);
  }

  async getAll(req: Request, res: Response) {
    const restaurants = await this.restaurantService.getAll();
    res.json(restaurants);
  }

  async getById(req: Request, res: Response) {
    const restaurant = await this.restaurantService.getById(req.params.id);
    res.json(restaurant);
  }

  async update(req: Request, res: Response) {
    const restaurant = await this.restaurantService.update(req.params.id, req.body);
    res.json(restaurant);
  }

  async delete(req: Request, res: Response) {
    await this.restaurantService.delete(req.params.id);
    res.status(204).send();
  }
}
