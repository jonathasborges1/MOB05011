import { MongoClient, ServerApiVersion }  from 'mongodb';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const connectDatabase = async () => {
   try {
      const mongoURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`;
      console.log("variaveis -> mongoURL -> ",mongoURL )

      // Create a MongoClient with a MongoClientOptions object to set the Stable API version
      const client = new MongoClient(mongoURL, {
         serverApi: {
           version: ServerApiVersion.v1,
           strict: true,
           deprecationErrors: true,
         }
       });

       await run(client);
       console.log("Pinged your deployment. You successfully connected to MongoDB!");
       return 1;
   } catch (error) {
      console.error('Erro ao conectar no banco de dados:', error);
      return 0;
   }
}

const run = async (client:any) => {
   try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      // Send a ping to confirm a successful connection
      await client.db(process.env.MONGO_DATABASE).command({ ping: 1 });

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

export default connectDatabase;
