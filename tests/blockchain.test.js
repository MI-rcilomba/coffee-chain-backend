import { describe, expect, it } from 'vitest';
import { Blockchain } from '../src/blockchain/Blockchain.js';

describe('Blockchain hashing', () => {
  it('creates a SHA-256 hash as a 64 character string', () => {
    const blockchain = new Blockchain();

    const hash = blockchain.calculateHash({
      index: 1,
      timestamp: '2026-08-13T10:00:00.000Z',
      transactions: [],
      previousHash: 'abc123',
      nonce: 0,
    });

    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[a-f0-9]+$/);
  });
});
