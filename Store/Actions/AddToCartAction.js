export const REMOVE_AN_ITEM_FROM_CART = 'REMOVE_AN_ITEM_FROM_CART'; 
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const ADD_TOTAL = 'ADD_TOTAL';
export const addProductToCart = (productId,productTitle,productDescription,productPrice,productQuantity,productVendor,productVendorName,productImage,stock) => {
    return dispatch => {
       dispatch({type:ADD_TO_CART,productData:[
           {
           title:productTitle,
           description:productDescription,
           price:productPrice,
           quantity:productQuantity,
           vendor:productVendor,
           image:productImage,
           id:productId,
           stock:stock,
           name:productVendorName
       }]})
    }   
};
export const Incremenet = () => {
 return dispatch => {
     dispatch({type:INCREMENT});
 }
};
export const drecement = (title) => {
    return dispatch => {
        dispatch({type:DECREMENT,data:{title}});
    }
};
export const removeCart = (data) => {
    return dispatch => {
        dispatch({type:REMOVE_CART,removeData:{data}})
    }
};
export const removeAnItemFromCart = (title) => {
    return dispatch => {
        dispatch({type:REMOVE_AN_ITEM_FROM_CART,itemData:{title}});
    }
};

export const addTotal = (price,quantity) => {
    return dispatch => {
        dispatch({type:ADD_TOTAL,totalData:{
            price,
            quantity
        }});
    }
};
