const express = require ('express')
const router	= express.Router()
const User		= require ('../models/user')
const bcrypt  = require ('bcryptjs')


// REGISTER
router.post('/register', async (req, res) => {

  // check for duplicate users
  const foundUser = await User.findOne({username: req.body.username})
  if (foundUser) {
    req.session.message = 'Username is unavailable';
    req.session.loggedIn = false
    res.json({
      status: 200,
      data: null,
      loggedIn: req.session.loggedIn,
      message: req.session.message
    })
  } else {
    // hash the password
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // create an object for db entry
    const userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash

    // create a user from the object
    const createdUser = await User.create(userDbEntry)

    req.session.username = createdUser.username;
    req.session.loggedIn   = true;

    res.json({
      status: 200,
      data: createdUser,
      loggedIn: req.session.loggedIn
    })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  const foundUser = await User.findOne({username: req.body.username})

  if(foundUser){
     // compare hash with the password from the form
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.message  = '';
        req.session.username = req.body.username;
        req.session.loggedIn = true;

        res.json({
          status: 200,
          data: foundUser,
          loggedIn: req.session.loggedIn
        })        
    } else {

      req.session.message = 'Username or password are incorrect';
      req.session.loggedIn = false
      res.json({
        status: 200,
        data: null,
        loggedIn: req.session.loggedIn,
        message: req.session.message
      })
    }
  } else {
      req.session.message = 'Username or password are incorrect';
      req.session.loggedIn = false
      res.json({
        status: 200,
        data: null,
        loggedIn: req.session.loggedIn,
        message: req.session.message
      })
  }
})

// LOGOUT
router.get('/logout', async (req, res) => {
  try {
    await req.session.destroy()
    res.json({
      status: 200,
      data: null,
      loggedIn: false,
      message: 'User has logged out'
    })
    
  } catch (err) {
    console.log(err)
  }
})

// View User's Page

// Edit User's Name or Info

// Delete User

// Display User's Lists


module.exports = router
