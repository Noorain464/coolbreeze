import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find();
  // console.log("getting products");
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  // console.log("creating product");
  console.log(req.body);
  await product.save();
  res.status(201).json(product);
};