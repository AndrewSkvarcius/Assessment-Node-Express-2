const request = require('supertest');
const express = require('express');
const app = require("../app")
const User = require('../models/user');
const ExpressError = require('../helpers/expressError');

// Mock the User model
jest.mock('../models/user', () => ({
  getAll: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

// Mock the ExpressError module
jest.mock('../helpers/expressError', () => jest.fn());


describe('User Routes', () => {
  // Set up before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /users should return a list of users', async () => {
    // Mock the behavior of User.getAll
    User.getAll.mockResolvedValue([
      { username: 'user1', first_name: 'John', last_name: 'Doe' },
      { username: 'user2', first_name: 'Jane', last_name: 'Smith' },
    ]);

    const response = await request(app).get('/users').expect(200);

    // Check that User.getAll was called
    expect(User.getAll).toHaveBeenCalledTimes(1);

    // Check the response
    expect(response.body.users).toBeDefined();
    expect(response.body.users).toHaveLength(2);
    // Add more assertions as needed
  });

  test('GET /users/:username should return user details', async () => {
    // Mock the behavior of User.get
    User.get.mockResolvedValue({
      username: 'testuser',
      first_name: 'Test',
      last_name: 'User',
      phone: '1234567890',
      email: 'test@example.com',
    });

    const response = await request(app).get('/users/testuser').expect(200);

    // Check that User.get was called with the correct username
    expect(User.get).toHaveBeenCalledWith('testuser');

    // Check the response
    expect(response.body.user).toBeDefined();
    // Add more assertions as needed
  });

  // Add similar test cases for the PATCH and DELETE routes
});
