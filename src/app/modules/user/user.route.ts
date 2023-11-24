import express from 'express';
import { usercontrollers } from './user.controller';
const router = express.Router();
router.post('/users', usercontrollers.createUser);
router.get('/users', usercontrollers.getAlluser);
router.get('/users/:userId', usercontrollers.getsingleuser);
export { router as UserRoutes };
