import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import userRouter from '../src/routes/users';

const app = express();
app.use(express.json());
app.use('/users', userRouter);

// Sample data storage for tests
let users: { id: number; name: string; email: string }[] = [];
let nextId = 1;

// Mock the in-memory storage in the user router
const originalPush = users.push.bind(users);
const originalSplice = users.splice.bind(users);

beforeEach(() => {
   users = []; // Reset users before each test
   nextId = 1; // Reset the nextId counter
});

afterEach(() => {
   users.push = originalPush; // Restore the original push function
   users.splice = originalSplice; // Restore the original splice function
});


describe('Dummy test', () => {
   it('should succeed', async () => {
      expect(1 + 1).toBe(2);
   });
});


// Test for creating a user
/*describe('POST /users', () => {
   it('should create a new user', async () => {
      const response = await request(app)
         .post('/users')
         .send({ email: 'john123@example.com' });

      // NOTE: if user does not exist already
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('John Doe');
      expect(response.body.email).toBe('john123@example.com');
   });
});*/

// Test for retrieving all users
/*describe('GET /users', () => {
   it('should return all users', async () => {
      users.push({ id: 1, name: 'John Doe', email: 'john@example.com' });
      users.push({ id: 2, name: 'Jane Doe', email: 'jane@example.com' });

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
   });
});*/

// Test for retrieving a single user
/*describe('GET /users/:id', () => {
   it('should return a user by ID', async () => {
      users.push({ id: 1, name: 'John Doe', email: 'john@example.com' });

      const response = await request(app).get('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'John Doe');
   });

   it('should return 404 for non-existing user', async () => {
      const response = await request(app).get('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
   });
});*/

// Test for updating a user
/*describe('PUT /users/:id', () => {
   it('should update a user by ID', async () => {
      users.push({ id: 1, name: 'John Doe', email: 'john@example.com' });

      const response = await request(app)
         .put('/users/1')
         .send({ name: 'John Smith' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'John Smith');
   });

   it('should return 404 for non-existing user', async () => {
      const response = await request(app).put('/users/999').send({ name: 'Not Found' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
   });
});*/

// Test for deleting a user
/*
describe('DELETE /users/:id', () => {
   it('should delete a user by ID', async () => {
      users.push({ id: 1, name: 'John Doe', email: 'john@example.com' });

      const response = await request(app).delete('/users/1');

      expect(response.status).toBe(204); // No content on successful delete
   });

   it('should return 404 for non-existing user', async () => {
      const response = await request(app).delete('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
   });
});*/
