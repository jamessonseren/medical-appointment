import express from 'express'
import { userRouter } from './routes/user.routes'
import { specialtyRouter } from './routes/specialty.routes'

import swaggerUI from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'
import { doctorRouter } from './routes/doctor.routes'

const app = express()

app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(userRouter)
app.use(specialtyRouter)
app.use(doctorRouter)

app.listen(3334, () => console.log('Server is running on PORT 3333'))

app.get('/', (request, response) =>{
    return response.send("Application running successfully")
})