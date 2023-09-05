export default class MessageService {
    constructor(dao) {
        this.dao = dao;
    }

    getAllMessages(){
        return this.dao.loadData();
    }

    saveMessage(message){
        return this.dao.saveData(message);
    }
}