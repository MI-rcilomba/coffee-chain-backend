# Coffee Chain Backend

A Node.js and Express REST API for tracking Fair Trade coffee shipments with a simple proof-of-work blockchain ledger.

The application stores coffee logistics transactions as pending transactions. When `/mine` is called, the pending transactions are mined into a new block using SHA-256 and proof-of-work.

## Tech Stack

- Node.js
- Express
- Vitest
- Supertest
- Node.js crypto module

## Installation

```bash
npm install
```
