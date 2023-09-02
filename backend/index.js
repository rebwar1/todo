import express from "express";
import cors from "cors";
import mysql from "mysql2"; // Import mysql2 library

const app = express(); // create an express app

app.use(cors()); // enable Cross Origin Resource Sharing
app.use(express.json()); // enable req.body JSON data

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

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // without destructuring: const id = req.params.id;

    // Use db.promise() to create a promise-based connection
    const [rows] = await db
      .promise()
      .execute("SELECT * FROM todo WHERE id = ?", [id]); //WHERE id means the id column in the table

    if (rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // Use db.promise() to create a promise-based connection

    const [result] = await db
      .promise()
      .execute("UPDATE todo SET description = ? WHERE id = ?", [
        description,
        id,
      ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo was updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Use db.promise() to create a promise-based connection
    const [result] = await db
      .promise()
      .execute("DELETE FROM todo WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo was deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5001, () => console.log("Server running on port 5001"));
