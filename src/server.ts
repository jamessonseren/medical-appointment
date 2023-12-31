import express from 'express'
import { userRouter } from './routes/user.routes'

const app = express()

app.use(express.json())

app.use(userRouter)

app.listen(3333, () => console.log('Server is running on PORT 3333'))

app.get('/', (request, response) =>{
    return response.send("Application running successfully")
})