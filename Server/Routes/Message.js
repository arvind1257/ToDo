import Express from "express"
import { PostMessage,GetMessage,UpdateMessage,DeleteMessage } from "../Controller/Message.js"
import { AuthCheck } from "../Middleware/authCheck.js"

const   router = Express.Router()

router.get('/list',AuthCheck,GetMessage)
router.post('/new',AuthCheck,PostMessage)
router.patch('/update/:id',AuthCheck,UpdateMessage)
router.delete('/delete/:id',AuthCheck,DeleteMessage)

export default router