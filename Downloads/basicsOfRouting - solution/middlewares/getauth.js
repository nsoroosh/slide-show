const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});


async  function getAuth(req, res, next) {
  try {
    await client.connect();
    client.select(0);
    const sources = await client.get("sources");
    var allow = false;
    if(req.body.role=="user"){
      for (const source of sources) {
        if(source.resource==req.url){
            source.permission.forEach(function(perms){
                if (req.method == "POST" && perms.create) allow = true;
                else if (req.method == "GET" && perms.read) allow = true;
                else if (req.method == "PUT" && perms.write) allow = true;
                else if (req.method == "DELETE" && perms.delete) allow = true;
    
            }) 
        }
        if (allow) next();
        else res.status(403).send({error: 'access denied'});
    }
    }
  } catch (error) {
    res.status(400).send({error: 'invalid token'})
  }
}
    


         
           
           
     
  module.exports=getAuth

  