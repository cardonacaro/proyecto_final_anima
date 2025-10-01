const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

// Listar todos los pedidos
async function index(req, res) {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["id", "firstname", "lastname", "email"] },
        {
          model: Product,
          attributes: ["id", "name", "price"],
          through: { attributes: ["quantity"] },
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos", error });
  }
}

// Mostrar un pedido por id
async function show(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "firstname", "lastname", "email"] },
        {
          model: Product,
          attributes: ["id", "name", "price"],
          through: { attributes: ["quantity"] },
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedido", error });
  }
}

// Crear un pedido
async function store(req, res) {
  try {
    const { userId, products } = req.body;
    // products = [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }]

    const newOrder = await Order.create({ userId });

    if (products && products.length > 0) {
      for (const item of products) {
        await newOrder.addProduct(item.productId, { through: { quantity: item.quantity } });
      }
    }

    const orderWithDetails = await Order.findByPk(newOrder.id, {
      include: [
        { model: User, attributes: ["id", "firstname", "lastname", "email"] },
        {
          model: Product,
          attributes: ["id", "name", "price"],
          through: { attributes: ["quantity"] },
        },
      ],
    });

    res.status(201).json(orderWithDetails);
  } catch (error) {
    res.status(500).json({ message: "Error al crear pedido", error });
  }
}

// Actualizar estado del pedido (ejemplo: pendiente → enviado → entregado)
async function update(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body; // pendiente, enviado, entregado

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar pedido", error });
  }
}

// Eliminar un pedido
async function destroy(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    await order.destroy();
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar pedido", error });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
