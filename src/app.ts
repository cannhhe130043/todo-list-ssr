import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
import { login, getUserByUsername, signup } from './users/user.service'
import { getTasksByUser, deleteTask, createTask } from './tasks/task.service'
import { User } from './users/user.type'
import session from 'express-session'
import { CreateTaskDto } from './tasks/create.task.dto'
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public/')))
app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 3600 * 24 * 1000 }
}))

app.get(['/', '/login'], (req: Request, res: Response) => {
    return res.render('login', { error: '' })
})

app.get('/logout', (req: Request, res: Response) => {
    req!.session!.destroy( () => {
        return res.redirect('login')
    })
})

app.get('/signup', (req: Request, res: Response) => {
    return res.render('signup', { error: '' })
})

app.get('/home', async (req: Request, res: Response) => {
    const userId = req!.session!.userId
    const tasks = await getTasksByUser(userId)
    return res.render('home', { tasks })
})

app.post('/signup', async (req: Request, res: Response) => {
    const userSingupDto: User = req.body
    const checkUser = await getUserByUsername(userSingupDto.username)
    if (checkUser) {
        return res.render('signup', { error: 'This username has already existed' })
    }
    const newUser = await signup(userSingupDto)
    req!.session!.username = newUser.username
    req!.session!.userId = newUser.id
    return res.redirect('/home')
})

app.post('/login', async (req: Request, res: Response) => {
    const userLoginDto: User = req.body
    const user = await login(userLoginDto)
    if (user) {
        req!.session!.username = user.username
        req!.session!.userId = user.id
        return res.redirect('/home')
    }
    return res.render('login', { error: 'Username or password is incorrect' })
})

app.get('/addTask', (req: Request, res: Response) => {
    return res.render('addTask', { error: '' })
})

app.post('/addTask',async (req: Request, res: Response) => {
    const createTaskDto: CreateTaskDto = { ...req.body, userId: req!.session!.userId }
    const newTask = await createTask(createTaskDto)
    if(!newTask){
        return res.render('addTask', { error: 'Create task fail' })
    }
    return res.redirect('/home')
})

app.get('/deleteTask/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id || '-1')
    await deleteTask(id)
    return res.redirect('/home')
})

const port: number = parseInt(process.env.PORT || '3000')

app.listen(port, () => console.log(`Server start on port ${port}`))