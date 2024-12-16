// routes/todoRoutes.js
const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// GET all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST a new todo
router.post("/", async (req, res) => {
    const { text } = req.body;
    const newTodo = new Todo({
        text,
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo)
            return res.status(404).json({ message: "Todo not found" });

        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
