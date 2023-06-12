import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

import { hostname, port } from './config';
import connectDatabase from './mongoose';
// import routes from './routes';

const app = express();

// Middleware de autenticação com o MongoDB
app.use(async(req, res, next) => {
   try {

      const client = await connectDatabase();

      if (!client) {
        return res.status(500).send('Erro ao conectar com o banco de dados.');
      }

      next();

   } catch (error) {
      console.error('Erro ao conectar com o banco de dados:', error);
      return res.status(500).send('Erro ao conectar com o banco de dados.');
   }

 });

// Definir o esquema do documento para armazenar os dados do formulário
const formularioSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  comment: String,
});

interface FormularioDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  comment: string;
}

const Formulario = mongoose.model<FormularioDocument>('Formulario', formularioSchema);

// Configurar o middleware para processar o corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Registrar as rotas
// app.use(routes);


// Rota para lidar com links inexistentes
app.use((req: Request, res: Response) => {
  res.status(404).send('Página não encontrada!');
});

// Iniciar o servidor na porta 3000
app.listen(port, hostname, () => {
   console.log(`O servidor está sendo executado em http://${hostname}:${port}`);
 });
