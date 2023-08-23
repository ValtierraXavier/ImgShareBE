import { Router } from 'express'
import * as controller from '../Controller/userController.js'

const router = Router()

// router.get('/get',controller.getUsers)
router.get('/get/:id', controller.getUser)
router.post('/signup', controller.userSignUp)
router.post('/signin', controller.userSignIn)
// router.post('/create', controller.createUser)
router.put('/put/:id', controller.updateUser)
router.delete('/delete/:id', controller.deleteUser)

export default router