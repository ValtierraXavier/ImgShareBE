import { Router } from 'express'
import postsRoutes from './postsRoutes.js'
import userRoutes from './userRoutes.js'
import commentsRoutes from './commentsRoutes.js'
import likesRoutes from './likesRoutes.js'

const router = Router()

router.get('/',(req,res)=>{
    res.send('API Root')
})

router.use('/posts', postsRoutes)
router.use('/comments', commentsRoutes)
router.use('/user', userRoutes)
router.use('/likes', likesRoutes)

export default router;