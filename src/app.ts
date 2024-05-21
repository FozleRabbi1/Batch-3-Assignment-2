import express, { Application, Request, Response } from 'express';
import core from 'cors';
import { ProductsRoute } from './app/modules/products.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(core());

app.use('/api', ProductsRoute);

app.get('/', (req: Request, res: Response) => {
  const a = 'server run success fully';
  res.send(a);
});

export default app;
