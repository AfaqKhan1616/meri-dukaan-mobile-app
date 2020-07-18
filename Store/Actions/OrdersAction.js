export const ADD_ORDER = 'ADD_ORDER';
export const CANCEL_ORDER = 'CANCEL_ORDER';
export const addToOrder = (customerName,PhoneNumber,address,cart,totalAmount,date,month,year,seconds,quantity) => {
    return dispatch => {
        dispatch({type:ADD_ORDER,orderData:[{customerName,PhoneNumber,address,cart,totalAmount,date,month,year,seconds,quantity}]});
    }
};
export const cancelOrder = (id) => {
    return dispatch => {
        dispatch({type:CANCEL_ORDER,data:{id}})
    }
};