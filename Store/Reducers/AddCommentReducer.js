import {ADD_COMMENT,DELETE_COMMENT} from '../Actions/AddCommentsAction';

const initialState = {
    comments:[]
};
export default (state=initialState,action) => {
    switch(action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments:state.comments.concat(action.commentData)
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments:state.comments.filter(comment => comment.seconds !== action.comData.seconds)
            }    
        default:
            return state;

    }
};