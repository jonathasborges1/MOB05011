import express, { Request, Response } from 'express';

import { hostname, port } from './config';
import middlewareConnectDB from './db/mongodb';
import routerComments from './routes/commentRouter';

const routes = [routerComments]

const app = express();

// Middleware de autenticação com o MongoDB
app.use(middlewareConnectDB)

// Configurar o middleware para processar o (parametro da URL) das requisições
app.use(express.urlencoded({ extended: false }));

// Configurar o middleware para processar o corpo (BODY) das requisições
app.use(express.json());

// Registrar as rotas
app.use(routes);

// Rota para lidar com links inexistentes
app.use((req: Request, res: Response) => {
  res.status(404).send('Página não encontrada!');
});

// Iniciar o servidor na porta 3000
app.listen(port, hostname, () => {
   console.log(`O servidor está sendo executado em http://${hostname}:${port}`);
});
