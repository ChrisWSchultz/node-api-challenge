const express = require('express')
const database = require('../data/helpers/actionModel')

const {validateAction, validateActionID} = require("../middleware/actions")

const router = express.Router()

router.get('/api/actions', (request, response) => {
    database.get()
        .then((actions) => {
            response.status(200).json(actions)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json(error)
        })
})

router.get('/api/actions/:id', validateActionID(), (request, response) => {
    database.get(request.params.id)
        .then((action) => {
            response.status(200).json(action)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json(error)
        })
})

router.post('/api/actions', validateAction(), (request, response) => {
    let newAction = request.body
    database.insert(newAction)
        .then((action) => {
            response.status(200).json(action)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json(error)
        })
})

router.put('/api/actions/:id', validateAction(), validateActionID(), (request, response) => {
    let updateAction = request.body
    database.update(request.params.id, updateAction)
        .then((action) => {
            response.status(200).json(action)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json(error)
        })
})

router.delete('/api/actions/:id', validateActionID(), (request, response) => {
    database.remove(request.params.id)
        .then((result) => {
            response.status(200).json(result)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json(error)
        })
})

module.exports = router
