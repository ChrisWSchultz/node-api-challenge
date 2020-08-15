const database = require('../data/helpers/actionModel')

function validateActionID(request, response, next) {
    return (request, response, next) => {
        database.get(request.params.id)
            .then((action) => {
                if(action) {
                    request.action = action
                    next()
                } else {
                    response.status(404).json({
                        message: "Unable to find action with that ID."
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                response.status(500).json({
                    error: "Something went wrong. Please try again later."
                })
            })
    }
}

function validateAction(request, response, next) {
    return (request, response, next) => {
        if(!request.body.notes || !request.body.description || !request.body.project_id) {
            response.status(400).json({ message: "The request is missing required information."})
        } else {
            next()
        }
    }
}

module.exports = {validateActionID, validateAction}
