const products = require('../data/products.json');

function findAll(req, res) {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    });
}
function addproduct(product){
    return new Promise((resolve, reject) => {
        products.push(product)
        resolve(product)
    });
}
function hasproduct(product){
    return new Promise((resolve, reject) => {
     const hasproduct=   products.includes(product)
     if(hasproduct){

         resolve(product)
     }
    });
}
function updateproduct(product){
    return new Promise((resolve, reject) => {
       let index=   products.findIndex(ele=>ele.id==product.id)
       if(index){
           products.splice(index,1,product)
           resolve(product)
       }
    });
}
module.exports = {
    findAll,
    findById,
    addproduct,
    hasproduct,
    updateproduct
}