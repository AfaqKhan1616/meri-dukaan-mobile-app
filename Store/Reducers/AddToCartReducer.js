import { ADD_TO_CART,ADD_TOTAL, REMOVE_CART, REMOVE_AN_ITEM_FROM_CART, INCREMENT, DECREMENT } from '../Actions/AddToCartAction';


const initialState = {
    cart:[],
    total:0,
    quantity:1
};
export default (state=initialState,action) => {
    switch(action.type) {
      case ADD_TO_CART:
          return {
              ...state,
              cart:state.cart.concat(action.productData)
          }; 
      case ADD_TOTAL:
          return {
              ...state,
              total:state.total + 10
          };
      case REMOVE_CART:
          return initialState; 
      case REMOVE_AN_ITEM_FROM_CART:
          return {
              ...state,
              cart:state.cart.filter(item => item.title !== action.itemData.title)
          };
      case INCREMENT:
          return {
              ...state,
              quantity:state.quantity + action.data
          };
       case DECREMENT:
        return {
            ...state,
            quantity:state.quantity - action.data
        };
      default:
          return state;    
    }
};


