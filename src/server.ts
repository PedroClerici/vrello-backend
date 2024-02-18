import express, { type Request, type Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ hello: 'world' });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
