import mongoose from 'mongoose'
import chalk from 'chalk'
import 'dotenv/config'



const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/imgShareDB'

mongoose.connect(url, connectionConfig)

mongoose.connection.on('connected', () => console.log(chalk.green('Successfully Connected!')))
mongoose.connection.on('disconnected', () => console.log(chalk.grey('Sucessfully Disconnected!')))
mongoose.connection.on('error', (error) => console.log(chalk.red("Error:", error)))

export default mongoose.connection;