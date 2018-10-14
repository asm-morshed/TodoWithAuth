import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
    profile: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}