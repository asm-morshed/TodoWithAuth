import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTodo, fetchTodo, updateTodo } from '../actions/todoAction';

class CreateTodo extends Component {
    state = {

        _id: this.props.todo ? this.props.todo._id : null,
        task: this.props.todo ? this.props.todo.task : '',
        note: this.props.todo ? this.props.todo.note : '',
        done: false

    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps: ", nextProps);
        this.setState({
            _id: nextProps.todo._id,
            task: nextProps.todo.task,
            note: nextProps.todo.note
        })

    }
    componentDidMount() {
        if (this.props.match.params._id) {
            this.props.fetchTodo(this.props.match.params._id);
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { _id, task, note } = this.state;
        console.log(_id, task, note);
        if (_id) {
            this.props.updateTodo({ _id, task, note })
                .then(() => this.setState({ done: true }))
        } else {
            this.props.addTodo({ task, note })
                .then(() => this.setState({ done: true }))
        }
    }
    render() {
        console.log(this.props);
        const form = <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Task</label>
                <input type="text" className="form-control" placeholder="Enter Task"
                    name="task"
                    value={this.state.task}
                    onChange={this.handleChange}
                    id="task"
                />
            </div>
            <div className="form-group">
                <label >Notes</label>
                <textarea className="form-control" rows="5"
                    name="note"
                    value={this.state.note}
                    onChange={this.handleChange}
                    id="note"
                ></textarea>

            </div>

            <button type="submit" className="btn btn-primary"

            >Create</button>
        </form>
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {this.state.done ? <Redirect to="/todos" /> : form}

                    </div>
                </div>
            </div>

        )
    }
}
function mapStateToProps(state, props) {


    if (props.match.params._id) {
        console.log("entered");

        return {
            todo: state.todos.find(item =>
                // console.log("item : ", item);

                item._id === props.match.params._id
            )
        }
    }
    return { todo: null }

}
export default connect(mapStateToProps, { addTodo, fetchTodo, updateTodo })(CreateTodo);