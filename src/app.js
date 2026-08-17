import express from 'express';
import { Blockchain } from './blockchain/Blockchain.js';

function validateTransaction(req, res, next) {
  const { sender, recipient, batchId, weightKg } = req.body;

  if (!sender || !recipient || !batchId || weightKg === undefined) {
    return res.status(400).json({
      error: 'Transaction must include sender, recipient, batchId and weightKg',
    });
  }

  next();
}

export function createApp() {
  const app = express();
  const blockchain = new Blockchain();

  app.use(express.json());

  app.get('/blockchain', (req, res) => {
    res.status(200).json(blockchain);
  });

  app.post('/transactions', validateTransaction, (req, res) => {
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
