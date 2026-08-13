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

describe('Blockchain mining', () => {
  it('mines a block with a hash that starts with the required number of zeroes', () => {
    const blockchain = new Blockchain();
    const difficulty = 2;

    const block = {
      index: 1,
      timestamp: '2026-08-13T10:00:00.000Z',
      transactions: [
        {
          sender: 'Farm A',
          recipient: 'Roastery B',
          batchId: 'BATCH-001',
          weightKg: 25,
        },
      ],
      previousHash: 'abc123',
      nonce: 0,
      hash: '',
    };

    const minedBlock = blockchain.mineBlock(block, difficulty);

    expect(minedBlock.hash.startsWith('0'.repeat(difficulty))).toBe(true);
    expect(minedBlock.nonce).toBeGreaterThanOrEqual(0);
  });

  describe('Blockchain structure', () => {
    it('starts with a genesis block and an empty pending transaction list', () => {
      const blockchain = new Blockchain();

      expect(blockchain.chain).toHaveLength(1);
      expect(blockchain.pendingTransactions).toEqual([]);

      const genesisBlock = blockchain.chain[0];

      expect(genesisBlock.index).toBe(0);
      expect(genesisBlock.transactions).toEqual([]);
      expect(genesisBlock.previousHash).toBe('0');
      expect(genesisBlock.hash).toHaveLength(64);
    });
  });
});
