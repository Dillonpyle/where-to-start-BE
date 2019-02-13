const express 	 = require ('express')
const router		 = express.Router()
const ArtistList = require('../models/artistList')
const Artist 		 = require('../models/artist')

const API_KEY = process.env.LASTFM_API_KEY

// View All Lists
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
router.put('/:listId', async (req, res) => {
	try {		
		// find list it's being added to
		const foundList = await ArtistList.findOne({ _id: req.params.listId })
			
		// search db for artist by that id
		const foundArtist = await Artist.findOne({mbid: req.body.mbid})

		// if foundList already has artist of artist.name, don't add
		console.log('foundArtist\n', foundArtist );
		console.log('foundList\n', foundList);

			// if artists doesn't exist yet, create artist,
		if (!foundArtist) {
			const createdArtist = await Artist.create(req.body) //or something like that
			console.log('createdArtist\n', createdArtist);

				// push artist into that list
				foundList.artists.push(createdArtist)
				await foundList.save()
				//send response
				res.json({
					status: 200,
					data: foundList
				})

		} else {
			// check for duplicates
			const artistAlreadyInList = foundList.artists.find((artist) => artist.mbid === foundArtist.mbid)
			if (artistAlreadyInList) {
				res.json({
					status: 200,
					data: foundList
				})
			} else {
				// push artist into list if no duplicates found
				foundList.artists.push(foundArtist)
				await foundList.save()
				res.json({
					status: 200,
					data: foundList
				})
			}
		}
	} catch (err) {
		console.log(err)
	}
})

// Delete Artist from a list
router.put('/:listId/:artistId/delete', async (req, res) => {
	try {
		// Search DB for list Id
		const foundList = await ArtistList.findOne({ _id: req.params.listId })

		// Find Artist by mbid in list's artist array
		const indexOfArtist = foundList.artists.findIndex(artist => artist.mbid === req.params.artistId)

		// splice Artist from that list 
		const updatedList = foundList.splice(indexOfArtist, 1)

		// return updated list
		res.json({
			status: 200,
			data: updatedList
		})
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

		// probably don't need this
		
		// 	// query api for artist
		// const responseInfo = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${req.params.artistId}&api_key=${API_KEY}&format=json`)
		// if (!responseInfo.ok) {
		// 	throw Error(response.statusText)
		// }
		// const parsedResponseInfo = await responseInfo.json()
		// console.log(parsedResponseInfo);




module.exports = router;