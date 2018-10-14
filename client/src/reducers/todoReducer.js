import { ADD_TODO, GET_TODOS, TODO_FETCHED, UPDATE_TODO, DELETE_TODO } from '../actions/types';

export default function (state = [], action = {}) {
    console.log("state: =======", state);

    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                action.todo
            ]
        case GET_TODOS:
            return action.todos
        case TODO_FETCHED:
            const index = state.findIndex(item => item._id === action.todo._id);
            if (index > -1) {
                return state.map(item => {
                    if (item._id === action.todo._id) return action.todo;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.todo
                ]
            }
        case UPDATE_TODO:
            return state.map(todo => {
                if (todo._id === action.todo._id) return action.todo;
                return todo
            })
        case DELETE_TODO:
            return state.filter(todo => todo._id !== action.todoId)
        default:
            return state
    }
}