import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import expensesRoutes from './controllers/expensesController'
import loginRoutes from './controllers/loginController'
import { auth } from './middlewares/auth'

class Server {
    public app: express.Application
    public dotenv: dotenv.DotenvConfigOutput

    constructor() {
        this.app = express()
        this.dotenv = dotenv.config()
        this.config()
        this.routes()
    }


    config(): void {
        // middlewares
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        //Mongo connection
        const mongoUrl = "yourURL"
        mongoose.connect(process.env.MONGO || mongoUrl)
            .then(() => console.log("Mongo in ON"))
            .catch((err) => console.log(`Error while connecting to mongo ${err.message}`))
    }

    public routes(): void {
        const router: express.Router = express.Router()

        this.app.use('/expenses', auth, expensesRoutes)
        this.app.use('/', loginRoutes)
    }

    start(): void {
        this.app.listen(process.env.PORT || 3100, () => {
            console.log('Server Started')
        })
    }

}

const server = new Server()
server.start()