import * as ActionTypes from './actionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments').
        then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        ).then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => {
            console.log(error)

            dispatch(commentsFailed(error.message))
        })

}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    // fetch(baseUrl + 'dishes')
    //     .then(response => console.log(response))
    //     .catch(error => {
    //         console.log("Fetch ERROR")
    //         console.log(error)
    //     })

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => {
            console.log(error)
            dispatch(dishesFailed(error.message))
        });
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchPromos = () => async (dispatch) => {

    dispatch(promosLoading());

    return await fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => {
            console.log(error)
            dispatch(promosFailed(error.message))
        });
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => {
            console.log(error)
            dispatch(leadersFailed(error.message))
        })
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
}

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})
export const postComment = (dishId, rating, author, comment) => {
    console.log(dishId)
    return dispatch => {
        // return new Promise(async (resolve, reject) => {
        console.log({ dishId, rating, author, comment })
        const newComment = { dishId, rating, author, comment, date: new Date().toISOString() };
        return fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                "Content-type": "application/json"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    dispatch(addComment(newComment))
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    throw error;
                })
            .catch(error => {
                console.log('post comments', error.message);
                // reject(); 
                console.log('Your comment could not be posted\nError: ' + error.message);
            });
        // })
    }
}

export const deleteFavorite = (dishId) =>{
    console.log('action creator')
    return {
        type: ActionTypes.DELETE_FAVORITE,
        payload: dishId
    }
}