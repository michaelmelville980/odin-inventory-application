const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const inventoryController = require("../controllers/inventoryController");

// Creating Router
const inventoryRouter = Router();

// Validation & Sanitization
const validateItem = [
  body("item")
    .trim()
    .notEmpty()
    .withMessage("Item name is required")
    .isLength({ max: 75 })
    .withMessage("Item name must be at most 75 characters"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Electronics", "Gaming", "Office", "Accessories"])
    .withMessage("Invalid category selected"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isInt({ min: 0 })
    .withMessage("Price must be a non-negative integer")
    .toInt(),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer")
    .toInt(),
];

// Routes
inventoryRouter.get("/", inventoryController.renderMain);

inventoryRouter.get("/create", inventoryController.renderItemForm);
inventoryRouter.post("/create", inventoryController.addItem);

inventoryRouter.get("/edit/:id", inventoryController.renderEditForm);
inventoryRouter.post("/edit/:id", inventoryController.editItem);

inventoryRouter.post("/delete/:id", inventoryController.deleteItem);

module.exports = inventoryRouter;
