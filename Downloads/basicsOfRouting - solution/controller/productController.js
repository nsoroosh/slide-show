const Product = require("../models/productModel");
const {
  signupuser,
  authentication,
  getusers,
  makerole,
} = require("../repository/user.repository");
async function getProducts(req, res) {
  try {
    const id = req.params?.id;
    if (id) await getProduct(req, res, id);
    else {
      let products = await Product.findAll();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
    }
  } catch (e) {
    console.log(e);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

async function signup(req, res) {
  try {
    const response = await signupuser(req.body.username, req.body.password);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  } catch (error) {
    throw error;
  }
}
async function loginuser(req, res) {
  try {
    //   console.log(req.body.username);
    const response = await authentication(req.body.username, req.body.password);
    res.writeHead(200, { "Content-Type": "application/json" });
    response.setHeader("Set-Cookie", [`token=${response.token}`]);
    res.end("ok");
  } catch (error) {
    throw error;
  }
}
async function getusersdata(req, res) {
  try {
    const response = await getusers();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(response);
    res.end();
  } catch (error) {
    throw error;
  }
}
async function authorizeuser(req,res) {
  try {
    const response = await getusers();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(`{status:ok}`);
    res.end();

  } catch (error) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(`{status:error}`);
    res.end();
  }
}


module.exports = {
  getProducts,
  signup,
  loginuser,
  getusersdata,
  authorizeuser,
};
