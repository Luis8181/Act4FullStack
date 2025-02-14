const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

//Rutas para los productos
router.get("/", productController.getAllProducts);    //Obtiene todos los productos
router.post("/", productController.createProduct);    //Crea un nuevo producto
router.delete("/:id", productController.deleteProduct); //Elimina un producto por ID
router.put("/:id", productController.updateProduct); //Actualiza un producto por ID

module.exports = router;