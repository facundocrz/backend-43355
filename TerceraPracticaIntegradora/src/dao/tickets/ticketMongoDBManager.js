import MongoDBManager from "../manager/mongoDBManager.js";
import ticketModel from "../../models/ticket.model.js";

class TicketMongoDBManager extends MongoDBManager {
  constructor() {
    super(ticketModel);
  }

  async addTicket(ticket) {
    return await this.saveData(ticket);
  }
}

export default TicketMongoDBManager;
