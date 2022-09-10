function authtoken(req, res, next) {
 try {
    let tokenHeaderKey ="cookie" ;
    let jwtSecretKey = "shhhh";
    const token = req.header(tokenHeaderKey);
    console.log(token);
  
    const verified = jwt.verify(token, jwtSecretKey);
    if(verified){
        req.body.role="user"
        resolve(req)
        next()
    }
 } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "oops! Something went wrong!",
        addtionalInfo: e.message,
      })
    );
 }

 
}
