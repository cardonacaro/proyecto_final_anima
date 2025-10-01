const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { expressjwt: expressJwt } = require("express-jwt");

const autenticacion = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

router.get("/", autenticacion, adminController.index);
router.post("/", adminController.store);
router.get("/:id", autenticacion, adminController.show);
router.patch("/:id", autenticacion, adminController.update);
router.delete("/:id", autenticacion, adminController.destroy);

router.post("/login", adminController.login);

module.exports = router;
