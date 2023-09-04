import { Router } from 'express'
import * as controller from '../Controller/postsController.js'

const router = Router()

router.get('/get',controller.getPosts)
router.get('/get/:id', controller.getPost)
router.post('/post', controller.postPost)
router.put('/put/:id', controller.putPost)
router.delete('/delete/:id', controller.deletePost)
router.put('/comment/put/:id', controller.linkComment)
router.get('/postwcomments/:id', controller.postWithComments)
router.get('/userposts/:id', controller.userPosts)
router.put('/unlinkcomment/:id',controller.unlinkCommentFromPost)
router.put('/postlike/:id',controller.handlePostLike)


export default router