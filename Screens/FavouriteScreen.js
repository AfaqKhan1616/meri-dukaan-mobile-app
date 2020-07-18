import React from 'react';
import { View,FlatList,StyleSheet,TouchableOpacity,Alert,Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FavCard from '../Components/FavCard';
import Header from '../Components/HeaderForCartAndFav';
import {FontAwesome} from '@expo/vector-icons';
import * as FavActions from '../Store/Actions/AddToFavouriteAction';
export default function Cart() {
    console.disableYellowBox = true;
    const favourites = useSelector(state => state.fav.favourites);
    const dispatch = useDispatch();


    const remove = data => {
        dispatch(FavActions.removeFavList(data));
    }
    const shortString = (description) => {
        const newStr = description.substr(0,40);
        const charToReplace = newStr.charAt(9);
        const doneIt = charToReplace.replace(charToReplace,' ...');
        const concatenatedStr = newStr.concat(doneIt);
        return concatenatedStr;
      }
    return(
     <View style={{flex:1,backgroundColor:'#333333'}}>
         <Header title='Favourites'>
             <TouchableOpacity
             onPress={() => {
                 Alert.alert('Oh Really?','Are you sure that you want to delete whole favourite list?',
                 [{text:'No,Way',onPress:() => {
                     return;
                 }},{text:'Yes,Delete it!',onPress:() => {
                     remove(favourites);
                 }}]);
             }}
             style={{
                 right: 10,
                 top:13
             }}>
                 {favourites.length === 0 ? null :
            <FontAwesome name="remove" size={24} color="white"/>
                    }
            </TouchableOpacity>
            </Header>
            {favourites.length === 0 ? <View style={{
                alignSelf:'center',
                justifyContent:'center',
                alignItems:'center',
                flex:1
            }}><Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>NO FAVOURITE FOUND!</Text></View>:
          <View style={{alignSelf:'center',flex:1}}>
            <FlatList
         data={favourites}
         keyExtractor={item => 'key' + item.price}
         renderItem = {itemData => (
             <FavCard
             imageUri={itemData.item.image}
             title={itemData.item.title}
             Description={shortString(itemData.item.description)}
             Price={itemData.item.price}
             onRemove={() => {
                 Alert.alert('Sure?','Really want to delete this?',[{text:'No,way',onPress:() => {return;}},{text:'Yes,Delete it!',onPress:() => {
                    dispatch(FavActions.removeAnItem(itemData.item.title));
                 }}])
                 
             }}
             />
         )}
         />
         </View>
            }
     </View>
    )
};
const styles = StyleSheet.create({});
