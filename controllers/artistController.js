const express = require ('express')
const router	= express.Router();
const Artist  = require('../models/artist')
const fetch = require('node-fetch')

const API_KEY = process.env.LASTFM_API_KEY

// Create
// http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=broadcast&api_key=API_KEY&format=json
// Show
router.get('/', async (req, res) => {
	console.log("hitting");
	try {
		const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=broadcast&api_key=${API_KEY}&format=json`)
		console.log(response);


		if (!response.ok) {
			throw Error(response.statusText)
		}

		const parsedResponse = await response.json()
		console.log(parsedResponse);

		res.json({
			status: 200,
			data: parsedResponse
		})		

	} catch (err) {
		console.log(err)
	}
})























module.exports = router