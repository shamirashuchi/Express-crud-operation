import express from 'express';
import { usercontrollers } from './user.controller';
const router = express.Router();
router.post('/users', usercontrollers.createUser);
export { router as UserRoutes };
