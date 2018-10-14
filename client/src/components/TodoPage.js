import React, { Component } from 'react'
import { fetchTodos, deleteTodo } from '../actions/todoAction';
import { connect } from 'react-redux';

import TodoList from './TodoList';

class TodoPage extends Component {
    componentWillMount() {
        this.props.fetchTodos();
    }
    render() {
        console.log("TodoPage", this.props.todos);

        return (
            <div className="container">
                <div className="row">
                    <TodoList todos={this.props.todos} deleteTodo={this.props.deleteTodo} />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        todos: state.todos
    }
}
export default connect(mapStateToProps, { fetchTodos, deleteTodo })(TodoPage);