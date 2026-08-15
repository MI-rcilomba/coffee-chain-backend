import express from 'express';
import { Blockchain } from './blockchain/Blockchain.js';

export const app = express();

app.use(express.json());

const blockchain = new Blockchain();

app.get('/blockchain', (req, res) => {
  res.status(200).json(blockchain);
});
