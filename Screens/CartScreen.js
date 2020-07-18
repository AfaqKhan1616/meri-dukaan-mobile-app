import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import CartCard from '../Components/CartItem';
import Header from '../Components/HeaderForCartAndFav';
import { useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import * as CartActions from '../Store/Actions/AddToCartAction';
import axios from 'axios';
export default function Cart(props) {
    console.disableYellowBox = true;
    const cartData = useSelector(state => state.cart.cart);
    const [username,setUsername] = useState('');
    // const quantity = useSelector(state => state.cart.quantity);
    console.log(cartData);
    const [quantity, setQuantity] = useState(1);
    const [size,setSize] = useState('');
    const dispatch = useDispatch();
    //Algorithm for total Amount
    var arr = [];
    var s = 0;
    for (var a = 0; a < cartData.length; a++) {
        const cd = cartData[a];
        arr.push(cd.price);
    }
    function sum(arr) {
        // var s = 0;
        for (var i = 0; i < arr.length; i++) {
            s += arr[i];
        }
    }
    sum(arr);
    let vendor;
    for (var e = 0;e < cartData.length;e++) {
       vendor = cartData[e].vendor;
    };
    let vendorName;
    for (var l = 0;l < cartData.length;l++) {
       vendor = cartData[l].vendor.name;
    };


    console.log('Vendor Name---------------------------------------------------------------------------------',vendor);
    //End    
    //Algorithm for quantity
    // const data = [
    //     {title:'Shoe',quantity:1,price:400},
    //     {title:'Shirt',quantity:1,price:500},
    //     {title:'Watch',quantity:3,price:600}
    //   ];
    //   const qArray = [];
    //   let totalAmount = 0;
    // let q;
    //   for (var a = 0;a < cartData.length;a++) {
    //       q = cartData[a].quantity;
    //     console.log(q);
    //   }
    // const increase = () => {
    //     let q;
    //     for (var a = 0;a < cartData.length;a++) {
    //         q = cartData[a].quantity;
    //       console.log(q);
    //     }
    // }
    //   for (var i = 0; i < cartData.length;i++) {
    //     totalAmount += cartData[i].price * cartData[i].quantity
    //     console.log(totalAmount)
    //   }
    //  
    let qt;
    const recieveIncreaseQuantity = quanData => {
        setQuantity(quanData + 1);
        s * quantity;
        // console.log('quanDataIncrease',qt); 
    };
    const recieveDecreaseQuantity = quanData => {
        setQuantity(quanData-1);
    };
    const recieveSize = RecievedSize => {
        setSize(RecievedSize);
    };
    const Sizarr = [];
    for (var a = 0;a < cartData.length;a++) {
        Sizarr.push({title:cartData[a].title,size:size,quantity:quantity});
    }
    console.log(Sizarr);
    var QuantityRecieved = 0;
    // const recievequanDataFromParent = quanData => {
    //     // QuantityRecieved = QuantityRecieved + quanData;
    //     setQuantity(quanData + 1);
    //     console.log('recievedquanDataIs',quanData);
    // }
    const shortString = (title) => {
        const newStr = title.substr(0,10);
        const charToReplace = newStr.charAt(9);
        const doneIt = charToReplace.replace(charToReplace,' ...');
        const concatenatedStr = newStr.concat(doneIt);
        return concatenatedStr;
      }
      const fetchUser = async() => {
          try{
          const res = await axios.get('https://meridukan-api.herokuapp.com/users');
          const filteredUsers = res.data.filter(data => data.id === cartData[0].vendor);
          setUsername(filteredUsers[0].username);
          console.log(filteredUsers);
          }catch(e) {
             console.log(e);
          }
      };
      useEffect(() => {
          fetchUser();
      },[]);
    return (
        <View style={{ flex: 1 }}>
            <Header title='My Bag'>
                {cartData.length >= 1 ?
                    <TouchableOpacity
                    style={{top:15,right:10}}
                        onPress={() => {
                            Alert.alert('Really?', 'Are you sure you want to clear the whole cart?',
                                [{ text: 'No Way', onPress: () => { return; } }, {
                                    text: 'Yes,Clear it!', onPress: () => {
                                        dispatch(CartActions.removeCart(cartData));
                                    }
                                }]
                            )
                        }}>
                        <FontAwesome name="remove" size={24} color="white" />
                    </TouchableOpacity>
                    : <Text>''</Text>
                }
            </Header>
            <View style={styles.summaryCard}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Total Items : {cartData.length}</Text>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Vendor : {username}</Text>
                <TouchableOpacity
                    disabled={cartData.length === 0 ? true : false}
                    style={styles.orderBtn} onPress={() => {
                        if(quantity > cartData[0].stock) {
                            Alert.alert(`Sorry,our stock quantity is ${cartData[0].stock} and you've increase your quantity to ${quantity} you can order ${cartData[0].stock} items right now. :)`)
                            return;
                        } else {
                            props.navigation.navigate('AddMargin', {
                                totalAmount: s*quantity,
                                quantity:quantity,
                                vendor:username,
                                size:[...size,size]
                            });
                        }                        
                    }}>
                    <Text style={styles.orderBtnText}>Proceed</Text>
                </TouchableOpacity>
            </View>
            {cartData.length > 0 ?
                <FlatList
                    data={cartData}
                    keyExtractor={item => item.id}
                    renderItem={(itemData, index) => (
                        <CartCard
                            SendDecreaseQuantity={recieveDecreaseQuantity}
                            sendIncreasedQuantity={recieveIncreaseQuantity} 
                            image={itemData.item.image}
                            title={shortString(itemData.item.title)}
                            Description={itemData.item.description}
                            Price={itemData.item.price}
                            sendSize={recieveSize}
                            onRemove={() => {
                                dispatch(CartActions.removeAnItemFromCart((itemData.item.title)));
                            }}
                        >
                        </CartCard>
                    )}
                /> : <Text style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    flex:1,
                    fontWeight:'bold',
                    justifyContent:'center',
                    top:150
                }}>NOTHING FOUND IN MY BAG</Text>}
        </View>
    )
};
const styles = StyleSheet.create({
    summaryCard: {
        width: '95%',
        height: 100,
        backgroundColor: '#323232',
        justifyContent: 'center',
        left: 5,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 10
    },
    orderBtn: {
        width: 110,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'flex-end',
        top: 0,
        justifyContent: 'center'
    },
    orderBtnText: {
        fontSize: 16,
        color: '#323232',
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 2
    }
});
