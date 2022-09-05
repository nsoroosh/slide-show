const {
  playlistdbConfig,
  favoritedbConfig
} = require("../apps/users/config.js");
const playlistclass = require("../apps/users/models/playlist.model");
const { Pool } = require("pg");
const pool = new Pool(playlistdbConfig);

class PlaylistRepository {
  constructor(storageType) {
    // this._storageType = storageType;
    // this._id;
    // this._connectionManager = connectionManager();
  }
  async fetchplaylistbyid(id) {
    try {
      const playlistDataStore = await pool.query(
        `select * from playlist WHERE playlist_id=${id}`,
        []
      );
      const playlist = this._createPlaylistModels(playlistDataStore.rows);
      return playlist;
    } catch (error) {
      throw new Error("some thing went wrong in fetchplaylist by id");
    }
  }
  async fetchAllplaylist() {
    try {
      const playlistDataStore = await pool.query("select * from playlist", []); 
      const playlist = this._createPlaylistModels(playlistDataStore.rows);
      return playlist;
    } catch (error) {
      throw new Error("some thing went wrong");
    }
  }
  async postIntoPlaylist(data) {
    
    const query = "INSERT INTO playlist(playlist_name, creator,user_id) VALUES($1, $2,$3)";
    const values = [data.playlist_name, data.creator, data.user_id];
    try {
      await pool.query(query, values); 
      return values;
    } catch (error) {
      throw new Error("some thing went wrong");
    }
  }
  async deleteplaylist(id){
    const query=`DELETE FROM playlist WHERE playlist_id=${id}`
    console.log(id);
    try {
      await pool.query(query); 
      return ``
    } catch (error) {
      throw new Error("some thing went wrong");
    }
  }
  async updayeplaylist (id,data){
    const query = `UPDATE playlist
    SET playlist_name = $1
    WHERE id = ${id}`
    const values=[data.playlist_name]
  }
  
  _createPlaylistModels(playlistDataStore) {
    const playlist = [];
    for (let item of playlistDataStore) {
      let playlistModel = new playlistclass(
        item.playlist_id,
        item.playlist_name,
        item.creator,
        item.user_id
      );
      playlist.push(playlistModel);
    }
    return playlist;
  }
}


module.exports = PlaylistRepository;

