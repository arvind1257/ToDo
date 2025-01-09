import Express from "express"
import { PostMessage,GetMessage,UpdateMessage,DeleteMessage } from "../Controller/Message.js"

const   router = Express.Router()

router.get('/list',GetMessage)
router.post('/new',PostMessage)
router.patch('/update/:id',UpdateMessage)
router.delete('/delete/:id',DeleteMessage)

export default router