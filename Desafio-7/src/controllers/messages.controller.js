import {messageServices} from '../services/index.js';

const getAll = async (req, res) => {
    const chats = await messageServices.getAllMessages();
    res.json(chats);
}

const saveMessage = async (req, res) => {
    const { user, message } = req.body;
    const newMessage = {
        user,
        message,
    };
    try {
        await chatManager.saveMessage(newMessage);
        res.status(200).json({ message: "Message added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default {
    getAll,
    saveMessage,
}