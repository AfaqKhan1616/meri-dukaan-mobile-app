import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Picker } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function FavCard(props) {
    return (
        <View style={styles.card}>
            <View style={{
                flexDirection: 'row',

            }}>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: props.imageUri }} style={styles.img} />
                </View>
                <View style={{ width: '60%' }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>{props.title}</Text>
                    <Text style={{ color: 'black' }}>{props.Description}</Text>
                    <Text style={{ color: 'black',fontWeight:'bold' }}>{props.Price} PKR</Text>
                </View>
            </View>
            <View style={{
                alignSelf:'flex-end',
                bottom:40,
                right:5
            }}> 
            <TouchableOpacity onPress={props.onRemove}>
                <FontAwesome name="remove" size={24} color="black"/>
                </TouchableOpacity>
            </View>
           
        </View>
    )
};
const styles = StyleSheet.create({
    card: {
        height: 90,
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 2,
        elevation: 20,
        borderColor: 'white',
        marginHorizontal: 5,
        marginVertical: 10
    },
    imgContainer: {
        width: '40%',
        height: 90,
    },
    img: {
        width: '90%',
        height: 80,
        resizeMode:'contain'
    },
    quantity: {
        width: 100,
        height: 30,
        backgroundColor: '#2F66A9',
        borderRadius:10,
    }
});
