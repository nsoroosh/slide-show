const http = require('http');
const products = require('./data/products.json');
const { getProducts, loginuser ,signup, getusersdata,authorizeuser} = require('./controller/productController');
const {fetchQueryStringFromURL, validate, getpostdata,getAuth}  = require('./middlewares');

const RouterClass = require('./Router');
const { signupuser } = require('./repository/user.repository');
const Router = new RouterClass();
Router.addRoute('/sampleGET', getProducts, 'get').middleware([fetchQueryStringFromURL, validate]);
Router.addRoute('/samplePOST', getProducts, 'post').middleware(fetchQueryStringFromURL);
Router.prefix('/sample').addGroup(function () {
  Router.addRoute('/sGET', getProducts, 'get');
  Router.addRoute('/sPOST', getProducts, 'post');
});
Router.addRoute('/service/login',loginuser,'post').middleware([getpostdata])
Router.addRoute('/service/signup',signup,'post').middleware([getpostdata])
Router.addRoute('/users',getusersdata,'get')
Router.addRoute('/service/users',authorizeuser,'get').middleware([getpostdata,getAuth])
const server = http.createServer((req, res) => {
    // if(req.url == '/sampleGET' && req.method == 'GET'){
    //     getProducts(req,res);
    // } else {
    //     res.writeHead(404, { 'Content-Type': 'application/json'});
    //     res.end(JSON.stringify({ message: 'URL NOT FOUND!'}));
    // }
     Router.route(req,res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { 
    console.log(`Server lintening on ${PORT}`);
});

process.on('uncaughtException', (reason, promise) => {
    console.log(`Unhandled Exception at:`,promise, reason);
});
