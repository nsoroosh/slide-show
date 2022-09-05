const MusicRepositories = require("../../../repositories/music.rerpositories");
const musicRepository = new MusicRepositories();
const url = require("url");

const getAllMusics = async (req, res) => {
  try {
    const musics = await musicRepository.fetchAllmusic();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(musics));
  } catch (error) {
    throw error;
  }
};
const getmusicByid = async (req, res) => {
  try {
    url_parts = url.parse(req.url, true);
    let id = url_parts?.query?.id;
    const musics = await musicRepository.fetchmusicid(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(musics));
  } catch (error) {
    throw error;
  }
};
const postMusic = async (req, res) => {
  try {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    let data = Buffer.concat(buffers).toString();
    console.log(data);

    data=JSON.parse(data)
    //fix order
    const {
      music_name,
      music_artist,
      music_album,
      music_datecreated,
      music_uploaddate,
      music_duration,
      music_lyrics,
      music_musicurl,
      music_category,
      music_musicpic,
    } = data;

    const fixData = {
      "music_name": music_name,
        "music_artist": music_artist,
        "music_album": music_album,
        "music_category": music_category,
        "music_datecreated": music_datecreated,
        "music_uploaddate": music_uploaddate,
        "music_duration": music_duration,
        "music_lyrics": music_lyrics,
        "music_musicurl": music_musicurl,
        "music_musicpic": music_musicpic
    };
// end fix order
console.log(fixData);
    const music = await musicRepository.postIntoMusic(fixData);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(music));
  } catch (error) {
    throw error;
  }
};
const deletemusic = async (req, res) => {
  try {
    url_parts = url.parse(req.url, true);
    let id = url_parts?.query?.id;
    const musics = await musicRepository.deletemusic(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(req.body));
  } catch (error) {
    throw error;
  }
};
// const updatemusic = async (req, res) => {
//   try {
//     if (true) {
//       const id = req.url.split("=")[1];
//       const musics = await musicRepository.updatemusic(id, req);
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(req.body));
//     }
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  getAllMusics,
  postMusic,
  getmusicByid,
  deletemusic,
};
