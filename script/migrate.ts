import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const schema = `
  CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE \`${MYSQL_DB_NAME}\`;

    CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    pseudo VARCHAR(100) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    categorie VARCHAR (100),
    description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS histories (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    categories_id INT NOT NULL,
    first_step_id INT,
    FOREIGN KEY (categories_id) REFERENCES categories(id)
  );

    CREATE TABLE IF NOT EXISTS steps (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    histories_id INT NOT NULL,
    background TEXT NOT NULL,
    FOREIGN KEY (histories_id) REFERENCES histories(id)
  );

 CREATE TABLE IF NOT EXISTS choices (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    steps_id INT NOT NULL,
    link_to_step_id INT NOT NULL,
    FOREIGN KEY (steps_id) REFERENCES steps(id),
    FOREIGN KEY (link_to_step_id) REFERENCES steps(id)
    );

  CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    histories_id INT NOT NULL,
    steps_id INT NOT NULL,
    users_id INT NOT NULL,
    FOREIGN KEY (histories_id) REFERENCES histories(id),
    FOREIGN KEY (steps_id) REFERENCES steps(id),
    FOREIGN KEY (users_id) REFERENCES users(id),
    UNIQUE KEY unique_user_histories (users_id, histories_id)
  );
  `;

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    });

    await connection.query(schema);
    await connection.end();

    console.log("✅ Database seed upload successfully");
  } catch (err) {
    console.error("❌ Error during migration:", err);
  }
};

migrate();
