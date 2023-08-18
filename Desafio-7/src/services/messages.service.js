export default class messageService {
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