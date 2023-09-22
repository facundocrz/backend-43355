let productsDao
let cartsDao
let chatsDao
let ticketsDao

import dotenv from '../config/dotenv.config.js'

switch (dotenv.pers) {
    case 'json':
        const {default: ProductFileSystemManager} = await import('./products/productFileSystemManager.js')
        const {default: CartFileSystemManager} = await import('./carts/cartFileSystemManager.js')
        const {default: ChatFileSystemManager} = await import('./messages/chatFileSystemManager.js')
        const {default: TicketFileSystemManager} = await import('./tickets/ticketFileSystemManager.js')
        productsDao = new ProductFileSystemManager()
        cartsDao = new CartFileSystemManager(productsDao)
        chatsDao = new ChatFileSystemManager()
        ticketsDao = new TicketFileSystemManager()
        break;
    case 'mongoDB':
        const {default: ProductMongoDBManager} = await import('./products/productMongoDBManager.js')
        const {default: CartMongoDBManager} = await import('./carts/cartMongoDBManager.js')
        const {default: ChatMongoDBManager} = await import('./messages/chatMongoDBManager.js')
        const {default: TicketMongoDBManager} = await import('./tickets/ticketMongoDBManager.js')
        productsDao = new ProductMongoDBManager()
        cartsDao = new CartMongoDBManager(productsDao)
        chatsDao = new ChatMongoDBManager()
        ticketsDao = new TicketMongoDBManager()
        break;
}

export {productsDao, cartsDao, chatsDao, ticketsDao}