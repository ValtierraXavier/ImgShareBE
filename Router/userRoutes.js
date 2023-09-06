import { Router } from 'express'
import * as controller from '../Controller/userController.js'

const router = Router()

router.get('/get',controller.getUsers)
router.get('/get/:id', controller.getUser)
router.post('/signup', controller.userSignUp)
router.post('/signin', controller.userSignIn)
router.put('/put/:id', controller.updateUser)
router.delete('/delete/:id', controller.deleteUser)
router.put('/user/:id', controller.insertComment)
router.put('/linkpost/:id', controller.linkPostToUser)
router.get('/userposts/:id', controller.getUserPosts)
router.put('/unlinkcomment/:id', controller.unlinkCommentFromUser)
router.put('/commentlike/:id',controller.handleCommentLike)
router.put('/postlike/:id',controller.handlePostLike)

export default router