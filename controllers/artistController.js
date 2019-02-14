const express = require ('express')
const router	= express.Router();
const fetch   = require('node-fetch')
const Artist  = require('../models/artist')

const API_KEY = process.env.LASTFM_API_KEY

// Create
// http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=broadcast&api_key=API_KEY&format=json
// Show






/********* Artist Search Route **********/
router.post('/', async (req, res) => {
	//console.log("hitting");
	try {
		//console.log(req.body.searchArtist, 'this is req.body');

		// get artist info
		const responseInfo = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${req.body.artist}&autocorrect=1&api_key=${API_KEY}&format=json`)
		if (!responseInfo.ok) {
			throw Error(response.statusText)
		}
		const parsedResponseInfo = await responseInfo.json()

		// get top tracks by artist
		const responseTopTracks = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${req.body.artist}&autocorrect=1&api_key=${API_KEY}&limit=20&format=json`)
		if (!responseTopTracks.ok) {
			throw Error(responseTopTracks.statusText)
		}
		const parsedResponseTopTracks = await responseTopTracks.json()

		// get top albums by artist
		const responseTopAlbums = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${req.body.artist}&autocorrect=1&api_key=${API_KEY}&limit=5&format=json`)
		if (!responseTopAlbums.ok) {
			throw Error(responseTopAlbums.statusText)
		}
		const parsedResponseTopAlbums = await responseTopAlbums.json()	

		// response to front end
		res.json({
			status: 200,
			info: parsedResponseInfo,
			tracks: parsedResponseTopTracks,
			albums: parsedResponseTopAlbums
		})		

	} catch (err) {
		console.log(err)
	}
})























module.exports = router