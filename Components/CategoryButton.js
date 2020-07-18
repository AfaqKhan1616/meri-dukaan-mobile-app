import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, Octicons } from '@expo/vector-icons';
export default function CategoryButton(props) {
    return (
        <TouchableOpacity style={styles.btn} onPress={props.onP}>
            <View style={styles.btnCon}>
                {props.children}
                <Text style={{marginHorizontal:5,color:'black',fontWeight:'bold'}}>{props.CategoryText}</Text>
            </View>
        </TouchableOpacity>

    )
};
const styles = StyleSheet.create({
  btn:{
      width:120,
      height:35,
      borderRadius:10,
      backgroundColor:'white',
      elevation:5,
      padding:5,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:10,
      marginRight:5,
      marginLeft:5
  },
  btnCon:{
    flexDirection:'row',
    marginHorizontal:10,
  },
  img:{
      width:'50%',
      height:43
  },
  text:{
      fontSize:16,
      textAlign:'center',
      fontWeight:'bold',
      color:'black'
  }
});
