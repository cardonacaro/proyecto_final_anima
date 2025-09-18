const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.index);
router.post("/", categoriesController.store);
router.get("/:id", categoriesController.show);
router.patch("/:id", categoriesController.update);
router.delete("/:id", categoriesController.destroy);

module.exports = router;
