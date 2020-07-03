import * as ActionTypes from './actionTypes';

export const favorites = (state = [1], action) => {
    console.log(action)
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.some(el => el === action.payload))
                return state;
            return state.concat(action.payload);
        case ActionTypes.DELETE_FAVORITE:
            console.log("deleted")
            return state.filter((fav) => fav !== action.payload)
        default:
            return state;
    }
};