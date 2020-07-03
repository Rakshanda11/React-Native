import * as ActionTypes from './actionTypes';

export const comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      // payload is array of comments
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMMENT:
      // payload is a single comment
      console.log(action);
      
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }

    default:
      return state;
  }
};