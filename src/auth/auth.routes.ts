import express from 'express';
import { check } from 'express-validator';
import { AuthController } from './auth.controller';

const router = express.Router();
const authController = new AuthController();

router.post(
  '/register',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('name').not().isEmpty(),
  ],
  (req: express.Request, res: express.Response) => authController.register(req, res)
);

router.post(
  '/login',
  [
    check('email').isEmail(),
    check('password').not().isEmpty(),
  ],
  (req: express.Request, res: express.Response) => authController.login(req, res)
);

export { router as authRouter };
