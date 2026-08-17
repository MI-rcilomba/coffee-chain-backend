import express from 'express';
import { Blockchain } from './blockchain/Blockchain.js';

export function createApp() {
  const app = express();
  const blockchain = new Blockchain();

  app.use(express.json());

  app.get('/blockchain', (req, res) => {
    res.status(200).json(blockchain);
  });

  app.post('/transactions', (req, res) => {
    const transaction = req.body;

    blockchain.addTransaction(transaction);

    res.status(201).json({
      message: 'Transaction added',
      transaction,
    });
  });

  app.post('/mine', (req, res) => {
    const block = blockchain.minePendingTransactions();

    res.status(201).json({
      message: 'Block mined',
      block,
    });
  });

  return app;
}

export const app = createApp();
