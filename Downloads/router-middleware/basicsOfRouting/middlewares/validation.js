
function validate(req, res, next) {
    next(undefined);
    // setTimeout(()=>{
    //     next(new Error('Validation Failed!'));
    // },3000);
}
  
module.exports = validate;
  