const User = require("../models/User");

async function index(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
}

async function store(req, res) {
  try {
    const { firstname, lastname, email, address, phone, password } = req.body;

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      address,
      phone,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, address, phone, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.update({
      firstname,
      lastname,
      email,
      address,
      phone,
      password,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
