const express = require('express')
const { check, validationResult } = require('express-validator')
const toDoList = require('./db/modules/toDoList')

const routes = express.Router()

const validaToDoList = [
    check('titulo', 'O titulo é obrigatório')
        .not()
        .isEmpty(),
    check('dataCriacao', 'A data de criação é obrigatória')
        .not()
        .isEmpty(),
    check('dataAlteracao', 'A data de alteração é obrigatória')
        .not()
        .isEmpty(),
    check('concluido', 'Só true/1 ou false/0')
        .not()
        .isEmpty()
        .isBoolean(),
]

//Inicio da API
routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Fatec Mobile 100% funcional🖐',
        version: '1.0.0'
    })
})

//List todos os afazeres
routes.get('/toDoList/listar', async (req, res) => {
    try {
        const afazeres = await toDoList.find()
        res.json(afazeres)
    } catch (error) {
        res.status(500).send({
            errors: [{ message: 'Não foi possivel encontrar as listas de afazeres' }]
        })
    }
})

//Lista um afazer
routes.get('/toDoList/:id', async (req, res) => {
    try {
        const afazer = await toDoList.findById(req.params.id)
        res.json(afazer)
    } catch (error) {
        res.status(500).send({
            errors: [{ message: 'Não foi possivel encontrar as listas de afazeres' }]
        })
    }
})

//Cria um afazer
routes.post('/toDoList/criar', validaToDoList, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const afazeres = new toDoList(req.body)
        await afazeres.save()
        res.send(afazeres)
    } catch (error) {
        return res.status(500).json({
            errors: [{
                message: `Erro ao criar a lista de afazeres: ${error.message}`
            }]
        })
    }
})

//Atualiza um afazer
routes.post('/toDoList/atualizar/:id', validaToDoList, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
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
            errors: [{
                message: `Erro na edição do afazer, erro: ${error.message}`
            }]
        })
    }
})

//Deleta um afazer
routes.delete('/toDoList/deletar/:id', async (req, res) => {
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
            errors: [{
                message: `Erro ao deletar o afazer, error: ${error.message}`
            }]
        })
    }
})

module.exports = routes