const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");

const dotenv = require("dotenv");

dotenv.config();

const autenticacion = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

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

      const newAdmin = await Admin.create({
        firstname,
        lastname,
        email,
        password,
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

      if (password !== admin.password) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error en login", error });
    }
  },
};

module.exports = adminController;
