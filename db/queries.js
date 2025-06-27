const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM inventory ORDER BY id ASC;");
  return rows;
}

async function insertItem(item, category, price, quantity) {
  await pool.query(
    `INSERT INTO inventory (item, category, price, quantity)
   VALUES ($1, $2, $3, $4)`,
    [item, category, price, quantity]
  );
}

async function getRow(id) {
  const { rows } = await pool.query(
    "SELECT * FROM inventory WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function editItem(id, item, category, price, quantity) {
   await pool.query(
    `
    UPDATE inventory
    SET item     = $1,
        category = $2,
        price    = $3,
        quantity = $4
    WHERE id = $5
    `,
    [item, category, price, quantity, id]
  );
}

async function deleteRow(id) {
  const { row } = await pool.query(
    "DELETE FROM inventory WHERE id = $1",
    [id]
  );
}

module.exports = {
  getAllItems,
  insertItem,
  getRow,
  editItem,
  deleteRow,
};
