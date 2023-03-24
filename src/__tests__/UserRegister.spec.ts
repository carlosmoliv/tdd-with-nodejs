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
  it('returns 200 OK when signup request is valid', async () => {
    const { statusCode } = await request(app).post('/api/v1/users').send({
      username: 'User 1',
      email: 'user1@gmail.com',
      password: '123456',
    });

    expect(statusCode).toBe(200);
  });

  it('returns success message when signup request is valid', async () => {
    const { statusCode, body } = await request(app).post('/api/v1/users').send({
      username: 'User 1',
      email: 'user1@gmail.com',
      password: '123456',
    });

    expect(body.message).toBe('User created.');
  });

  it('saves the user to database', (done) => {
    const userData = {
      username: 'User 1',
      email: 'user1@gmail.com',
      password: '123456',
    };

    request(app)
      .post('/api/v1/users')
      .send(userData)
      .then(() => {
        User.findAll().then((userList) => {
          expect(userList.length).toBe(1);
          done();
        });
      });
  });

  it('saves the username and email to database', (done) => {
    const userData = {
      username: 'user1',
      email: 'user1@gmail.com',
      password: '123456',
    };

    request(app)
      .post('/api/v1/users')
      .send(userData)
      .then(() => {
        User.findAll().then((userList) => {
          const savedUser = userList[0];
          // @ts-ignore
          expect(savedUser.username).toBe('user1');
          // @ts-ignore
          expect(savedUser.email).toBe('user1@gmail.com');
          done();
        });
      });
  });
});
