import { Router } from 'express'
import postsRoutes from './postsRoutes.js'
import userRoutes from './userRoutes.js'
import commentsRoutes from './commentsRoutes.js'

const router = Router()

router.get('/',(req,res)=>{
    res.send('API Root')
})

router.use('/posts', postsRoutes)
router.use('/comments', commentsRoutes)
router.use('/user', userRoutes)

export default router;