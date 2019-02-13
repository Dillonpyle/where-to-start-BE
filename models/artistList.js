const mongoose = require ('mongoose')

const artistListSchema = new mongoose.Schema({
	userId: String,
	name: String,
	artists: [String]
})

const ArtistList = new mongoose.model('ArtistList', artistListSchema);

module.exports = ArtistList


