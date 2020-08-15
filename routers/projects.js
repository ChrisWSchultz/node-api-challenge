const express = require('express')
const database = require('../data/helpers/projectModel')

const {validateProjectID, validateProject} = require('../middleware/projects')

const router = express.Router()

router.get('/api/projects', (request, response) => {
    database.get()
        .then((projects) => {
            response.status(200).json(projects)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json({
                error: "Something went wrong. Please try again later."
            })
        })
})

router.get('/api/projects/:id', validateProjectID(), (request, response) => {
    response.status(200).json(request.project)
})

router.get('/api/projects/:id/actions', validateProjectID(), (request, response) => {
    database.getProjectActions(request.params.id)
        .then((actions) => {
            response.status(200).json(actions)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json({
                error: "Something went wrong. Please try again later."
            })
        })
})

router.post('/api/projects', validateProject(), (request, response) => {
    let newProject = request.body
    database.insert(newProject)
        .then((project) => {
            response.status(201).json(project)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json({
                error: "Something went wrong. Please try again later."
            })
        })
})

router.put('/api/projects/:id', validateProject(), validateProjectID(), (request, response) => {
    let updateProject = request.body
    database.update(request.params.id, updateProject)
        .then((project) => {
            response.status(201).json(project)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json({
                error: "Something went wrong. Please try again later."
            })
        })
})

router.delete('/api/projects/:id', validateProjectID(), (request, response) => {
    database.remove(request.params.id)
        .then((result) => {
            response.status(201).json(result)
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json({
                error: "Something went wrong. Please try again later."
            })
        })
})

module.exports = router
