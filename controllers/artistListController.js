const express = require ('express')
const router	= express.Router()
const ArtistList = require('../models/artistList')

const API_KEY = process.env.LASTFM_API_KEY

// View List
router.get('/', async (req, res) => {
	try {
		const foundLists = await ArtistList.find() // {userId: req.session.userId}
		res.json({
      status: 200,
      data: foundLists
    });
	} catch (err) {
		console.log(err)
	}
})

// Create a new list
router.post('/', async (req, res) => {
	try {
		console.log('this is req.body\n', req.body);
		const createdList = await ArtistList.create(req.body);
		res.json({
      status: 200,
      data: createdList
    });
	} catch (err) {
		console.log(err)
	}
})

// Delete a List
router.delete('/:listId', async (req, res) => {
	try {
		const deletedList = await ArtistList.findByIdAndRemove(req.params.listId)
		res.json({
			status: 200,
			data: deletedList
		})
	} catch (err) {
		console.log(err)
	}
})

// Add Artist to a List
router.put('/:listId/:artistId', async (req, res) => {
	try {
			// query api for artist
		const responseInfo = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${req.params.artistId}&api_key=${API_KEY}&format=json`)
		if (!responseInfo.ok) {
			throw Error(response.statusText)
		}
		const parsedResponseInfo = await responseInfo.json()
		console.log(parsedResponseInfo);
			
			// search db for artist by that id
		const foundArtist = await Artist.find({mbid: parsedResponseInfo.mbid})

			// if artists doesn't exist yet, create artist,
		if (!foundArtist) {
			const createdArtist = await Artist.create(req.body) //or something like that
		} 

			// find list it's being added to
		const foundList = await Artistlist.findOne({mbid: req.params.listId})

			// push artist into that list
		if (createdArtist) {
			foundlist.push(createdArtist)
			res.json({
				status: 200,
				data: createdArtist
			})
		} else {
			foundList.push(foundArtist)
			res.json({
				status: 200,
				data: foundArtist
			})
		}

	} catch (err) {
		console.log(err)
	}
})

// Delete Artist from a list
router.put('/:listId/:artistId/delete', (req, res) => {
	try {
		
	} catch (err) {
		console.log(err)
	}
})


// Change Name of List
router.put('/:listId', async (req, res) => {
	try {
		const updatedList = await ArtistList.findByIdAndUpdate(req.params.listId, req.body, {new: true})
		res.json({
			status: 200,
			data: updatedList
		})
	} catch (err) {
		console.log(err)
	}
})






module.exports = router;