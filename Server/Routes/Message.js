import Express from "express"
import { PostMessage,GetMessage,UpdateMessage,DeleteMessage } from "../Controller/Message"

const   router = Express.Router()

router.get('/list',GetMessage)
router.post('/new',PostMessage)
router.patch('/update/:id',UpdateMessage)
router.patch('/delete',DeleteMessage)

export default router