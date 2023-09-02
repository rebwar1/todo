import React, { useState } from "react";

const TodoInput = () => {
  const [task, setTask] = useState("");

  const handleInputChange = e => {
    setTask(e.target.value);
  };

  //   const handleAddTodo = e => {
  //     e.preventDefault(); // Prevent the default form submission behavior
  //     if (task.trim() !== "") {
  //       addTodo(task);
  //       setTask("");
  //     }
  //   };

  const handleAddTodo = async e => {
    e.preventDefault();

    if (task.trim() !== "") {
      try {
        const response = await fetch("http://localhost:5001/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: task }), // Update the property name to "description"
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);
        setTask(""); // Clear the input field
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center bg-primary text-white">
              <h1>Todo List</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddTodo}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task"
                    value={task}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="submit" // Change the type to "submit"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
