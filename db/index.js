import * as SQLite from "expo-sqlite";

// Open or create the cart database
const db = SQLite.openDatabase("cart.db");

// Initialize the database and create the `cart` table
export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        image TEXT
      );`,
      [],
      () => console.log("Table created successfully"),
      (_, error) => console.error("Error creating table:", error)
    );
  });
};

export default db;
