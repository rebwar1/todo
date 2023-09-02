import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "todotest", // Make sure this matches the username you created in MySQL
  password: "123", // Make sure this matches the password you set for the user
  database: "todo_mysql",
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

export default db;
