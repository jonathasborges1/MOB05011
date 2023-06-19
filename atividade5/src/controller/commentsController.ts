import { Request, Response } from 'express';
import { commentCollection, IComment } from '../model/comment';
import { Db } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { username, email, password ,comment } = req.body;

   // Obtém a instância do objeto Db do MongoDB
   const db: Db = req.app.locals.db;
   
   // Insere o novo comentário na coleção de comentários
   const collection = commentCollection(db);

   // Verificar se o nome de usuário e e-mail já existem no banco de dados
    const existingUser = await collection.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.send('Nome de usuário ou e-mail já existem!');
    }
   

   // Criptografar a senha antes de armazená-la no banco de dados
   const hashedPassword = await bcrypt.hash(password, 10);

   // Cria um objeto Comment com os dados fornecidos
   const newComment: IComment = {
      id: uuidv4(),
      username,
      email,
      hashedPassword,
      comment,
      createdAt: new Date(),
    };

    await collection.insertOne(newComment);

    res.status(201).json({ message: 'Comentário salvo com sucesso.', comment: newComment });
  } catch (error) {
    console.error('Erro ao salvar o comentário:', error);
    res.status(500).json({ error: 'Erro ao salvar o comentário.' });
  }
};

export const getViewForm = (req: Request, res: Response) => {
   try {
      res.send(`
      <h1>Formulário de Contato</h1>
      <form action="/formulario" method="POST">
         
         <label for="username">Nome de Usuário:</label>
         <input type="text" id="username" name="username" required><br>

         <label for="email">E-mail:</label>
         <input type="email" id="email" name="email" required><br>

         <label for="password">Senha:</label>
         <input type="password" id="password" name="password" required><br>

         <label for="comment">Comentário:</label>
         <textarea id="comment" name="comment" required></textarea><br>
         
         <button type="submit">Enviar</button>
      </form>
   `);
   } catch (error) {
      console.error('Erro ao enviar Formulario:', error);
      res.status(500).json({ error: 'Erro ao enviar Formulario.' });
   }
}