import Express from "express"
import { PostMessage,GetMessage,GetUserMessage,UpdateMessage,UpdateTrackStatusMessage,DeleteMessage } from "../Controller/Message.js"
import { AuthCheck } from "../Middleware/authCheck.js"

const   router = Express.Router()

router.get('/list',AuthCheck,GetMessage)
router.get('/:id',AuthCheck,GetUserMessage)
router.post('/new',AuthCheck,PostMessage)
router.patch('/update/:id',AuthCheck,UpdateMessage)
router.patch('/updateStatus/:id',AuthCheck,UpdateTrackStatusMessage)
router.delete('/delete/:id',AuthCheck,DeleteMessage)

export default router