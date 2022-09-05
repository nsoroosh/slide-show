class music {
    music_id;
    music_name;
    music_artist;
    music_album;
    music_datecreated;
    music_uploaddate;
    music_duration;
    music_lyrics;
    music_musicposter;
    music_musicurl;
    music_category;
    constructor(id, name, artist, album, datecreated, uploaddate, duration, lyrics, musicposter, musicurl, category) {
    this.music_id = id;
    this.music_name = name;
    this.music_artist = artist;
    this.music_album = album;
    this.music_datecreated = datecreated;
    this.music_uploaddate = uploaddate;
    this.music_duration = duration;
    this.music_lyrics = lyrics;
    this.music_musicpic = musicposter;
    this.music_musicurl= musicurl;
    this.music_category = category;
    }
    }
    module.exports = music;