import messages from "../Models/Message.js"
import user from "../Models/User.js"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mmarvind12@gmail.com",
        pass: "hzpk rclb rzzj alob",
    },
});


export const PostMessage = async (req, res) => {
    try {
        if (req.body.title != "" && req.body.note != "" && req.userData._id != "") {
            console.log({ ...req.body, user: req.userData._id })
            await messages.create({ ...req.body, user: req.userData._id });
            res.status(200).send({ status: 200, message: "Note Created Successfully" });
        }
        else {
            res.status(400).send({ status: 400, message: "Some fields are missing" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
}

export const GetMessage = async (req, res) => {
    try {
        const list = await messages.find({ user: req.userData._id }).sort({ createdDate: -1 })
        res.status(200).send(list)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: 500, message: "Internal Server Error" })
    }
}

export const GetUserMessage = async (req, res) => {
    try {
        const list = await messages.find({ user: req.params.id }).sort({ createdDate: -1 })
        res.status(200).send(list)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: 500, message: "Internal Server Error" })
    }
}

export const UpdateMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const status = await messages.updateOne({ _id: id, user: req.userData._id }, { ...req.body })
        if (status.modifiedCount > 0) {
            res.status(200).send({ status: 200, message: "Note Updated Successfully" });
        }
        else {
            res.status(400).send({ status: 400, message: "Invalid ID" });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: 500, message: "Internal Server Error" })
    }
}

export const UpdateTrackStatusMessage = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body);
        const admin = await user.findOne({ role: "admin" })
        const user1 = await user.findOne({ _id: req.body.user })
        const message1 = await messages.findOne({ _id: id })
        console.log(user1)
        console.log(admin)
        const info = await transporter.sendMail({
            from: 'mmarvind12@gmail.com', // sender address
            to: `${admin.email},${user1.email}`, // list of receivers
            subject: "Regarding Status Changes", // Subject line
            text: `Hi,\n\nThe task status of the task ${message1.title} (${user1.name} - ${user1.email}) is been changed to ${req.body.taskStatus} by the ${req.body.taskStatus == 'Re-work' ? 'admin' : 'user'}.\n\n It's an auto-generated mail, so don't reply to this mail.`, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
        const status = await messages.updateOne({ _id: id, user: req.body.user }, { ...req.body })
        if (status.modifiedCount > 0) {
            res.status(200).send({ status: 200, message: "Note Updated Successfully"});
        }
        else {
            res.status(400).send({ status: 400, message: "Invalid ID" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: 500, message: "Internal Server Error" })
    }
}

export const DeleteMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const status = await messages.deleteOne({ _id: id, user: req.userData._id });
        if (status.deletedCount > 0) {
            res.status(200).send({ status: 200, message: "Note Deleted Successfully" });
        }
        else {
            res.status(400).send({ status: 400, message: "Invalid ID" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: 500, message: "Internal Server Error" })
    }
}
