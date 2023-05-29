import express from 'express';
import files from "./arquivo.js";
import params  from "./params.js";

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.get('/', (req, res) => {
   console.log(`Rota / acessada com sucesso`)
   res.writeHead(302, {'Location' : 'index.html'});
   res.end();
});

app.get('/autor', (req, res) => {
   res.send("<h1>Jonathas Borges Cavalcante =) </h1>");
}); 

app.get('/json', (req, res) => {
   res.status(200).json({Autor: "Jonathas Borges Cavalcante", Nota: 9.7});
 });

 app.post('/post/:mensagem', (req, res) => {
   res.send('Acesso via método post.\n Mensagem: ' + req.params.mensagem);
});
 
app.use(files);
app.use(params);

app.get('*', (req, res) => {
   res.status(404).send("Esta rota não existe!");
   res.end();
   console.log(`Rota NAO encontrada -> ${req.path}`);
});

app.listen(port,hostname, () => {
   console.log(`O servidor esta sendo executado em http://${hostname}:${port}/`);
} );