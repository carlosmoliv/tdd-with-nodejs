import { User } from './User';
import bcrypt from 'bcrypt';

export class UserService {
  async save(body: { username: string; password: string; email: string }) {
    const hash = await bcrypt.hash(body.password, 10);
    const user = { ...body, password: hash };

    await User.create(user);
  }
}
