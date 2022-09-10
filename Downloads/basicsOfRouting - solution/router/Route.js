const {checkUrlSlash} = require('./helper');

class Route {
    constructor(url, handler, method, prefix) {
        this.url = (prefix)? checkUrlSlash(prefix) + checkUrlSlash(url) : checkUrlSlash(url);
        this.handler = handler; 
        this.method = method;
        this.middlewares = [];
    }

    middleware(middleware) {
        if (Array.isArray(middleware))
          middleware.forEach(mid => this.middlewares.push(mid));
        else
          this.middlewares.push(middleware);
    
        return this;
    }
}

module.exports = Route;