import crypto from 'crypto';

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
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
}
