const express = require ('express')
const router	= express.Router()
const ArtistList = require('../models/artistList')

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

// Edit list
// 		Add Artist to a List
// 		Change Name of List
//  	Delete Artist from a list


module.exports = router;