export default class TicketService{
    constructor(dao){
        this.dao = dao;
    }

    saveTicket(ticket){
        return this.dao.saveData(ticket);
    }


    getTicket(ticketId){
        return this.dao.getDataById(ticketId);
    }

    getAllTickets(){
        return this.dao.loadData();
    }

}