import Express from "express"
import {AuthCheck} from "../Middleware/authCheck.js"
import { getUser, getUserAll, LoginProcess, LogoutProcess, SignupProcess } from "../Controller/User.js"

const   router = Express.Router()

router.post('/login',LoginProcess)
router.post('/signup',SignupProcess)
router.post('/logout',LogoutProcess)
router.get('/all',AuthCheck,getUserAll)
router.get('/:id',AuthCheck,getUser)
export default router