import productService from "./products.service.js";
import cartService from "./carts.service.js";
import MessageService from "./messages.service.js";
import { productsDao, cartsDao, chatsDao } from "../dao/index.js";

const productServices = new productService(productsDao);
const cartServices = new cartService(cartsDao);
const messageServices = new MessageService(chatsDao);

export default { productServices, cartServices, messageServices };
