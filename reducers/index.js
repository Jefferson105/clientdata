import { SET_DATA, SET_ERROR, HIDE_LOADING, SHOW_LOADING } from "../actions/actionTypes";

export const initialData = {
    loading: true,
    data: null,
    error: null
};

export const rootReducer = (state = initialData, { type, data }) => {
    switch(type) {
        case SHOW_LOADING: 
            return {
                ...state,
                loading: true
            };

        case HIDE_LOADING:
            return {
                ...state,
                loading: false
            };

        case SET_DATA:
            return {
                ...state,
                data
            };

        case SET_ERROR: 
            return {
                ...state,
                error: data
            };

        default:
            return state;
    }
};

export default rootReducer;