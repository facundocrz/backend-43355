import { productsDao as productManager} from "../../dao/index.js";

export default async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = await productManager.loadData();
  res.status(200).json(limit ? products.slice(0, limit) : products);
};