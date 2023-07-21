import productModel from "../../models/products.js";

export default async (req, res) => {
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