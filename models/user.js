const mongoose = require ('mongoose')
const ArtistList = require('./artistList')

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: String,
	artistLists: [ArtistList.schema],
	photo: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User