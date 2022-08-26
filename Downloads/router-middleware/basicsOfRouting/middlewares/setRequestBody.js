function setRequestBody(req,res){
    try {
        if(req.getHeader('Content-Type')=="application/json"){
            req.body=req.url
        }
        return req
    } catch (e) {
        res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "oops! Something went wrong!",
        addtionalInfo: e.message,
      })
    );
    }
}