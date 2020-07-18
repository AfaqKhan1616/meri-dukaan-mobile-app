import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Picker } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function CartItem(props) {
    const [quantity,setQuantity] = useState(1); 
    const [selectedValue,setSelectedValue] = useState('Medium');
    return (
        <View style={styles.card}>
            <View style={{
                flexDirection: 'row',

            }}>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: props.image }} style={styles.img} />
                </View>
                <View style={{ width: '60%' }}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{ color: 'white', fontSize: 20 }}>{props.title}</Text>
                    <TouchableOpacity 
                    onPress={props.onRemove}
                    >
                    <FontAwesome name='remove' size={20} color='white' style={{width:30,left:10,top:4,marginBottom:5}}/>
                    </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'white',fontWeight:'500'}}>{props.Description}</Text>
                    <Text style={{ color: 'white',fontWeight:'bold',fontSize:20 }}>{props.Price * quantity} PKR</Text>
                    <Text style={{ color: 'white',fontWeight:'bold',fontSize:20}}>{quantity}x</Text>
                
                </View>
              
            </View>
            <View style={{
                flexDirection:'row',
            justifyContent:'space-between',
            alignSelf:'flex-end',
            bottom:10,
            right: 10,
        }}>
        <View style={{bottom:10}}>
        <Picker
        selectedValue={selectedValue}
        style={{ height: 20, width: 100,backgroundColor:'transparent',color:'white'}}
        itemStyle={{borderRadius:100,fontFamily:'Sacrem'}}
        onValueChange={(itemValue, itemIndex) => {
            props.sendSize(selectedValue);
            setSelectedValue(itemValue)}}
        mode='dropdown'
      >
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Small" value="Small" />
        <Picker.Item label="Large" value="Large" />
        <Picker.Item label="XL" value="XL" />

      </Picker>
        </View>
        <View style={styles.quantity}>
            <View style={{
                flexDirection: 'row',
            }}>
                <TouchableOpacity style={{
                    backgroundColor: 'white',
                    height: 30,
                    width: 40,
                    borderRadius:10
                }}
                onPress={() => {
                    setQuantity(quantity + 1);
                    props.sendIncreasedQuantity(quantity)
                    // props.SendDataToParent(quantity)
                }}
                >
                    <Text style={{
                        fontSize: 20,
                        textAlign:'center',
                        color:'#323232'
                    }}>+</Text>
                </TouchableOpacity>
                <View style={{
                    width: 30
                }}>
                    <Text style={{ fontSize: 14,textAlign:'center',top:5 ,color:'white',fontWeight:'bold'}}>{quantity}</Text>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: 'white',
                    height: 30,
                    width: 40,
                    borderRadius:10
                }}
                onPress={() => {
                    setQuantity(quantity - 1);
                    props.SendDecreaseQuantity(quantity);

                }}
                >
                       <Text style={{
                        fontSize: 20,
                        textAlign:'center',
                        color:'#323232'
                    }}>-</Text>
                </TouchableOpacity>
            </View>
           
        </View>
       
    </View>

        </View>
    )
};
const styles = StyleSheet.create({
    card: {
        height: 160,
        width: '95%',
        backgroundColor: '#323232',
        borderRadius: 10,
        borderWidth: 2,
        elevation: 5,
        borderColor: '#323232',
        marginHorizontal: 5,
        marginVertical: 10
    },
    imgContainer: {
        width: '40%',
        height: '95%',
        borderRadius:20
    },
    img: {
        width: '80%',
        height: '95%',
        borderRadius:30,
        alignSelf:'center',
        top:5,
        resizeMode:'stretch'
    },
    quantity: {
        width: 100,
        height: 30,
        backgroundColor: 'black',
        borderRadius:10,
        bottom:20
    }
});
