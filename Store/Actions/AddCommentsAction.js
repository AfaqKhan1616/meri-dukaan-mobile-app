export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const addCommment = (email, comment, month, year, date, hour, minute, seconds) => {
    return dispatch => {
        dispatch({
            type: ADD_COMMENT, commentData: [{
                email,
                comment,
                month,
                year,
                date,
                hour,
                minute,
                seconds
            }]
        });
    }
};
export const delCom = (seconds) => {
    return dispatch => {
        dispatch({ type: DELETE_COMMENT, comData: { seconds } });
    }
};