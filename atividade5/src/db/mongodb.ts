import express, { Request, Response, NextFunction } from 'express';
import { Db, MongoClient, ServerApiVersion }  from 'mongodb';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();


// Importar as credenciais do banco de dados
const { MONGO_HOST, MONGO_DATABASE, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const connectClusterMongo = async () => {
   try {
      const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`;
      console.log("connectDB -> mongoURL -> ",mongoURL )

      // Create a MongoClient with a MongoClientOptions object to set the Stable API version
      const client = new MongoClient(mongoURL, {
         serverApi: {
           version: ServerApiVersion.v1,
           strict: true,
           deprecationErrors: true,
         }
       });

       console.log("Conexao com cluster MongoDB estabelecida com sucesso.");
       
       await runDB(client);
       
       return client;
   } catch (error) {
      console.error('Erro ao acessar o cluster MongoDB, razao:', error);
      return 0;
   }
}

const runDB = async (client:any) => {
   try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      // Send a ping to confirm a successful connection
      await client.db(MONGO_DATABASE).command({ ping: 1 });

      console.log("Conexao com o banco de dados MongoDB! estabelecida com sucesso");

      return 1;
    }catch (error) {

      console.error('Erro ao acessar o banco de dados MongoDB, razao:', error);
      return 0;
   } 
}

const middlewareConnectDB = async (req:Request, res:Response, next:NextFunction) => {
   try {

      const client = await connectClusterMongo();

      if (!client) {
        return res.status(500).send('Erro ao conectar com o banco de dados.');
      }

      // Armazena o cliente MongoDB em app.locals para acesso posterior
      req.app.locals.mongoClient = client;

      // Obtém a instância do objeto Db do MongoDB
      const db: Db = client.db(MONGO_DATABASE);

      // Atribui o objeto Db ao app.locals.db
      req.app.locals.db = db;

      next();

   } catch (error) {
      console.error('Erro ao conectar com o banco de dados:', error);
      return res.status(500).send('Erro ao conectar com o banco de dados.');
   }
}

export default middlewareConnectDB ;
