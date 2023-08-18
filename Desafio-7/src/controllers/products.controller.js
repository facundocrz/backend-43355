import {productServices} from '../services/index.js';
import {productModel} from '../models/products.model.js';
import { io } from "../app.js";

const getAll = async (req, res) => {
    const { limit = 10, page = 1, sort = "asc" , query } = req.query;
  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort === 'asc' || sort === 'desc' ? { price: sort } : null,
  };
  
  const queryOptions = query ? { category: query } : {};

  try {
    const products = await productModel.paginate(queryOptions, options);
    const totalPages = products.totalPages;
    const prevPage = products.prevPage || null;
    const nextPage = products.nextPage || null;
    const currentPage = products.page || 1;
    const hasPrevPage = products.hasPrevPage;
    const hasNextPage = products.hasNextPage;
    const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${prevPage}&sort=${sort}` : null;
    const nextLink = hasNextPage ? `/products?limit=${limit}&page=${nextPage}&sort=${sort}` : null;
    if (prevLink && query) prevLink += `&query=${query}`;
    if (nextLink && query) nextLink += `&query=${query}`;

    res.status(200).json({
      status: 'success',
      payload: products.docs,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: `Error loading data from mongoDB: ${error}` });
  }
};

const getById = async (req, res) => {
    try {
        const product = await productServices.getProduct(req.params.pid);
        product
          ? res.status(200).json(product)
          : res.status(404).json({ error: "Product not found" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

const saveProduct = async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const newProduct = {
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || [],
  };
  try {
    const addedProduct = await productServices.saveProduct(newProduct);
    io.emit("add Product", addedProduct);
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(400).json({ error: `Failed to add product: ${error.message}` });
  }
};

const updateProduct = async (req, res) => {
    const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    await productServices.updateProduct(productId, updatedProduct);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to update product: ${error.message}` });
  }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.pid;
  try {
    await productServices.deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to delete product: ${error.message}` });
  }
};

export default {
    getAll,
    getById,
    saveProduct,
    updateProduct,
    deleteProduct
}