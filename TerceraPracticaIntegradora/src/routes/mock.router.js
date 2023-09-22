import express from "express";

const router = express.Router();


import { generateProduct } from "../utils/faker.js";


router.get("/mockingproducts", (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }
  res.status(200).json(products);
});

export default router