import axios from 'axios';
import { ADD_TODO, GET_TODOS, TODO_FETCHED, DELETE_TODO, UPDATE_TODO } from './types';


export function getTodos(todos) {
    return {
        type: GET_TODOS,
        todos
    }
}

export function fetchTodos() {
    //console.log("Action from fetchTodos");

    return (dispatch, getState) => {
        let email = getState().auth.user.email;
        return axios.get(`/api/todo/${email}`)
            .then(response => {
                console.log("Todos:", response.data);
                dispatch(getTodos(response.data.todos))
            })
    }

}
export function todoFetched(todo) {
    return {
        type: TODO_FETCHED,
        todo
    }
}
export function fetchTodo(id) {
    console.log("From fetch one todo", id);

    return dispatch => {
        return axios.get(`/api/todo/id/${id}`)
            .then(response => {
                console.log("IND TODO:  ", response);

                dispatch(todoFetched(response.data.todo))
            })
    }
}
export function saveTodo(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}
export function addTodo(todo) {
    console.log("Add todo", todo);

    return (dispatch, getState) => {
        console.log("getState", getState());

        todo['email'] = getState().auth.user.email;
        console.log("todo is going: ", todo);

        return axios.post('/api/todo', todo)
            .then(res => {
                console.log("after adding", res);
                dispatch(saveTodo(todo))

            })
    }

}

export function todoDelete(todoId) {
    return {
        type: DELETE_TODO,
        todoId
    }
}
export function deleteTodo(id) {
    console.log("Delete todo", id);
    return dispatch => {
        return axios.delete(`/api/todo/${id}`)
            .then(res => {
                dispatch(todoDelete(id))
            })
    }

}
export function todoUpdated(todo) {
    return {
        type: UPDATE_TODO,
        todo
    }
}
export function updateTodo(todo) {
    return dispatch => {
        return axios.put(`/api/todo/${todo._id}`, todo)
            .then(res => {
                dispatch(todoUpdated(res.data))
            })
    }
}