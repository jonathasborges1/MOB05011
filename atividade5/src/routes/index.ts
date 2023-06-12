// import { Router, Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import Formulario from './model/form';

// const router = Router();

// // Rota para exibir o formulário
// router.get('/formulario', (req: Request, res: Response) => {
//   res.send(`
//     <h1>Formulário de Contato</h1>
//     <form action="/formulario" method="POST">
//       <label for="username">Nome de Usuário:</label>
//       <input type="text" id="username" name="username" required><br>
//       <label for="email">E-mail:</label>
//       <input type="email" id="email" name="email" required><br>
//       <label for="password">Senha:</label>
//       <input type="password" id="password" name="password" required><br>
//       <label for="comment">Comentário:</label>
//       <textarea id="comment" name="comment" required></textarea><br>
//       <button type="submit">Enviar</button>
//     </form>
//   `);
// });

// // Rota para processar o envio do formulário
// router.post('/formulario', async (req: Request, res: Response) => {
//   const { username, email, password, comment } = req.body;

//   try {
//     // Verificar se o nome de usuário e e-mail já existem no banco de dados
//     const existingUser = await Formulario.findOne({
//       $or: [{ username }, { email }],
//     });

//     if (existingUser) {
//       return res.send('Nome de usuário ou e-mail já existem!');
//     }

//     // Criptografar a senha antes de armazená-la no banco de dados
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Salvar os dados do formulário no banco de dados
//     const formulario = new Formulario({
//       username,
//       email,
//       password: hashedPassword,
//       comment,
//     });

//     await formulario.save();

//     res.send('Formulário enviado com sucesso!');
//   } catch (error) {
//     console.error(error);
//     res.send('Ocorreu um erro ao processar o formulário.');
//   }
// });

// export default router;
