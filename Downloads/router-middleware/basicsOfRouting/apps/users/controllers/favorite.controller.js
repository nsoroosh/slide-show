const Favoriterepository = require("../../../repositories/favorite.repository");
const favoriterepository = new Favoriterepository();

const url = require("url");

const getAllfavorites = async (req, res) => {
  try {
    const favorite = await favoriterepository.getAllmusiclikes();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(favorite));
  } catch (error) {
    throw error;
  }
};
const getfavoritebyId = async (req, res) => {
  try {
    url_parts = url.parse(req.url, true);
    let id = url_parts?.query?.id;
    const favorite = await favoriterepository.getfavoritebyId(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(favorite));
  } catch (error) {
    throw error;
  }
};
const postIntofavorites = async (req, res) => {
  try {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const playlists = await favoriterepository.postmusiclike(JSON.parse(data));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};

const deletelike = async (req, res) => {
  try {
    url_parts = url.parse(req.url, true);
    let id = url_parts?.query?.id;
    const like = await favoriterepository.deletelike(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(like));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllfavorites,
  postIntofavorites,
  deletelike,
  getfavoritebyId
};
