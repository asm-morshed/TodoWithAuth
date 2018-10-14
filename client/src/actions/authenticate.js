import axios from 'axios';

import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    // console.log("action", user, history);

    axios.post('/api/user/signup', user)
        .then(res => {
            history.push('/signin')
        })
        .catch(error => {
            dispatch({
                payload: error.response.data
            })
        })
}
export const loginUser = user => dispatch => {
    // console.log("From action signin: ", user);

    axios.post('/api/user/signin', user)
        .then(res => {
            // console.log("logging after authentication: ", res);

            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decode = jwt_decode(token);
            dispatch(setCurrentUser(decode));
        })
}

export const setCurrentUser = decoded => {

    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = history => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
}