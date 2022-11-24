const express = require('express')
const toDoList = require('./db/modules/toDoList')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Fatec Mobile 100% funcional🖐',
        version: '1.0.0'
    })
})

//List todos os afazeres
routes.get('/toDoList/list', async (req, res) => {
    try {
        const afazeres = await toDoList.find()
        res.json(afazeres)
    } catch (error) {
        res.status(500).send({
            errors: [{ message: 'Não foi possivel encontrar as listas de afazeres' }]
        })
    }
})

//Cria um afazer
routes.post('/toDoList/create', async (req, res) => {
    try {
        const afazeres = new toDoList(req.body)
        await afazeres.save()
        res.send(afazeres)
    } catch (error) {
        return res.status(500).json({
            errors: [{ message: `Erro ao criar a lista de afazeres: ${error.message}` }]
        })
    }
})

//Atualiza um afazer
routes.post('/toDoList/update/:id', async (req, res) => {
    try {
        const dados = req.body
        await toDoList.findByIdAndUpdate(req.params.id, { $set: dados }, { new: true })
            .then((toDoList) => {
                res.send({
                    message: 'O afazer foi editado'
                })
            })
    } catch (error) {
        return res.status(500).json({
            errors: [{ message: `Erro na edição do afazer, erro: ${error.message}` }]
        })
    }
})

routes.delete('/toDoList/delete/:id', async (req, res) => {
    try {
        const checkId = await toDoList.findById(req.params.id)
        if (checkId !== null) {
            await toDoList.findByIdAndDelete(req.params.id)
                .then((toDoList) => {
                    res.send({
                        message: 'O afazer foi deletado com sucesso'
                    })
                })
        } else {
            return res.status(400).json({
                error: [{
                    message: 'O afazer não foi encontrado'
                }]
            })
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{ message: `Erro ao deletar o afazer, erro: ${error.message}` }]
        })
    }
})

module.exports = routes