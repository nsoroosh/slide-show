const playlistclass = require("../../../repositories/playlist.repository")
const playlistRepository = new playlistclass()
const getAllPlaylists =  async (req, res) =>{
  try {
    const playlists = await playlistRepository.fetchAllplaylist();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(playlists));
  } catch (error) {
    throw error;
  }
};
const getplaylistByid =async (req, res) => {
  try {
    
    const playlists = await playlistRepository.fetchplaylistbyid(req.params.id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(playlists));
  } catch (error) {
    throw error;
  }
};
const postPlaylist =async   (req, res)=>  {
  try {
   
    const playlists = await playlistRepository.postIntoPlaylist(
      req.body
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(req.body));
  } catch (error) {
    throw error;
  }
};
const deleteplaylist = async    (req, res) => {
  try {
    url_parts = url.parse(req.url, true);
    let id = url_parts?.query?.id;
    const playlists = await playlistRepository.deleteplaylist(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(req.body));
  } catch (error) {
    throw error;
  }
};
const updayeplaylist = async    (req, res) => {
  try {
    if (true) {
      const id = req.url.split("/")[5];
      const playlists = await playlistRepository.updayeplaylist(id, req);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.body));
    }
  } catch (error) {
    throw error;
  }
};







module.exports = {
  getAllPlaylists,
  postPlaylist,
  getplaylistByid,
  deleteplaylist,
  updayeplaylist,
};
