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
}
