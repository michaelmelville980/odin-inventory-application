const { validationResult } = require("express-validator");
const db = require("../db/queries");

async function renderMain(req, res) {
  const rows = await db.getAllItems();
  res.render("main", { items: rows });
}

async function renderItemForm(req, res) {
  res.render("form", {
    errors: [],
    item: "",
    category: "",
    price: 0,
    quantity: 0,
  });
}

async function addItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //If data invalid, rerenders form (displaying error msg and prev inputs)
    return res.status(400).render("form", {
      errors: errors.array(),
      item: req.body.item,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });
  }

  // If valid data, inserts item into database
  await db.insertItem(
    req.body.item,
    req.body.category,
    req.body.price,
    req.body.quantity
  );

  // Redirects to homepage
  res.redirect("/");
}

async function renderEditForm(req, res) {
  const id = req.params.id;
  const row = await db.getRow(id);

  if (!row) {
    return res.status(404).send("Item not found");
  }

  res.render("formEdit", {
    id: id,
    errors: [],
    item: row.item,
    category: row.category,
    price: row.price,
    quantity: row.quantity,
  });
}

async function editItem(req, res) {
  const id = req.params.id;
  await db.editItem(
    id,
    req.body.item,
    req.body.category,
    req.body.price,
    req.body.quantity
  );
  res.redirect("/");
}

async function deleteItem(req, res) {
  const id = req.params.id;
  await db.deleteRow(id);
  res.redirect("/");
}

module.exports = {
  renderMain,
  renderItemForm,
  addItem,
  renderEditForm,
  editItem,
  deleteItem,
};
