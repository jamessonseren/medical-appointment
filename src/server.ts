import express from 'express'
import { userRouter } from './routes/user.routes'
import { specialtyRouter } from './routes/specialty.routes'

const app = express()

app.use(express.json())

app.use(userRouter)
app.use(specialtyRouter)

app.listen(3334, () => console.log('Server is running on PORT 3333'))

app.get('/', (request, response) =>{
    return response.send("Application running successfully")
})