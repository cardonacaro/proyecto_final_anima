const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

module.exports = router;
s;
// controllers/productController.js
const Product = require("../models/product");

// GET - listar todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); // si usás Sequelize
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// GET - obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id); // Sequelize
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

// POST - crear producto
const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    const newProduct = await Product.create({ name, price, stock, description });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// PUT - actualizar producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.update({ name, price, stock, description });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// DELETE - eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.destroy();
    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
