import MongoDBManager from "../manager/mongoDBManager.js";
import chatModel from "../../models/messages.js";

class ChatMongoDBManager extends MongoDBManager {
  constructor() {
    super(chatModel);
  }
}

export default ChatMongoDBManager;