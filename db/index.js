import * as SQLite from "expo-sqlite";

let db;

export async function initializeDatabase() {
  try {
    // Open database within an async function
    db = await SQLite.openDatabaseAsync("databaseName");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER UNIQUE,
        name TEXT,
        quantity INTEGER,
        price REAL,
        image TEXT
      );
    `);

    // await db.execAsync(`DELETE FROM cart;`);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

export async function addToCart(product_id, name, quantity, price, image) {
  await db.runAsync(
    `INSERT OR REPLACE INTO cart (product_id, name, quantity, price, image) VALUES (?, ?, ?, ?, ?);`,
    [product_id, name, quantity, price, image]
  );
  console.log(`added ${name} to cart`);
}

export async function getCartItems() {
  const result = await db.getAllAsync("SELECT * FROM cart");
  return result;
}

export async function updateCartItem(product_id, quantity) {
  await db.runAsync(`UPDATE cart SET quantity = ? WHERE product_id = ?;`, [
    quantity,
    product_id,
  ]);
  console.log("quantity updated");
}

export async function removeFromCart(product_id) {
  await db.runAsync(`DELETE FROM cart WHERE product_id = ?;`, [product_id]);
}
export async function clearCart() {
  await db.runAsync(`DELETE FROM cart;`);
  console.log("All data from the cart table has been deleted.");
}
