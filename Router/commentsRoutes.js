import { Router } from 'express'
import * as controller from '../Controller/commentsController.js'

const router = Router()

router.get('/get',controller.getComments)
router.get('/get/:id', controller.getComment)
router.post('/post', controller.postComment)
router.put('/put/:id', controller.putComment)
router.delete('/delete/:id', controller.deleteComment)

export default router