import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    const user = await this.authService.register(email, password, name);
    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { user, token } = await this.authService.login(email, password);
    res.json({ user, token });
  }
}
