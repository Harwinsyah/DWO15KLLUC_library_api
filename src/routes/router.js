const express = require("express");

const router = express.Router();

const {
  register,
  login,
  index: indexUser,
  delete: deleteUser,
  view: viewUser,
} = require("../controllers/user");

const {
  index: indexCategory,
  view: viewCategory,
  create: createCategory,
  edit: editCategory,
  delete: deleteCategory,
} = require("../controllers/category");

const { index: indexBook } = require("../controllers/book");

router.post("/register", register);
router.post("/login", login);

router.get("/users", indexUser);
router.get("/user/:id", viewUser);
router.delete("/user/:id", deleteUser);

router.get("/categories", indexCategory);
router.get("/category/:id", viewCategory);
router.post("/category", createCategory);
router.post("/category/:id", editCategory);
router.delete("/category/:id", deleteCategory);

router.get("/books", indexBook);

module.exports = router;
