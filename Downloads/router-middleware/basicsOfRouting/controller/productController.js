const Product = require('../models/productModel');

async function getProducts(req, res) {
    try{
        const id = req.querystring?.id;
        if(id) await getProduct(req, res, id);
        else {
            let products = await Product.findAll();
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(products));
        }
    }catch(e) {
        console.log(e);
    }
}

async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}
async function createproduct(req,res,data){
    try {
        // addproduct
        const hasproduct = Product.hasproduct(data)
        if(hasproduct){
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product already exist' }))
        }else{
          await  Product.addproduct(data)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error);
    }
}
async function updateproduct(req,res,name,price,description){
   let index= req.url.findIndex("?")
   let main = req.url.slice(0,index)
   let mainarr =main.splite("/")
   let id = mainarr[mainarr.lenght-1]
    const data={
        "id":id,
        "name":name,
        "price":price,
        "description":description
    }
    try {
    const updateproduct=    await Product.updateproduct(data)
    if (updateproduct) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Product already exist' }))
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(product))
    }
    
    } catch (error) {
        console.log(error);
    }
}   
module.exports = {
    getProducts,
    getProduct,
    createproduct,
    updateproduct
}