import { ADD_TO_FAVOURITE,REMOVE_FAVOURITE,REMOVE_AN_ITEM_FROM_FAVOURITE } from '../Actions/AddToFavouriteAction';


const initialState = {
    favourites:[]
};
export default(state=initialState,action) => {
    switch(action.type) {
        case ADD_TO_FAVOURITE:
            return {
                ...state,
                favourites:state.favourites.concat(action.favouriteData)
            }
        case REMOVE_FAVOURITE:
            return initialState;    
        case REMOVE_AN_ITEM_FROM_FAVOURITE:
            return {
                ...state,
                favourites:state.favourites.filter(item => item.title !== action.data.title)
            }    
        default:
            return state;    
    }
}