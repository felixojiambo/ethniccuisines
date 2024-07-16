// src/auth/auth.routes.ts
import express from 'express';
import { check } from 'express-validator';
import { AuthController } from './auth.controller';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const router = express.Router();
const authController = new AuthController();

router.post('/register', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('name').not().isEmpty(),
], (req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: express.Response<any, Record<string, any>>) => authController.register(req, res));

router.post('/login', [
  check('email').isEmail(),
  check('password').not().isEmpty(),
], (req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: express.Response<any, Record<string, any>>) => authController.login(req, res));

export { router as authRouter };
