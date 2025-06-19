import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  default: {
    PrismaClient: jest.fn(() => ({
      user: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn().mockResolvedValue([]),
      }
    }))
  }
}));

const { default: app } = await import('../server.js');

describe('Users API', () => {
  it('GET /users should return empty array', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
