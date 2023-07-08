import { chatsDao as chatManager } from "../../dao/index.js";

export default async (req, res) => {
    const chats = await chatManager.loadData();
    res.json(chats);
}