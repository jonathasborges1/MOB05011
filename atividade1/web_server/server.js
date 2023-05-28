const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

http.createServer((req, res) => {
   const url = req.url;
   if(url === "/"){
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Hello World na pagina inicial \n");
   }else if(url === "/sobre") {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Hello World na rota /sobre\n");
   }else{
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Nao existe resposta nessa rota, tente outro \n");
   }

}).listen(port, hostname, () => {
   console.log(`O servidor esta sendo executado em http://${hostname}:${port}/`);
});