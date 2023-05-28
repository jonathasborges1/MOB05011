import { createServer } from "http";
import { parse } from "url";
import { lstatSync, createReadStream } from "fs"; // serve para ler / carregar arquivos
import { join, extname } from "path";

const hostname = "127.0.0.1";
const port = 3000;

const mimeTypes = {
   html: "text/html",
   jpeg: "image/jpeg",
   jpg: "image/jpg",
   png: "image/png",
   ico: 'image/x-icon',
   js: "text/javascript",
   css: "text/css",
   woff: "font/woff",
}

createServer((req, res) => {
   // Quarda o caminho de onde usuario esta acessando
   let acesso_uri = parse(req.url).pathname;

   // Process.cwd() retorna o diretorio de trabalho atual
   let pathcurrent = process.cwd();

   // decodeURI serve para resolver problemas com espacos em branco na url digitada pelo usuario
   let caminho_completo_recurso = join(pathcurrent, decodeURI(acesso_uri));
   console.log(`Acessando o recurso: ${acesso_uri}`);

   let recurso_carregado;

   try {
      // Faz a leitura do recurso com base no path e retorna um objeto com informacoes sobre o recurso
      recurso_carregado = lstatSync(caminho_completo_recurso);
   } catch (error) {
      caminho_completo_recurso = join(pathcurrent, "404.html");
      recurso_carregado = lstatSync(caminho_completo_recurso);
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("404 Not Found\n");
      res.end();
   }

   if(recurso_carregado?.isFile()){ // Verifica se o recurso carregado e um diretorio
      // extName extrai a extensao do arquivo
      let extensaoDoArquivo = extname(caminho_completo_recurso); // -> .html
      let extensoDoArquivoSemPonto = extensaoDoArquivo.substring(1); // -> html
      let mimeType = mimeTypes[extensoDoArquivoSemPonto]; // -> text/html

      res.writeHead(200, {"Content-Type": mimeType});

      let fluxoAquivo = createReadStream(caminho_completo_recurso); // -> fluxo de leitura do arquivo
      fluxoAquivo.pipe(res); // -> envia o fluxo de leitura para o fluxo de escrita

   }else if(recurso_carregado?.isDirectory()){ // Verifica se o recurso carregado e um diretorio
      res.writeHead(302, {"Location": "index.html"});
      res.end();
   }else{ // Caso o recurso nao seja um arquivo nem um diretorio
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write("500 Internal Error\n");
      res.end();
   }
}).listen(port,hostname, () => {
   console.log(`O servidor esta sendo executado em http://${hostname}:${port}/`);
});