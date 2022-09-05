const profileController = require("./controllers/profile.controller");
const favoritecontroller = require("./controllers/favorite.controller.js")
const playlistcontroller = require("./controllers/playlist.controller")
const {fetchQueryStringFromURL,getPostData} = require("../../modules/parser/parser");

const routes = [
  {
    url: "profiles",
    method: "GET",
    controller: profileController.getAllProfiles,
    middlewares: [],
  },
  {
    url:"playlists",
    method:"GET",
    controller:playlistcontroller.getAllPlaylists,
    middlewares:[]
  },
  { 
    url:"playlist",
    method:"GET",
    controller:playlistcontroller.getplaylistByid,
    middlewares:[fetchQueryStringFromURL]

  },
  {
    url:"playlists",
    method:"POST",
    controller:playlistcontroller.postPlaylist,
    middlewares:[getPostData]
  },
  {
    url:"playlists",
    method:"PUT",
    controller:playlistcontroller.updayeplaylist,
    middlewares:[]
  },
  {
    url:`playlists`,
    method:"DELETE",
    controller:playlistcontroller.deleteplaylist,
    middlewares:[fetchQueryStringFromURL]
  },
  {
    url:"favorites",
    method:"GET",
    controller:favoritecontroller.getAllfavorites,
    middlewares:[]
  },
  { 
    url:"favorite",
    method:"GET",
    controller:favoritecontroller.getfavoritebyId,
    middlewares:[fetchQueryStringFromURL]

  },
  {
    url:"favorites",
    method:"POST",
    controller:favoritecontroller.postIntofavorites,
    middlewares:[getPostData]
  },
  {
    url:"favorites",
    method:"PUT",
    controller:favoritecontroller.updayefavorites,
    middlewares:[]
  },
  {
    url:`favorites`,
    method:"DELETE",
    controller:favoritecontroller.deletelike,
    middlewares:[fetchQueryStringFromURL]
  },

];

module.exports = routes;
