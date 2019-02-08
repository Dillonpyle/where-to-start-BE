const mongoose = require ('mongose')

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	artistlists: [ArtistList.Schema],
	photo: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User