import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, ToastAndroid, YellowBox, AsyncStorage, ActivityIndicator } from 'react-native';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import OrderSummaryCard from '../Components/OrderSummaryCard';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderActions from '../Store/Actions/OrdersAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Notifications } from 'expo';
import axios from 'axios';
import CustomerCard from '../Components/CustomerCard';
export default function OrderSummary(props) {
    console.disableYellowBox = true;
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
    YellowBox.ignoreWarnings(['Invalid prop ‘value’ of type ‘number’ supplied to ‘TextInput’,expected `string`']);
    const dispatch = useDispatch();
    const [cashToCollect, settCashToCollect] = useState('0');
    const cartData = useSelector(state => state.cart.cart);
    console.log(cartData);
    const id = props.navigation.getParam('id');
    console.log('CartData', cartData);
    const [customerData, setCustomerData] = useState([]);
    const cash = props.navigation.getParam('totalAmount');
    const q = props.navigation.getParam('quantity');
    const size = props.navigation.getParam('size');
    console.log('Q & S', q, size);
    const margin = props.navigation.getParam('margin');
    const [loading, setLoading] = useState(false);
    const [vendorname, setVendorName] = useState('');

    console.log('CUSTOmmeRS', customerData);
    const fetchCustomer = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://meridukan-api.herokuapp.com/customers/${id}`);
            console.log('Every Customer', response.data);
            setCustomerData([response.data]);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchCustomer();
    }, []);
    const fetchUser = async() => {
        try{
        const res = await axios.get('https://meridukan-api.herokuapp.com/users');
        const filteredUsers = res.data.filter(data => data.id === vendorId);
        setVendorName(filteredUsers[0].id);
        console.log('Filtered Userss',filteredUsers);
        Alert.alert(JSON.stringify(filteredUsers));
        }catch(e) {
           console.log(e);
        }
    };
    useEffect(() => {
        fetchUser();
    },[]);
    const d = new Date();
    const orderedData = [];
    const [getTok, setToken] = useState(null);
    const vendor = props.navigation.getParam('vendor');
    for (var a = 0; a < cartData.length; a++) {
        // console.log('looping Data',cartData[a].description)
        orderedData.push({ product: cartData[a].id, size: 'Medium', quantity: 1 });
    }
    let vendorName;
    let vendorId;
    for (var a = 0; a < cartData.length; a++) {
        // console.log('looping Data',cartData[a].description)
        vendorName = cartData[a].vendor.username;
        vendorId = cartData[a].vendor;
    }
    const resseller = AsyncStorage.getItem('Resseller').then(res => console.log('reseller', res)).catch(e => console.log(e));
    console.log('Vendor', vendorId);
    console.log('Customer', id);

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
    //         console.log('Reseller', resseller);
    //         const response = await axios.post('https://meridukan-api.herokuapp.com/Orders',
    //             {
    //                 status: 'Pending',
    //                 total_amount: cash,
    //                 customer: id,
    //                 ordered_products: orderedData,
    //                 margin_amount: margin,
    //                 delivery_charges: parseInt(100),
    //                 vendor: vendorId,
    //                 reseller: resseller
    //             });
    //         console.log(response.data);

    //     } catch (e) {
    //         Alert.alert(JSON.stringify(e));
    //         console.log(e);
    //         throw new Error(e.message);
    //     }
    // };
    const postDataToServer = async () => {
        try {
            const resseller = await AsyncStorage.getItem('Resseller');
            console.log(resseller);
            Alert.alert(JSON.stringify(resseller));
            const response = await axios.post('https://meridukan-api.herokuapp.com/Orders', {
                status: 'Pending',
                total_amount: cash,
                customer: id,
                ordered_products: orderedData,
                margin_amount: margin,
                delivery_charges: parseInt(100),
                vendor: vendorname,
                reseller: resseller
            });
            Alert.alert(JSON.stringify(response.data));
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };
    // const posting = async () => {
    //         const resseller = await AsyncStorage.getItem('Reseller');
    //         console.log(resseller);
    //         Alert.alert(JSON.stringify(resseller));
    //          await axios.post('https://meridukan-api.herokuapp.com/Orders', {
    //             status: 'Pending',
    //             total_amount: cash,
    //             customer: id,
    //             ordered_products: orderedData,
    //             margin_amount: margin,
    //             delivery_charges: parseInt(100),
    //             vendor: vendorId,
    //             reseller: resseller
    //         }).then(res => console.log(res)).catch(e => console.log(e));
    // };
    console.log('CUSTOMER_ID', id);
    console.log('VENDOR ID', vendor);
    // const getOrderedProducts = async() => {
    //     try {
    //         const OrderedProducts = await authedAxios.get(`/Products/${djd}`);
    //     }
    // }

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
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{parseInt(cash)} PKR</Text>

                    </View>
                </View>

                <View>
                    <FlatList
                        data={customerData}
                        key={item => item.id}
                        renderItem={itemData => (
                            <CustomerCard
                                total={cash}
                                name={itemData.item.name}
                                mobile={itemData.item.mobile}
                                street={itemData.item.street}
                                DC={parseInt(100)}
                                cash={parseInt(cash)}
                                margin={parseInt(margin)}
                                vendorName={itemData.item.name}
                            />
                        )}
                    />
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
                        Alert.alert('Sure?', `Are you sure you want to order with the total items, quantities and the total amount of ${parseInt(cash) + parseInt(100)} If you will press yes your order will be placed?`,
                            [{ text: 'No', onPress: () => { return } }, {
                                text: 'Yes,Order It', onPress: () => {
                                    // dispatch(OrderActions.addToOrder(name, pn,address,[], cashToCollect, d.getDate(), d.getMonth(), d.getFullYear(), d.getSeconds(), quantity));
                                    settCashToCollect(0);
                                    ToastAndroid.showWithGravity('Order Placed', ToastAndroid.LONG, ToastAndroid.CENTER);
                                    postDataToServer();
                                    props.navigation.navigate('OrderScreen');
                                }
                            }]);


                    }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
};
const styles = StyleSheet.create({
    marginBox: {
        width: '100%',
        height: 100,
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