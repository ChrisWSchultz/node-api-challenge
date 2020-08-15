const express = require('express')
const cors = require('cors')

const projectsRouter =  require('./routers/projects')
const actionsRouter = require('./routers/actions')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.use(projectsRouter)
app.use(actionsRouter)

app.listen(port, () => {console.log(`Server running at http://localhost:${port}`)})

