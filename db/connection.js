const { mongoose } = require('mongoose')

const DATABASE_URL = 'mongodb://localhost/mongoose-relationships'
const CONFIG = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
	.on('open', () => console.log('Connected to Mongoose'))
	.on('close', () => console.log('Disconnected from Mongoose'))
	.on('error', (error) => console.log(error))

module.exports = mongoose
