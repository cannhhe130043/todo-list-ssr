import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
import { login, getUserByUsername, signup } from './users/user.service'
import { getTasksByUser } from './tasks/task.service'
import { User } from './users/user.type'
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public/')))
app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.get(['/', '/login'], (req: Request, res: Response) => {
    res.render('login', { error: '' })
})

app.get('/signup', (req: Request, res: Response) => {
    res.render('signup', { error: '' })
})

app.post('/signup',async ({ body }: Request, res: Response) => {
    const userSingupDto: User = body
    const checkUser = await getUserByUsername(userSingupDto.username)
    if(checkUser){
        return res.render('signup', { error: 'This username has already existed' })
    }
    const newUser = await signup(userSingupDto)
    const tasks = await getTasksByUser(userSingupDto.username)
    return res.render('home', { tasks })
})

app.post('/login', async ({ body }: Request, res: Response) => {
    const userLoginDto: User = body
    const isValidUser = await login(userLoginDto)
    if(isValidUser){
        const tasks = await getTasksByUser(userLoginDto.username)
        return res.render('home', { tasks })
    }
    return res.render('login', { error: 'Username or password is incorrect' })
})

const port: number = parseInt(process.env.PORT || '3000')

app.listen(port, () => console.log(`Server start on port ${port}`))