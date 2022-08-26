const http = require('http');
const products = require('./data/products.json');
const { getProducts, createproduct } = require('./controller/productController');
const {fetchQueryStringFromURL, validate, sampleMiddleware}  = require('./middlewares');
const formidable = require('formidable');
const queryStringParser = require('querystring_converter');

const RouterClass = require('./Router');
const Router = new RouterClass();
Router.addRoute('/sampleGET', getProducts, 'get').middleware([fetchQueryStringFromURL, validate, sampleMiddleware]);
Router.addRoute('/samplePOST', createproduct, 'post').middleware(fetchQueryStringFromURL);

const server = http.createServer((req, res) => {
    
    // if(req.url == '/sampleGET' && req.method == 'GET'){
    //     getProducts(req,res);
    // } else {
    //     res.writeHead(404, { 'Content-Type': 'application/json'});
    //     res.end(JSON.stringify({ message: 'URL NOT FOUND!'}));
    // }
    

    for (const key of req.querystring) {
        req.params[key]=decodeURIComponent(req.querystring[key])
    }
    Router.route(req,res);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h2>With Node.js <code>"http"</code> module</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
      </form>
    `);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { 
    console.log(`Server lintening on ${PORT}`);
});
