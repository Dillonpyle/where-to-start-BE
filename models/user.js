const mongoose = require ('mongoose')
const ArtistList = require('./artistlist')

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	artistlists: [ArtistList.schema],
	photo: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User