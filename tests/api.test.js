import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Blockchain API', () => {
  it('returns the blockchain', async () => {
    const response = await request(app).get('/blockchain');

    expect(response.status).toBe(200);
    expect(response.body.chain).toHaveLength(1);
    expect(response.body.pendingTransactions).toEqual([]);
  });
});
