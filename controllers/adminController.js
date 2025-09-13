const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminController = {
  async index(req, res) {
    try {
      const admins = await Admin.findAll();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo administradores", error });
    }
  },

  async store(req, res) {
    try {
      const { firstname, lastname, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await Admin.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ message: "Error creando administrador", error });
    }
  },

  async show(req, res) {
    try {
      const admin = await Admin.findByPk(req.params.id);
      if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo administrador", error });
    }
  },

  async update(req, res) {
    try {
      const admin = await Admin.findByPk(req.params.id);
      if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });

      const { password } = req.body;
      if (password) req.body.password = await bcrypt.hash(password, 10);

      await admin.update(req.body);
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: "Error actualizando administrador", error });
    }
  },

  async destroy(req, res) {
    try {
      const admin = await Admin.findByPk(req.params.id);
      if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });

      await admin.destroy();
      res.json({ message: "Administrador eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error eliminando administrador", error });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) return res.status(401).json({ message: "Credenciales inválidas" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(401).json({ message: "Credenciales inválidas" });

      const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error en login", error });
    }
  },
};

module.exports = adminController;
