const { favoritedbConfig } = require("../apps/users/config.js");
const Favoriteclass = require("../apps/users/models/favorite.model");
const { Pool } = require("pg");
const pool = new Pool(favoritedbConfig);

class Favoriterepository{
  async getAllmusiclikes(){
    try {
      const query = "select * from favorite"
     const favoriteDatastore= await pool.query(query)
      const likes = this._createFavoritesModels(favoriteDatastore.rows);
      return likes
    } catch (error) {
      throw new Error("some thing went wrong in get ")
    }
  }
  async getfavoritebyId(id){
    try {
      const query = `select * from favorite WHERE favorite_id=${id}`
     const favoriteDatastore= await pool.query(query)
     const likes = this._createFavoritesModels(favoriteDatastore.rows);
     return likes
    } catch (error) {
      throw new Error("some thing went wrong in getid ")
    }
  }
    async postmusiclike(data){
        const query = "INSERT INTO favorite(user_id,music_id) VALUES($1, $2)";
    const values = [data.user_id, data.music_id];
    try {
      await pool.query(query, values); 
      return values;
    } catch (error) {
      throw new Error("some thing ent wrong in post ");
    }
    }
   
    async deletelike(id){
      const query=`DELETE FROM favorite WHERE favorite_id=${id}`
      try {
        await pool.query(query); 
        return `like by id:${id} deleted`
      } catch (error) {
        throw new Error("some thing nt wrong");
      }
    }
    _createFavoritesModels(favoriteDatastore) {
      const favorite = [];
      for (let item of favoriteDatastore) {
        let favoriteModel = new Favoriteclass(
         item.favorite_id,
          item.music_id,
          item.user_id
        );
        favorite.push(favoriteModel);
      }
      return favorite;
    }
}
// (async () => {
//     const query = 'select * from favorite';
//     const res = await pool.query(query);
//     console.log(res.rows);

//     pool.end();
// })();

module.exports=Favoriterepository