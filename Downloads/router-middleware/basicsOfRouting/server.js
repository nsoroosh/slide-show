const http = require('http');
const fs = require("fs");


const RouterClass = require('./modules/router/router');
const Router = new RouterClass();

const appsDirectories = fs.readdirSync("./apps");
for (let appDir of appsDirectories) {
  const app = require(`./apps/${appDir}`);
  app.routes.forEach((route) => {
    Router.addRoute(`/${appDir}/${route.url}`, route.controller, route.method).middleware(route.middlewares)
  });
}

const server = http.createServer((req, res) => {
    // if(req.url == '/sampleGET' && req.method == 'GET'){
    //     getProducts(req,res);
    // } else {
    //     res.writeHead(404, { 'Content-Type': 'application/json'});
    //     res.end(JSON.stringify({ message: 'URL NOT FOUND!'}));
    // }
     Router.route(req,res);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => { 
    console.log(`Server lintening on ${PORT}`);
});
