// import React, { Component } from 'react'
// import Todo from './Todo'
// import { Link } from 'react-router-dom';

// class TodoList extends Component {


//     addItem = e => {
//         e.preventDefault()
//         console.log('Hello World')
//     }

//     render() {
//         console.log("This is from todoList-----", this.props);

//         const emptyList = (
//             <p>You don't have any todo</p>
//         )
//         const todoList = (
//             <div className="card-group">
//                 {}
//             </div>
//         )
//         return (
//             <div className="container">
//                 {todoList}
//                 <Link className="nav-link" to="/createtodo" addItem={this.addItem}>Create Todo</Link>
//             </div>
//         )
//     }
// }
// export default TodoList
import React from 'react'
import Todo from './Todo';
import { Link } from 'react-router-dom';

const TodoList = ({ todos, deleteTodo }) => {
    console.log("List:", todos);
    const emptyList = (
        <p>You don't have any task.... Please create some task</p>
    )
    const todoList = (
        <div className="container">
            {todos.map(todo => <Todo todo={todo} key={todo._id} deleteTodo={deleteTodo} />)}
        </div>
    )
    return (
        <div>

            <Link className="nav-link" to="/createtodo">New Task</Link>
            {todos.length === 0 ? emptyList : todoList}
        </div>
    )
}
export default TodoList;