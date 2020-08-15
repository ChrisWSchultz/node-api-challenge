const express = require('express')
const cors = require('cors')

const projectsRouter =  require('./routers/projects')
const actionsRouter = require('./routers/actions')

const app = express()

app.use(express.json())
app.use(cors())

app.use(projectsRouter)
app.use(actionsRouter)

app.listen(process.env.PORT || 8080)

