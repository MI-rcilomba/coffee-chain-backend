import crypto from 'crypto';

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = process.env.NODE_ENV === 'test' ? 1 : 2;
  }

  createGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: new Date().toISOString(),
      transactions: [],
      previousHash: '0',
      nonce: 0,
      hash: '',
    };

    genesisBlock.hash = this.calculateHash(genesisBlock);

    return genesisBlock;
  }

  calculateHash(block) {
    const blockData =
      block.index +
      block.timestamp +
      JSON.stringify(block.transactions) +
      block.previousHash +
      block.nonce;

    return crypto.createHash('sha256').update(blockData).digest('hex');
  }

  mineBlock(block, difficulty) {
    const target = '0'.repeat(difficulty);

    while (!block.hash.startsWith(target)) {
      block.nonce += 1;
      block.hash = this.calculateHash(block);
    }

    return block;
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions() {
    const latestBlock = this.getLatestBlock();

    const newBlock = {
      index: this.chain.length,
      timestamp: new Date().toISOString(),
      transactions: this.pendingTransactions,
      previousHash: latestBlock.hash,
      nonce: 0,
      hash: '',
    };

    const minedBlock = this.mineBlock(newBlock, this.difficulty);

    this.chain.push(minedBlock);
    this.pendingTransactions = [];

    return minedBlock;
  }
}
