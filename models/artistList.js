const mongoose = require ('mongoose')
const Artist   = require ('./artist')

const artistListSchema = new mongoose.Schema({
	user: String,
	userId: String,
	name: String,
	artists: [Artist.schema]
})


const ArtistList = new mongoose.model('ArtistList', artistListSchema);

module.exports = ArtistList


