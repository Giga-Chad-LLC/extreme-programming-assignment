import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import userRouter from '../src/routes/users';
import authRouter from '../src/routes/auth';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);

const prisma = new PrismaClient();

beforeEach(async () => {
   await prisma.refreshToken.deleteMany();
   await prisma.user.deleteMany();
});

afterEach(() => {});


describe('POST /auth/register', () => {
   it('should register and create a new user', async () => {
      const data = {
         email: "vee1@gmail.com",
         password: "123",
      };

      const response = await request(app)
         .post('/auth/register')
         .send(data);

      // NOTE: if user does not exist already
      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');

      // properties of user
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('email');
      expect(response.body.user).toHaveProperty('createdAt');

      // values of the user properties
      expect(response.body.user.email).toBe('vee1@gmail.com');

      const createdAt = new Date(response.body.user.createdAt);
      const diff = (new Date()).getMilliseconds() - createdAt.getMilliseconds()
      expect(diff < 5000).toBe(true); // close to current time
   });

   it('should NOT return password', async () => {
      const data = {
         email: "vee7@gmail.com",
         password: "123",
      };

      const response = await request(app)
         .post('/auth/register')
         .send(data);

      expect(response.status).toBe(200);
      expect(response.body.user).not.toHaveProperty('password', 'User data must not contain password');
   });

   it('should reject when no email present', async () => {
      const data = {
         password: "123",
      };

      const response = await request(app)
         .post('/auth/register')
         .send(data);

      // NOTE: if user does not exist already
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email and password are required');
   });

   it('should reject when no password present', async () => {
      const data = {
         email: "vee2@gmail.com",
      };

      const response = await request(app)
         .post('/auth/register')
         .send(data);

      // NOTE: if user does not exist already
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email and password are required');
   });

   it('should reject when user already exists', async () => {
      const data = {
         email: "vee3@gmail.com",
         password: "123",
      };

      const makeRequest = async (data: { email: string, password: string }) => await request(app)
         .post('/auth/register')
         .send(data);

      const success = await makeRequest(data);
      expect(success.status).toBe(200);

      const failure = await makeRequest(data);
      expect(failure.status).toBe(400);
      expect(failure.body).toHaveProperty('message', 'User with the provided email already exists');
   });
});


describe('POST /auth/login', () => {
   it('should reject when user not found', async () => {
      const data = {
         email: "thisUserNotFound4@gmail.com",
         password: "123",
      };

      const response = await request(app)
         .post('/auth/login')
         .send(data);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'User with the provided email not found');
   });

   it('should reject when no email provided', async () => {
      const data = {
         password: "123",
      };

      const response = await request(app)
         .post('/auth/login')
         .send(data);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email and password are required');
   });

   it('should reject when no password provided', async () => {
      const data = {
         email: "vee5@gmail.com",
      };

      const response = await request(app)
         .post('/auth/login')
         .send(data);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email and password are required');
   });

   it('should provide user data and tokens if user exists', async () => {
      const data = {
         email: "vee6@gmail.com",
         password: "123",
      };

      const registration = await request(app)
         .post('/auth/register')
         .send(data);

      expect(registration.status).toBe(200);

      const login = await request(app)
         .post('/auth/login')
         .send(data);

      expect(login.status).toBe(200);
      expect(login.body).toHaveProperty('user');
   });
});
