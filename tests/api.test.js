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

  it('adds a transaction through the API', async () => {
    const transaction = {
      sender: 'Farm A',
      recipient: 'Roastery B',
      batchId: 'BATCH-001',
      weightKg: 25,
    };

    const response = await request(app).post('/transactions').send(transaction);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Transaction added');
    expect(response.body.transaction).toEqual(transaction);
  });

  it('mines pending transactions through the API', async () => {
    const transaction = {
      sender: 'Farm A',
      recipient: 'Cafe C',
      batchId: 'BATCH-002',
      weightKg: 10,
    };

    await request(app).post('/transactions').send(transaction);

    const response = await request(app).post('/mine');

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Block mined');
    expect(response.body.block.index).toBeGreaterThan(0);
    expect(response.body.block.transactions).toEqual([transaction]);
    expect(response.body.block.hash.startsWith('0')).toBe(true);
  });
});
