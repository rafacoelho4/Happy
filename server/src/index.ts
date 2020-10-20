import express from 'express';
import cors from 'cors';
import './database/connection';
import routes from './routes';
import path from 'path';
import 'express-async-errors';
import errorHandler from './errors/handler';

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


const PORT = 3333;
app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));