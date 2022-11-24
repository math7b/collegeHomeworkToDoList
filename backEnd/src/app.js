const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const dotenv = require('dotenv')
const MongoServer = require('./db/db')

dotenv.config()
MongoServer()


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', express.static('public'))
app.use('/api', routes)

//Rota para tratar erros - deve ser sempre a última!
app.use(function (req, res) {
    res.status(404).json({
        errors: [
            {
                value: `${req.originalUrl}`,
                msg: `A rota ${req.originalUrl} não existe nesta API!`,
                param: 'invalid route'
            }
        ]
    })
})

module.exports = app