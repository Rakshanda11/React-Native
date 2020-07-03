import * as ActionTypes from './actionTypes';

export const dishes = (state = {
    isLoading: true,
    errMss: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.DISHES_LOADING:
            console.log('dish_load')
            return {
                ...state, isLoading: true, dishes: [], errMss: null
            }
        case ActionTypes.ADD_DISHES:
            console.log('dish_add')
            return {
                ...state, isLoading: false, dishes: action.payload, errMss: null,
            }
        case ActionTypes.DISHES_FAILED:
            console.log('dish_failed')
            return {
                ...state, isLoading: true, dishes: [], errMss: action.payload
            }
        default:
            return state;
    }
}