const Categories = require("../models/Categories");

const categoriesController = {
  async index(req, res) {
    try {
      const categories = await Categories.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo categorías", error });
    }
  },

  async store(req, res) {
    try {
      const { category } = req.body;
      const newCategory = await Categories.create({ category });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: "Error creando categoría", error });
    }
  },

  async show(req, res) {
    try {
      const category = await Categories.findByPk(req.params.id);
      if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo categoría", error });
    }
  },

  async update(req, res) {
    try {
      const category = await Categories.findByPk(req.params.id);
      if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
      await category.update(req.body);
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error actualizando categoría", error });
    }
  },

  async destroy(req, res) {
    try {
      const category = await Categories.findByPk(req.params.id);
      if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
      await category.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error eliminando categoría", error });
    }
  },
};

module.exports = categoriesController;
