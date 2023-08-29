import {Router} from 'express'
import * as controller from '../Controller/likesController.js'

const router = Router()

router.get('/get',controller.getLikes)
router.get('/get/:id', controller.getLike)
router.post('/post', controller.postLike)
router.put('/put/:id', controller.putLike)
router.delete('/delete/:id', controller.deleteLike)
router.put('/linkcomment', controller.linkComment)
// router.put('/linkpost', controller.linkPost)


export default router