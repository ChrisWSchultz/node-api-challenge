const database = require('../data/helpers/projectModel')

function validateProjectID(request, response, next) {
    return (request, response, next) => {
        database.get(request.params.id)
            .then((project) => {
                if(project) {
                    request.project = project
                    next()
                } else {
                    response.status(404).json({
                        message: "Unable to find project with that ID."
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                response.status(500).json({
                    error: "There was an issue. Please try again later."
                })
            })
    }
}

function validateProject(request, response, next) {
    return (request, response, next) => {
        if(!request.body.name || !request.body.description) {
            response.status(400).json({ message: "The request is missing the required name or description."})
        } else {
            next()
        }
    }
}

module.exports = {validateProjectID, validateProject}
