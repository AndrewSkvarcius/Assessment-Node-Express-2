const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { requireLogin, requireAdmin, authUser } = require('../middleware/auth');

const mockRequest = (data = {}) => ({
  ...data
});

const mockResponse = () => {

  
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Middleware tests", () => {

  describe("authUser middleware", () => {
    test("sets curr_username and curr_admin from a valid token", async () => {
      const token = jwt.sign({ username: "test", admin: true }, SECRET_KEY);
      const req = mockRequest({ body: { _token: token } });
      const res = mockResponse();
      const next = jest.fn();

      authUser(req, res, next);
      
      expect(req.curr_username).toEqual("test");
      expect(req.curr_admin).toBeTruthy();
      expect(next).toHaveBeenCalled();
    });
    
    test("handles invalid token", async () => {
        const token = "invalidtoken";
        const req = mockRequest({ body: { _token: token}});
        const res = mockResponse();
        const next = jest.fn();

        authUser(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 401 }));

    });

    test("handles missing token", async () =>{
        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();

        authUser(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeUndefined(); // Expecting next to be called without an error
    });
   
  });

  describe("requireLogin middleware", () => {
    test("proceeds if curr_username exists", async() => {
      const req = mockRequest({ curr_username: "test" });
      const res = mockResponse();
      const next = jest.fn();

      requireLogin(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toBeUndefined();
    });
    
    // Add tests for the scenario when curr_username does not exist
  });

  describe("requireAdmin middleware", () => {
    it("proceeds if curr_admin is true", () => {
      const req = mockRequest({ curr_admin: true });
      const res = mockResponse();
      const next = jest.fn();

      requireAdmin(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toBeUndefined();
    });
    
    // Add tests for the scenario when curr_admin is false or missing
  });
});
