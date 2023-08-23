import connection from './connection.js'
import express from 'express'
import cors from 'cors'
import routes from '../Router/index.js'
import chalk from 'chalk'

const app = express()
const port = 3020
app.use(express.json())
app.use(cors())
app.use('/', routes)

connection.on('connected', () =>{
    console.clear()
    console.log(chalk.green.bold('Server Active'))
    app.listen(port, () => console.log(chalk.green.bold(`Express Server Listening on Port: ${chalk.yellowBright(port)}`)))
})