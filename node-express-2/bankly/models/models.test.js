const bcrypt = require('bcrypt');
const db = require('../db');
const User = require('./User');
const ExpressError = require('../helpers/expressError');
const { BCRYPT_WORK_FACTOR } = require("../config");

jest.mock('../db'); // Mock the database connection

describe("User class", () => {
  
  // Mock user data for testing
  const userData = {
    username: "testuser",
    password: "password",
    first_name: "Test",
    last_name: "User",
    email: "test@example.com",
    phone: "1234567890"
  };

  beforeEach(() => {
    // Reset db.query mock and seed the database
    db.query.mockReset();

    // For demonstration purposes, let's assume the db always returns the same user
    db.query.mockResolvedValue({ rows: [userData] });
  });

  describe("register()", () => {

    test("should register a new user", async () => {
      const user = await User.register(userData);
      
      expect(user.username).toBe(userData.username);
      expect(bcrypt.compare(userData.password, user.password)).toBeTruthy();
      expect(db.query).toHaveBeenCalledTimes(2);  // First for duplicate check, second for insert
    });

    test("should throw error when user already exists", async () => {
      db.query.mockResolvedValueOnce({ rows: [userData] });  // Simulate duplicate user
      
      await expect(User.register(userData))
        .rejects.toThrow(new ExpressError(`There already exists a user with username '${userData.username}'`, 400));
    });
  });

  // ... You'd continue similarly for authenticate(), getAll(), get(), etc.

});
// ... Previous imports and setup ...

describe("User class", () => {
  
    // ... Previous setups and register() tests ...
  
    describe("authenticate()", () => {
  
      test("should authenticate a valid user", async () => {
        const user = await User.authenticate(userData.username, userData.password);
        
        expect(user.username).toBe(userData.username);
        expect(db.query).toHaveBeenCalledTimes(1);
      });
  
      test("should throw error for invalid user", async () => {
        db.query.mockResolvedValueOnce({ rows: [] });  // Simulate no user found
        
        await expect(User.authenticate("nonexistent", "wrongpassword"))
          .rejects.toThrow(new ExpressError('Cannot authenticate', 401));
      });
    });
  
    describe("getAll()", () => {
  
      test("should retrieve all users", async () => {
        const users = await User.getAll();
        
        expect(users).toEqual([userData]);
        expect(db.query).toHaveBeenCalled();
      });
    });
  
    describe("get()", () => {
  
      test("should retrieve a specific user", async () => {
        const user = await User.get(userData.username);
        
        expect(user.username).toBe(userData.username);
        expect(db.query).toHaveBeenCalledTimes(1);
      });
  
      test("should throw error when user not found", async () => {
        db.query.mockResolvedValueOnce({ rows: [] });  // Simulate user not found
        
        await expect(User.get("nonexistent"))
          .rejects.toThrow(new ExpressError('No such user', 404));
      });
    });
  
    describe("update()", () => {
  
      test("should update user details", async () => {
        const updatedData = {
          first_name: "Updated"
        };
        
        const user = await User.update(userData.username, updatedData);
        expect(user.first_name).toBe(updatedData.first_name);
        expect(db.query).toHaveBeenCalledTimes(1);
      });
  
      test("should throw error when updating a nonexistent user", async () => {
        db.query.mockResolvedValueOnce({ rows: [] });  // Simulate user not found
        
        await expect(User.update("nonexistent", {}))
          .rejects.toThrow(new ExpressError('No such user', 404));
      });
    });
  
    describe("delete()", () => {
  
      test("should delete a specific user", async () => {
        const result = await User.delete(userData.username);
        
        expect(result).toBe(true);
        expect(db.query).toHaveBeenCalledTimes(1);
      });
  
      test("should throw error when deleting a nonexistent user", async () => {
        db.query.mockResolvedValueOnce({ rows: [] });  // Simulate user not found
        
        await expect(User.delete("nonexistent"))
          .rejects.toThrow(new ExpressError('No such user', 404));
      });
    });
  });
  