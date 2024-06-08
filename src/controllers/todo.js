import ToDo from "../models/todo.js";

const createTodo = async (req, res) => {
  try {
    const { title, task } = req.body;

    // Assuming Task is your Mongoose model for todo items
    const newTodo = { title, task };

    // Assuming ToDo is your Mongoose model for the todo list
    const newTask = await ToDo.create(newTodo);

    res.status(200).send(newTask);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    // Assuming ToDo is your Mongoose model for the todo list
    const allTask = await ToDo.find();

    res.status(200).send(allTask);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};

export { createTodo, getAllTodo };
