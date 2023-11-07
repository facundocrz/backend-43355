import ProductService from "./products.service.js";
import CartService from "./carts.service.js";
import MessageService from "./messages.service.js";
import TicketService from "./tickets.service.js";
import { productsDao, cartsDao, chatsDao, ticketsDao } from "../dao/factory.js";


const productServices = new ProductService(productsDao);
const cartServices = new CartService(cartsDao);
const messageServices = new MessageService(chatsDao);
const ticketServices = new TicketService(ticketsDao);

export { productServices, cartServices, messageServices, ticketServices };
