import { chatsDao as chatManager } from "../../dao/index.js";

export default async (req, res) => {

    const { user, message } = req.body;
    const newMessage = {
        user,
        message,
    };
    try {
        await chatManager.saveData(newMessage);
        res.status(200).json({ message: "Message added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}