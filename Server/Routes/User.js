import Express from "express"
import { getUser, LoginProcess, LogoutProcess, SignupProcess } from "../Controller/User.js"

const   router = Express.Router()

router.post('/login',LoginProcess)
router.post('/signup',SignupProcess)
router.post('/logout',LogoutProcess)
router.get('/all',getUser)
export default router