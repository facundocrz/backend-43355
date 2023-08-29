import FileSystemManager from "../manager/fileSystemManager.js";

class ChatFileSystemManager extends FileSystemManager {
  constructor() {
    super("chat.json");
  }
}

export default ChatFileSystemManager;
