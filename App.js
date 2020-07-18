import React, { useState, useEffect } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import FlipCloudNavigator from './Navigation/FlipCloudNavigator';
import CartReducer from './Store/Reducers/AddToCartReducer';
import FavouriteReducer from './Store/Reducers/AddToFavouriteReducer';
import OrderReducer from './Store/Reducers/OrdersReducer';
import CommentsReducer from './Store/Reducers/AddCommentReducer';
import { View, Text, Platform, Vibration, Button } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Detail from './Screens/ProductDetailScreen';
import thunk from 'redux-thunk';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import CommentBox from './Components/CommentBox';
export default function App() {

  const fetchFonts = () => {
    return Font.loadAsync({
      'AP': require('./assets/Fonts/AP.ttf'),
      'Sacrem': require('./assets/Fonts/Sacrem.ttf'),
      'kpb': require('./assets/Fonts/kpb.ttf'),
      'ab': require('./assets/Fonts/ab.otf')
    });
  };
  const [fontLoad, setFontLoad] = useState(false);

  if (!fontLoad) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoad(true)} />;
  }
  const rootReducer = combineReducers({
    cart: CartReducer,
    fav: FavouriteReducer,
    order: OrderReducer,
    comment: CommentsReducer
  });
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <FlipCloudNavigator />
    </Provider> 
  
  )
};
