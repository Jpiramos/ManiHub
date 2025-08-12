import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();


app.use((req, res, next) => {
  console.log(`Rota acessada: ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/users', userRoutes);

app.use((req, res) => {
  console.log(`Rota não encontrada para: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
