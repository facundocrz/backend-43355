import express from "express";

const router = express.Router();


//Products 
import getAllProducts from "./products/getAll.js";
import getProductById from "./products/getById.js";
import saveProduct from "./products/saveProduct.js";
import updateProduct from "./products/updateProduct.js";
import deleteProduct from "./products/deleteProduct.js";

router.get("/products", getAllProducts);
router.get("/products/:pid", getProductById);
router.post("/products", saveProduct);
router.put("/products/:pid", updateProduct);
router.delete("/products/:pid", deleteProduct);

// Carts
import saveCart from "./carts/saveCart.js";
import getProducts from "./carts/getProducts.js";
import addProductToCart from "./carts/addProductToCart.js";

router.post("/carts", saveCart);
router.get("/carts/:cid", getProducts);
router.post("/carts/:cid/product/:pid", addProductToCart);

export default router;