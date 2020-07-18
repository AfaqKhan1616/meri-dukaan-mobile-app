import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, ToastAndroid, YellowBox, AsyncStorage } from 'react-native';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import OrderSummaryCard from '../Components/OrderSummaryCard';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderActions from '../Store/Actions/OrdersAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Notifications } from 'expo';
import axios from 'axios';
export default function OrderSummary(props) {
    console.disableYellowBox = true;
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
    YellowBox.ignoreWarnings(['Invalid prop ‘value’ of type ‘number’ supplied to ‘TextInput’,expected `string`']);
    const dispatch = useDispatch();
    const [cashToCollect, setCashToCollect] = useState('0');
    const cartData = useSelector(state => state.cart.cart);
    const name = props.navigation.getParam('name');
    const pn = props.navigation.getParam('pn');
    const address = props.navigation.getParam('Address');
    const totalAmount = props.navigation.getParam('totalAmount');
    const quantity = props.navigation.getParam('quantity');
    const size = props.navigation.getParam('size');
    const state = props.navigation.getParam('state');
    const pincode = props.navigation.getParam('pincode');
    const landmark = props.navigation.getParam('landmark');
    const city = props.navigation.getParam('city');
    const customer_id = props.navigation.getParam('customer_id');
    const d = new Date();
    const orderedData = [];
    const [getTok, setToken] = useState(null);
    const vendor = props.navigation.getParam('vendor');
    
    // for (var a = 0; a < cartData.length; a++) {
    //     // console.log('looping Data',cartData[a].description)
    //     orderedData.push({ quantity: quantity, product: cartData[a].id, size: 'Medium' });
    // }
    // for (var e = 0; e < cartData.length; e++) {
    //     // console.log('looping Data',cartData[a].description)
    //     console.log('TotalAmount',cartData[e].quantity * cartData[e].price);
    // }

    // Alert.alert(JSON.stringify(array1))
    // const data = [
    //     {
    //         quantity: quantity,
    //         product: '5ee35914514b330624c1671f',
    //         size: "Medium"
    //     },
    //     {
    //         quantity: quantity,
    //         product: '5ee35914514b330624c1671f',
    //         size: "Medium"
    //     },
    //     {
    //         quantity: quantity,
    //         product: '5eedd1ae9f30932b54de3dc7',
    //         size: "Medium"
    //     }
    // ]

    // // console.log(customer_id);
    // const postDataToServer = async(val) => {
    //     console.log('Values--------------------------------------------------------------->',val);
    //     try {
    //         // const customers =  await axios.get(`https://meridukan-api.herokuapp.com/customers/${customer_id}`);
    //         // console.log('customer id',customer_id);
    //         await axios.post('https://meridukan-api.herokuapp.com/orders',
    //         {
    //             status: 'Pending',
    //             total_amount: 15999,
    //             customer:'5eedad779076470017076f22',
    //             ordered_products: [
    //                 {
    //                     quantity: 2,
    //                     products:"5ee35914514b330624c1671f",
    //                     size: "Medium"
    //                 }
    //             ]
    //         }
    //         );
    //     }
    //     catch(e) {
    //             console.log(e);
    //         }

    // };
    // const postDataToServer = async () => {
    //     try {
    //         const resseller = await AsyncStorage.getItem('Resseller');
    //         Alert.alert(JSON.stringify(resseller));
    //         const customer = await axios.get(`https://meridukan-api.herokuapp.com/customers/${customer_id}`);
    //         const response = await axios.post('https://meridukan-api.herokuapp.com/Orders',
    //             {
    //                 status: 'Pending',
    //                 total_amount: parseInt(cashToCollect) + parseInt(100),
    //                 customer: customer_id,
    //                 ordered_products: orderedData,
    //                 margin_amount: parseInt(cashToCollect) - parseInt(totalAmount),
    //                 delivery_charges: parseInt(100),
    //                 vendor: vendor,
    //                 reseller: resseller
    //             });

    //     } catch (e) {
    //         Alert.alert(JSON.stringify(e));
    //         console.log(e);
    //         throw new Error(e.message);
    //     }
    // };
    // console.log('CUSTOMER_ID', customer_id);
    // console.log('VENDOR ID', vendor);
    // // const getOrderedProducts = async() => {
    // //     try {
    // //         const OrderedProducts = await authedAxios.get(`/Products/${djd}`);
    // //     }
    // // }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#DCDCDC' }}>
            <View>
                <View style={styles.totalBox}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10
                    }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{parseInt(totalAmount)} PKR</Text>

                    </View>
                </View>
                <View style={styles.marginBox}>
                    <View style={styles.marginAndInput}>
                        <View>
                            <Text style={{ fontSize: 18, color: 'white' }}>Cash to collect from customer:  </Text>
                            <Text style={{ fontSize: 12, color: 'white' }}>(Including your Margin and Delivery)  </Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                top: 20,
                            }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>Margin You Earn</Text>
                                <Text style={{ fontSize: 14, color: 'white', left: 60, fontWeight: 'bold' }}>
                                    {cashToCollect === 0 ? 'PKR' : (parseInt(cashToCollect) - parseInt(totalAmount) -parseInt(100) + 'PKR')}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                top: 20,
                            }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>Deliver Charges</Text>
                                <Text style={{ fontSize: 14, color: 'white', left: 60, fontWeight: 'bold' }}>
                                    100 PKR
                                </Text>
                            </View>
                        </View>
                        <TextInput
                            value={cashToCollect}
                            onChangeText={m => setCashToCollect(m)}
                            style={styles.MarginInput}
                            keyboardType='number-pad'
                        />
                    </View>
                </View>
                <View>
                </View>

                <View style={{
                    width: '100%',
                    backgroundColor: 'white',
                    paddingVertical: 10,
                    top: 10,
                    marginTop: 10,
                    paddingHorizontal: 10,
                    marginBottom: 30,
                    paddingBottom: 10
                }}>
                    <View>
                        <Text style={{ fontSize: 15, left: 10 }}>Products you want to order:</Text>
                        <SafeAreaView
                            style={{ flex: 1 }}
                        >
                            <FlatList
                                data={cartData}
                                keyExtractor={item => item.title}
                                renderItem={itemData => (
                                    <OrderSummaryCard
                                        title={itemData.item.title}
                                        Description={itemData.item.description}
                                        Price={itemData.item.price}
                                        image={itemData.item.image}
                                        quantity={quantity}
                                    />
                                )}
                            />
                        </SafeAreaView>
                    </View>
                </View>
                <View style={{
                    marginBottom: 10,
                    position: 'relative'
                }}>

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        props.navigation.navigate('customers',{
                            cash:cashToCollect,
                            margin:parseInt(cashToCollect) - parseInt(totalAmount) -parseInt(100),
                            size:size,
                            quantity:quantity
                        });
                    }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
};
const styles = StyleSheet.create({
    marginBox: {
        width: '100%',
        height: 140,
        backgroundColor: '#323232',
        elevation: 5,
        alignItems: 'center'
    },
    marginAndInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    MarginInput: {
        width: 70,
        height: 60,
        borderBottomColor: 'white',
        borderBottomWidth: 5,
        bottom: 10,
        color: 'white'
    },
    totalBox: {
        width: '100%',
        height: 60,
        backgroundColor: '#323232',
        borderColor: '#323232',
        borderWidth: 1
    },
    customerDetails: {
        width: '100%',
        height: 250,
        backgroundColor: '#323232',
        elevation: 5,
        top: 10
    },
    cdtext: {
        fontSize: 16,
        color: 'white',
        padding: 5,
        fontWeight: '600'
    },
    btn: {
        width: '90%',
        height: 40,
        backgroundColor: '#323232',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#323232',
        borderWidth: 1.8
    }
});