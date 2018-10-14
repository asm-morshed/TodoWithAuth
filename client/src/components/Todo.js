import React from 'react'
import { Link } from 'react-router-dom';

export default ({ todo, deleteTodo }) => {
    console.log("Card:", todo);

    return (
        <div className="card" style={{ width: '18rem', marginBottom: '10px' }}>
            <div className="card-body">
                <h5 className="card-title">{todo.task}</h5>
                <p className="card-text">{todo.note}</p>
                <Link to={`/todo/${todo._id}`} className="btn btn-primary" style={{ marginRight: '10px' }}>Edit</Link>

                <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>Delete </button>
            </div>
        </div>
    )
}
