/*************** APP SECURITY ******************/
require('dotenv').config()

/************* RUN DB FILE ***************/
require('./db/db')

/************* IMPORT MODULES ***************/
const express 		= require ('express')
const app 				= express();
const bodyParser 	= require ('body-parser')
const cors 				= require ('cors')
const session 		= require ('express-session')

/************* SET UP SESSION ***************/
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

/************* MIDDLEWARE ***************/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/************* SET UP CORS ***************/


const corsOptions = {
	origin: process.env.CORS_ORIGIN, //'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions))


/************* CONTROLLERS ***************/
const artistListController = require('./controllers/artistListController')
app.use('/api/v1/artist-list', artistListController);

const artistController = require('./controllers/artistController')
app.use('/api/v1/artist', artistController)

const authController = require('./controllers/authController')
app.use('/auth', authController)








/************* RUN SERVER ***************/
app.listen(process.env.PORT, () => {
	console.log('Server is listening on port ' + process.env.PORT);
})