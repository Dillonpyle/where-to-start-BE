const mongoose = require ('mongoose')

const artistListSchema = new mongoose.Schema({
	name: String,
	artists: [String]
});

const ArtistList = new mongoose.model('ArtistList', artistListSchema);

module.exports = ArtistList