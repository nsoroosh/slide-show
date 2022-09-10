const redis = require("redis");
const { createHash } = require("node:crypto");
var jwt = require("jsonwebtoken");
const client = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});

let salt = "f844b09ff50c";
async function signupuser(username, password) {
  try {
    const hash = createHash('sha256');

    hash.update(`${password}`);
   const  pass=(hash.digest('hex')+salt);
    await client.connect();
    client.select(0);
    const value = await client.get("users");
    await client.lpush(
      "users",
    ... JSON.stringify({ username: username, password: pass })
    );
    client.on("error", (err) => console.log("Redis Client Error", err));
    return;
  } catch (error) {
    throw new Error("some thing went wrong");
  }
}
async function authentication(user, pass) {
  try {
    await client.connect();
    client.select(0);
    const value = await client.get("users");
    const values = JSON.parse(value);
    const passhash = makehash(pass);
    for (const item of values) {
      if (item.username == user) {
        const userhash = item.password.replace(salt, " ");
        if (passhash !== userhash) {
          let jwtSecretKey = "shhhhh";
          var token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: { username: user, time: Date.now() },
            },
            jwtSecretKey
          );

          const response = {
            token: token,
            expires: "1hour",
            Domain: "127.0.0.1",
            path: 6379,
          };
          return response;
        }
      }
    }
  } catch (error) {
    throw new Error("somthing went wrong in login ");
  }
}

function makehash(pass) {
  const hash = createHash("sha256");
  hash.update(pass);
  const hashpass = hash.digest("hex");
  return hash.digest("hex");
}
async function getusers() {
  try {
    await client.connect();
    client.select(0);
    const value = await client.get("users");
    return value;
  } catch (error) {
    throw new Error("somthin went wrong in get user");
  }
}
async function makerole(role, path, method) {
  try {
    await client.connect();
    client.select(0);
    // await client.set("roles", {
    //   1: "admin",
    //   2: "user",
    //   3: "guest",
    // });
    // await client.set("resources", {
    //   1: "/service/users",
    // });
    // await client.set("permission", {
    //   1: "Create",
    //   2: "Read",
    //   3: "Write",
    //   4: "Delete",
    //   5: "Deny",
    // });
    await client.set("sources", [
      { role: "user", resource: "/service/users", permission: ["Read"] },
    ]);
    return;
  } catch (error) {
    throw new Error("somthin went wrong in get user");
  }
}

function authenticateToken(token) {
  if (decoded) {
    return "status:ok";
  } else {
    return "status:error";
  }
}
module.exports = { signupuser, authentication, getusers, makerole };
