const mongoose = require('mongoose')

const toDoListSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: false
    },
    dataCriacao:{
        type: String,
        required: true
    },
    prazo:{
        type: String,
        required: false
    },
    concluido:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('toDoList', toDoListSchema)