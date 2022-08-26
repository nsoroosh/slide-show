function sampleMiddleware(req, res, next) {
   console.log('hello world!');
   next(undefined);
}
  
module.exports = sampleMiddleware;