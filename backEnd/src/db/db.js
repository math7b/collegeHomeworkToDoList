const mongoose = require('mongoose')

const MongoServer = async () => {
    try {
        mongoose.connect(`${process.env.MONGODB}`)
        console.log('connected database')
    } catch (error) {
        console.error(error)
        throw e
    }
}

module.exports = MongoServer