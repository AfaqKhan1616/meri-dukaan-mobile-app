import { ADD_ORDER, CANCEL_ORDER } from '../Actions/OrdersAction';

const initialState = {
    orders:[]
}
export default (state=initialState,action) => {
    switch(action.type) {
        case ADD_ORDER:
            return {
                ...state,
                orders:state.orders.concat(action.orderData)
            }
        case CANCEL_ORDER:
            return {
                ...state,
                orders:state.orders.filter(order => order.id !== action.data.id)
            }    
        default:
            return state;    
    }
};