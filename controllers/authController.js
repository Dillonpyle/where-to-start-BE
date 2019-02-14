const express = require ('express')
const router	= express.Router()
const User		= require ('../models/user')
const bcrypt  = require ('bcryptjs')



// Login
// router.post('/login', async (req, res) => {
//   console.log(req.body, ' this is body of auth')
//   try {
//     const user = await User.create(req.body);
//     req.session.logged = true;
//     req.session.username = req.body.username;
//     res.json({
//       status: 200,
//       data: 'login successful'
//     });
//     console.log(req.session, ' this is session');
//   } catch(err){
//     console.log(err);
//     res.send(err);
//   }
// });


// REGISTER
router.post('/register', async (req, res) => {

  // hash the password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // lets create a object for our db entry;
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash

  // create a user from the object
  const createdUser = await User.create(userDbEntry)
  console.log(createdUser);
  req.session.username = createdUser.username;
  req.session.loggedIn   = true;

  res.json({
    status: 200,
    data: createdUser,
    loggedIn: req.session.loggedIn
  })
})

// LOGIN
router.post('/login', async (req, res) => {
  const foundUser = await User.findOne({username: req.body.username})
  console.log(foundUser);
  if(foundUser){
     //now compare hash with the password from the form
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.message  = '';
        req.session.username = req.body.username;
        req.session.loggedIn = true;
        console.log(req.session, req.body)
        res.json({
          status: 200,
          data: foundUser,
          loggedIn: req.session.loggedIn
        })        
    } else {
      console.log('else in bcrypt compare')
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
  await req.session.destroy((err))
  res.json
})




// View User's Page

// Edit User's Name or Info

// Delete User

// Display User's Lists


module.exports = router
