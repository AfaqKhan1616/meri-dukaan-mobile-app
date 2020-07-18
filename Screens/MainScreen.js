import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, Dimensions, ImageBackground, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
const AuthScreen = (props) => {
    console.disableYellowBox = true;
    return (
        <View>
            <ImageBackground
                source={require('../assets/Images/bgimg.jpg')}
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
            >
              <View style={{
                justifyContent:'center',
                flex:1,
                alignItems:'center',
                alignSelf:'center',
                
              }}>
                <Text style={{fontSize:80,color:'white',fontFamily:'Sacrem',textAlign:'center'}}>Meri Dukan</Text>
              </View>
              <View style={{bottom:170}}>
                <TouchableNativeFeedback
                onPress={() => {
                  props.navigation.navigate('Auth');
                }} 
                style={[styles.btnn,{
                  backgroundColor:'transparent',
                  borderColor:'white'
                }]}>
                  <Text style={{color:'white',fontSize:20,textAlign:'center'}}>LOGIN</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback 
                 onPress={() => {
                  props.navigation.navigate('SignUp');
                }} 
                style={[styles.btnn,{
                  backgroundColor:'white',
                  borderColor:'transparent'
                }]}>
                <Text style={{color:'black',fontSize:20,textAlign:'center'}}>SIGN UP</Text>
                </TouchableNativeFeedback>
              </View>
            </ImageBackground>
        </View>
    )
};
const styles = StyleSheet.create({
    inputView: {
        width: 320,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authCard: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height - 200,
        width: '90%',
        padding: 10,
        backgroundColor: 'transparent',
        elevation: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white'
    },
    btn: {
        width: 150,
        height: 40,
        backgroundColor: '#2c8ffa',
        elevation: 15,
        borderRadius: 20,
        marginTop: 10,
        alignSelf:'center'
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 50,
        padding: 5,
        borderColor: '#2c8ffa',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#2c8ffa',
        top: 50,
        marginVertical: 10
    },
    input: {
        width: '100%',
        left: 20,
        color: 'white'
    },
    circleBtn: {
        width: 60,
        height: 60,
        borderRadius: 200 / 2,
        margin: 10
    },
    btnn:{
      width:'90%',
      alignItems:'center',
      alignSelf:'center',
      borderRadius:20,
      borderWidth:2,
      margin:10,
      height:50,
      padding:10
    }
});
export default AuthScreen;