import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";

import { port, hostname } from "./config";
import { login, logout } from "./auth";

const app = express();
const messages = [];
// Middleware para análise do corpo da requisição
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota principal
app.get("/",  (req: Request, res: Response) => {

  if (!req.app.locals.user) {
    return res.redirect("/login");
  }
 
  const indexPath = path.join(publicPath, 'index.html');
  res.sendFile(indexPath);

});

// Rota de login
app.get('/login', (req: Request, res: Response) => {
  const user = req.app.locals.user;

  if(user) {
    res.redirect("/");
  } else {
    const loginPath = path.join(publicPath, 'login.html');
    res.sendFile(loginPath);
  }
  
});

// Rota para receber os dados do formulário de login
app.post("/login", login);

// Rota para logout - limpa dados do req.app.locals.user 
app.get("/logout", logout);

app.get('/contato', (req, res) => {

  if (!req.app.locals.user) {
    return res.redirect("/login");
  }
  
  const contatoPath = path.join(publicPath, 'contato.html');
  console.log("app.get('/contato', contatoPath -> ", contatoPath)
  res.sendFile(contatoPath);

})

app.post('/contato', (req, res) => {
  const { name, email, message } = req.body;

  messages.push({ name, email, message });
  console.log("messages -> ", messages); 

  res.redirect('/');
})

app.get('/contato/list', (req, res) => {
  res.status(200).json(messages);
});


// Middleware para servir os arquivos estáticos
const publicPath = path.join(__dirname, '..','public');
app.use(express.static(publicPath));

// Rota para tratar qualquer outro caminho
app.get('*' ,(req, res) => {
  if (!req.app.locals.user) {
    return res.redirect("/login");
  }else{
    return res.redirect("/");
  }
  
});

app.listen(port, hostname, () => {
  console.log(`O servidor está sendo executado em http://${hostname}:${port}`);
});
