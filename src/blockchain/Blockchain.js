import crypto from 'crypto';

export class Blockchain {
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
}
