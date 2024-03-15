import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import createServer from '@/config/server';
import makeUser from '@/tests/helpers/make-user.factory';
import { User } from '@/api/models/users.model';

const app = createServer();

describe('Users E2E', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  let userInput = makeUser();
  let userPayload: User;
  let token: string;

  it('Should be able to register a user', async () => {
    await request(app).post('/auth/register').send(userInput);
  });

  it("Should not be able to login if passwords doesn't match", async () => {});

  it('Should be able to login', async () => {
    const { body, header, statusCode } = await request(app)
      .post('/auth/login')
      .send({
        email: userInput.email.toLowerCase().trim(),
        password: userInput.password,
      });

    expect(statusCode).toBe(200);

    expect(body).toHaveProperty('token');
    expect(header).toHaveProperty('set-cookie');

    token = body.token;
  });

  it('Should be able to get users profile', async () => {
    const { body, statusCode } = await request(app)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(statusCode).toBe(200);

    expect(body.username).toBe(userInput.username);

    userPayload = body;
  });

  it('Should not be able to fetch users without a valid token', async () => {
    await request(app).get('/users/').send().expect(401);
  });

  it('Should be able to fetch users if authorized', async () => {
    const { body, statusCode } = await request(app)
      .get('/users/')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);

    expect(body).toHaveLength(1);
    expect(statusCode).toBe(200);
  });

  it('Should not be able to update user without a valid token', async () => {
    await request(app).patch('/users/').send().expect(401);
  });

  it('Should be able to update user', async () => {
    const userUpdated = makeUser({ id: undefined });

    const { body, statusCode } = await request(app)
      .patch(`/users/${userPayload.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...userUpdated });

    expect(statusCode).toBe(200);
    expect(body).toEqual({
      id: userPayload.id,
      username: userUpdated.username,
      email: userUpdated.email.toLowerCase(),
    });
  });

  it('Should not be able to delete user without a valid token', async () => {
    await request(app).delete('/users/').send().expect(401);
  });

  it('Should be able to delete a user', async () => {
    const { body, statusCode } = await request(app)
      .delete(`/users/${userPayload.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('username');
  });
});
