const musiccontroller = require("./controllers/music.controller")
const {fetchQueryStringFromURL,getPostData} = require("../../modules/parser/parser");

const routes = [
{
url:"allmusic",
method:"GET",
controller:musiccontroller.getAllMusics,
middlewares:[]
},
{
url:"music",
method:"GET",
controller:musiccontroller.getmusicByid,
middlewares:[fetchQueryStringFromURL]

},
{
url:"music",
method:"POST",
controller:musiccontroller.postMusic,
middlewares:[]
},
{
url: "music",
method: "DELETE",
controller:musiccontroller.deletemusic,
middlewares:[]
},
{
    url:"music",
    method:"PUT",
    controller:musiccontroller.updatemusic,
    middlewares:[]
    }
];

module.exports = routes;
