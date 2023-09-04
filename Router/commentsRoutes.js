import { Router } from 'express'
import * as controller from '../Controller/commentsController.js'

const router = Router()

router.get('/get',controller.getComments)
router.get('/get/:id', controller.getComment)
router.post('/post', controller.postComment)
router.put('/update/:id', controller.updateComment)
router.delete('/delete/:id', controller.deleteComment)
router.put('/commentlike/:id', controller.handleCommentLike)

export default router