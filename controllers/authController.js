const express = require ('express')
const router	= express.Router()
const User		= require ('../models/user')




// Add a User
router.post('/', async (req, res) => {
  console.log(req.body, ' this is body of auth')
  try {
    const user = await User.create(req.body);
    req.session.logged = true;
    req.session.username = req.body.username;
    res.json({
      status: 200,
      data: 'login successful'
    });
    console.log(req.session, ' this is session');
  } catch(err){
    console.log(err);
    res.send(err);
  }
});

// View User's Page

// Edit User's Name or Info

// Delete User

// Display User's Lists


module.exports = router
