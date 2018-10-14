const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

router.get('/:email', (req, res) => {
    console.log("IN eamil");

    Todo.find({ email: req.params.email })
        .then(todos => {
            res.status(200).json({
                todos: todos
            })
        })
        .catch(error => {
            res.status(400).json({
                message: 'Error during fetching all todos from Database'
            })
        })
})
router.post('/', (req, res) => {
    const newTodo = new Todo({
        task: req.body.task,
        note: req.body.note,
        email: req.body.email
    })
    newTodo.save()
        .then(todo => {
            res.status(200).json({
                todo
            })
        }).catch(error => {
            res.json({
                message: 'Error during saving data into database'
            })
        })
})
router.get('/id/:_id', (req, res) => {
    console.log("Getting indtodo: ", req.params);

    Todo.findById({ _id: req.params._id })
        .then(todo => res.json({ todo }))
        .catch(error => res.json({ message: 'Error during fetching Individual Todo' }))
})
router.delete('/:_id', (req, res) => {
    Todo.findOneAndRemove({ _id: req.params._id })
        .then(() => res.json({
            message: 'Data is deleted'
        }))
        .catch(error => res.json({
            message: 'Error during deleting data from Database'
        }))
})
router.put("/:_id", (req, res) => {
    const { task, note } = req.body;
    console.log(task, note);

    Todo.findOneAndUpdate({ _id: req.params._id }, { $set: { task: task, note: note } })
        .then(todo => res.json({
            todo
        }))
        .catch(error => res.json({
            message: 'Error during updating database'
        }))
})
module.exports = router;