import { productServices } from "../services/index.js";
import productModel from "../models/products.model.js";
import { io } from "../app.js";
import CustomErrors from "../utils/errors/custom.errors.js";
import {generateProductErrorInfo} from "../utils/errors/info.errors.js";
import enumErrors from "../utils/errors/enum.errors.js";

const getAll = async (req, res) => {
  const { limit = 10, page = 1, sort = "asc", query } = req.query;
  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort === "asc" || sort === "desc" ? { price: sort } : null,
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
    const prevLink = hasPrevPage
      ? `/products?limit=${limit}&page=${prevPage}&sort=${sort}`
      : null;
    const nextLink = hasNextPage
      ? `/products?limit=${limit}&page=${nextPage}&sort=${sort}`
      : null;
    if (prevLink && query) prevLink += `&query=${query}`;
    if (nextLink && query) nextLink += `&query=${query}`;

    res.status(200).json({
      status: "success",
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
    req.logger.fatal(error.message);
    res.status(500).json({
      status: "error",
      message: `Error loading data from mongoDB: ${error}`,
    });
  }
};

const getById = async (req, res) => {
  try {
    const product = await productServices.getProduct(req.params.pid);
    product
      ? res.status(200).json(product)
      : CustomErrors.createError({
          name: "Product not found",
          cause: `Product with id ${req.params.pid} not found`,
          message: "Error trying to get product",
          code: enumErrors.NOT_FOUND,
        });
  } catch (error) {
    req.logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

const saveProduct = async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    CustomErrors.createError({
      name: "Product creation error",
      cause: generateProductErrorInfo({
        title,
        description,
        code,
        price,
        stock,
        category,
      }),
      message: "Error trying to create product",
      code: enumErrors.INVALID_TYPE_ERROR,
    });
  }

  const newProduct = {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  };

  try {
    const addedProduct = await productServices.saveProduct(newProduct);
    io.emit("add Product", addedProduct);
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    req.logger.error(error.message);
    res.status(400).json({ error: `Failed to add product: ${error.message}` });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    productServices.updateProduct(productId, updatedProduct);
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
    const product = await productServices.getProduct(productId);
    if (req.user.role === "admin" || req.user.email === product.owner) {
      productServices.deleteProduct(productId);
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    req.logger.error(error.message)
    res
      .status(400)
      .json({ error: `Failed to delete product: ${error.message}` });
  }
};

export { getAll, getById, saveProduct, updateProduct, deleteProduct };
