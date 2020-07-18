import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Picker } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function OrderSummaryCard(props) {
    return (
        <View style={styles.card}>
            <View style={{
                flexDirection: 'row',

            }}>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: props.image }} style={styles.img} />
                </View>
                <View style={{ width: '60%' }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>{props.title}</Text>
                    <Text style={{ color: 'black' }}>{props.Description}</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{props.Price} PKR</Text>
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    card: {
        height: 130,
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        elevation: 10,
        borderColor: 'white',
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        top: 10,
        marginBottom: 20
    },
    imgContainer: {
        width: '40%',
        height: 100,
    },
    img: {
        width: '90%',
        height: 90,
        resizeMode: 'contain',
        top:10
    },
    quantity: {
        width: 100,
        height: 30,
        backgroundColor: '#2F66A9',
        borderRadius: 10,
    }
});
