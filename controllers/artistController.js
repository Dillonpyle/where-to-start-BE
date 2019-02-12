const express = require ('express')
const router	= express.Router();
const Artist  = require('../models/artist')
const fetch = require('node-fetch')

const API_KEY = process.env.LASTFM_API_KEY

// Create
// http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=broadcast&api_key=API_KEY&format=json
// Show
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });







router.post('/', async (req, res) => {
	console.log("hitting");
	try {
		console.log(req.body.searchArtist, 'this is req.body');
		const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${req.body.searchArtist}&api_key=${API_KEY}&format=json`)

		if (!response.ok) {
			throw Error(response.statusText)
		}

		const parsedResponse = await response.json()
		console.log('this is parsedResponse:\n', parsedResponse);

		res.json({
			status: 200,
			data: parsedResponse
		})		

	} catch (err) {
		console.log(err)
	}
})























module.exports = router