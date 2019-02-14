const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI//'mongodb://localhost/where-to-start'


mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: true
})

mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to ', connectionString);
})

mongoose.connection.on('error', (err) => {
	console.log('Mongoose encountered error ', err);
})

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected from ', connectionString);
})