import request from 'supertest';
import app from '../app';
import { User } from '../user/User';
import sequelize from '../config/database';

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  const postValidUser = () => {
    return request(app).post('/api/v1/users').send({
      username: 'user1',
      email: 'user1@gmail.com',
      password: '123456',
    });
  };

  it('returns 200 OK when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
  });

  it('returns success message when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User created.');
  });

  it('saves the user to database', async () => {
    await postValidUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it('saves the username and email to database', async () => {
    await postValidUser();
    const userList = await User.findAll();
    const savedUser = userList[0];

    // @ts-ignore
    expect(savedUser.username).toBe('user1');
    // @ts-ignore
    expect(savedUser.email).toBe('user1@gmail.com');
  });

  it('hashes the password in the database', async () => {
    await postValidUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    // @ts-ignore
    expect(savedUser.password).not.toBe('123456');
  });
});
