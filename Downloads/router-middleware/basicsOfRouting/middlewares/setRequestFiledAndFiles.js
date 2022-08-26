function setRequestField(req,res){
    
     try {
        if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
            const form = formidable({ multiples: true });
        
            form.parse(req, (err, fields, files) => {
              if (err) {
                res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
                res.end(String(err));
                return;
              }
              request.files=files
            request.fields=fields
           
            });
        
            return req;
          }
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

module.exports=setRequestField