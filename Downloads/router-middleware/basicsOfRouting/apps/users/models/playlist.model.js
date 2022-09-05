





class playlist {
   playlist_id  
    playlist_name;
    creator;
    user_id;
    constructor(playlist_id, playlist_name, creator, user_id) {
      this.playlist_id=playlist_id
      this.playlist_name = playlist_name;
      this.creator = creator;
      this.user_id = user_id;
      this.musics=[]
    }
  }


  
  module.exports =playlist ;
    

