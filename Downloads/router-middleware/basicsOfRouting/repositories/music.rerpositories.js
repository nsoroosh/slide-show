const { musicdbConfig } = require("../apps/music/config.js");
const musicclass = require("../apps/music/models/music.models");
const { Pool } = require("pg");
const pool = new Pool(musicdbConfig);

class MusicRepositories {
  constructor(storageType) {
    // this._storageType = storageType;
    // this._id;
    // this._connectionManager = connectionManager();
  }
  async fetchmusicid(id) {
    try {
      const musicDataStore = await pool.query(
        `select * from music WHERE music_id=${id}`,
        []
      );
      const music = this._createMusicModels(musicDataStore.rows);
      return music;
    } catch (error) {
      throw new Error("some thing went wrong");
    }
  }
  async fetchAllmusic() {
    try {
      const musicDataStore = await pool.query("select * from music", []); 
      const music = this._createMusicModels(musicDataStore.rows);
      return music;
    } catch (error) {
      throw new Error("some thing went wrong");
    }
  }
  async postIntoMusic(data) {
    
    const query = `INSERT INTO music(music_name, music_artist,music_album, music_category,
        music_datecreated, music_uploaddate, music_duration, music_lyrics, music_pic, 
        music_url) VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10)`;
    const values = [data.music_name, data.music_artist,data.music_album,
         data.music_category, data.music_datecreated, data.music_uploaddate,
          data.music_duration, data.music_lyrics, data.music_pic, data.music_url];
    try {
      await pool.query(query, values); 
      return values;
    } catch (error) {
      throw new Error("some thing went wrong in post");
    }
  }
  async deletemusic(id){
    const query=`DELETE FROM music WHERE music_id=${id}`
    console.log(id);
    try {
      await pool.query(query); 
      return ``
    } catch (error) {
      throw new Error("some thing went wrong");
    }

  }
  // async updatemusic (id,data){
  //   const query = `UPDATE music
  //   SET music_name = $1,
  //   music_artist = $2,
  //   music_album = $3,
  //   music_category = $4,
  //   music_datecreated = $5,
  //   music_uploaddate = $6,
  //   music_duration = $7,
  //   music_lyrics = $8,
  //   music_pic = $9,
  //   music_url = $10,
  //   WHERE id = ${id}`
  //   const values=[data.music_name, data.music_artist,data.music_album, data.music_category, data.music_datecreated, data.music_uploaddate, data.music_duration, data.music_lyrics, data.music_pic, data.music_url]
  // }
  
  _createMusicModels(musicDataStore) {
    const music = [];
    for (let item of musicDataStore) {
      let musicModel = new musicclass(
        item.music_id,
        item.music_name,
        item.music_artist,
        item.music_album,
        item.music_category,
        item.music_datecreated,
        item.music_uploaddate,
        item.music_duration,
        item.music_lyrics,
        item.music_pic,
        item.music_url
      );
      music.push(musicModel);
    }
    return music;
  }
}

// (async ()=>{
//     const query = `INSERT INTO music(music_name, music_artist,music_album, music_category,
//         music_datecreated, music_uploaddate, music_duration, music_lyrics, music_pic, 
//         music_url) VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10)`;
//     const values = ["nini","nini","nini","nini",4,5,6,"nini","nini","nini"];
//     {
//       await pool.query(query, values); 
//       return values;
//     }
//     pool.end();

// })();

module.exports = MusicRepositories;
