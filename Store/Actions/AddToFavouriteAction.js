export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const REMOVE_AN_ITEM_FROM_FAVOURITE = 'REMOVE_AN_ITEM_FROM_FAVOURITE';

export const addToFavourite = (title,description,price,image) => {
  return dispatch => {
      dispatch({type:ADD_TO_FAVOURITE,favouriteData:[{title,description,price,image}]});
  };
};

export const removeFavList = (data) => {
  return disptach => {
    disptach({type:REMOVE_FAVOURITE,data:{data}});
  }
};

export const removeAnItem = (title) => {
  return dispatch => {
    dispatch({type:REMOVE_AN_ITEM_FROM_FAVOURITE,data:{title}});
  }
};