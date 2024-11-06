import * as SQLite from "expo-sqlite";

let db;

export async function initializeDatabase() {
  try {
    // Open database within an async function
    db = await SQLite.openDatabaseAsync("databaseName");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productId INTEGER UNIQUE,
        name TEXT,
        quantity INTEGER,
        price REAL,
        category TEXT,
        image TEXT
      );
    `);

    // await db.execAsync(`DELETE FROM cart;`);
    // console.log("Database connected successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

export async function addToCart(
  productId,
  name,
  quantity,
  price,
  category,
  image
) {
  await db.runAsync(
    `INSERT OR REPLACE INTO cart (productId, name, quantity, price, category, image) VALUES (?, ?, ?, ?, ?, ?);`,
    [productId, name, quantity, price, category, image]
  );
}

export async function getCartItems() {
  const result = await db.getAllAsync("SELECT * FROM cart");
  return result;
}

export async function updateCartItem(productId, quantity) {
  await db.runAsync(`UPDATE cart SET quantity = ? WHERE productId = ?;`, [
    quantity,
    productId,
  ]);
}

export async function removeFromCart(productId) {
  await db.runAsync(`DELETE FROM cart WHERE productId = ?;`, [productId]);
}
export async function clearCart() {
  await db.runAsync(`DELETE FROM cart;`);
  console.log("All data from the cart table has been deleted.");
}
