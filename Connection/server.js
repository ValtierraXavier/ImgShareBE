import connection from './connection.js'
import express from 'express'
import cors from 'cors'
import routes from '../Router/index.js'
import chalk from 'chalk'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3020
app.use(express.json({limit: '15mb'}))
app.use(cors())
app.use('/', routes)

connection.on('connected', () =>{
    console.clear()
    console.log(chalk.green.bold('Server Active'))
    app.listen(port, () => console.log(chalk.green.bold(`Express Server Listening on Port: ${chalk.yellowBright(port)}`)))
})