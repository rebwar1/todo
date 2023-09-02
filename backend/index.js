import express from "express";
import cors from "cors";
import mysql from "mysql2"; // Import mysql2 library

const app = express(); // create an express app

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "todotest",
  password: "123",
  database: "todo_mysql",
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL");
});

// middleware
app.use(cors());
app.use(express.json());

// routes
//post a todo
// ! ignore
/** app.post("/todos", (req, res) => {
  const { description } = req.body;
  const newTodo = db.query(
    "INSERT INTO todo (description) VALUES (?)",
    [description],
    (err, result) => {
      if (err) {
        console.error(err.message);
      } else {
        res.json({ message: "Todo was added", newTodo });
      }
    }
  );
});
*/
// ! ignore

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    // Use db.promise() to create a promise-based connection
    const [result] = await db
      .promise()
      .execute("INSERT INTO todo (description) VALUES (?)", [description]);

    const newTodo = {
      description,
      // Assuming you have an auto-incremented ID column, you can retrieve the last inserted ID
      id: result.insertId,
    };

    res.status(201).json({ message: "Todo was added", newTodo });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get all todos
// ! ignore
// app.get("/todos", (req, res) => {
//   const todos = db.query("SELECT * FROM todo", (err, result) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       res.json(result);
//     }
//   });
// });
// ! ignore

app.get("/todos", async (req, res) => {
  try {
    // Use db.promise() to create a promise-based connection
    const [rows] = await db.promise().execute("SELECT * FROM todo");

    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(5001, () => console.log("Server running on port 5001"));
