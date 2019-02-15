const mongoose = require ('mongoose')

const artistSchema = new mongoose.Schema({
	artistName: String,
	mbid: String,
	topAlbum: String,
	topAlbumImg: String,
	topTrack0: String,
	topTrack3: String,
	topTrack10: String,
	image: String,
	description: String,
	similar: [String],
	tags: [String],
})


const Artist = new mongoose.model('Artist', artistSchema);

module.exports = Artist
