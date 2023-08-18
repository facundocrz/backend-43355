let productsDao
let cartsDao
let chatsDao

import config from '../config/dotenv.config.js'

switch (config.pers) {
    case 'json':
        const {default: ProductFileSystemManager} = await import('./products/productFileSystemManager.js')
        const {default: CartFileSystemManager} = await import('./carts/cartFileSystemManager.js')
        const {default: ChatFileSystemManager} = await import('./messages/chatFileSystemManager.js')
        productsDao = new ProductFileSystemManager()
        cartsDao = new CartFileSystemManager()
        chatsDao = new ChatFileSystemManager()
        break;
    case 'mongoDB':
        const {default: ProductMongoDBManager} = await import('./products/productMongoDBManager.js')
        const {default: CartMongoDBManager} = await import('./carts/cartMongoDBManager.js')
        const {default: ChatMongoDBManager} = await import('./messages/chatMongoDBManager.js')
        productsDao = new ProductMongoDBManager()
        cartsDao = new CartMongoDBManager()
        chatsDao = new ChatMongoDBManager()
        break;
}

export {productsDao, cartsDao, chatsDao}