const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = mongoose.Schema({
    task: { type: String, required: true },
    note: { type: String, required: true },
    email: { type: String, required: true },
});

const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;