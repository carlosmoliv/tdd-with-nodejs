import express from 'express';
import UserRouter from './user/UserRouter';

const app = express();
app.use(express.json());

app.use(UserRouter);

console.log('env: ' + process.env.NODE_ENV);

export default app;
