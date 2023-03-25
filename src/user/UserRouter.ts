import express from 'express';
import { UserService } from './UserService';

const userService = new UserService();
const router = express.Router();

router.post('/api/v1/users', async (req, res) => {
  await userService.save(req.body);
  return res.send({ message: 'User created.' });
});

export default router;
