import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, Text, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import OrdersCard from '../Components/OrdersCard';
import { useSelector } from 'react-redux';
import Header from '../Components/HeaderForCartAndFav';
import CategoryButton from '../Components/btnForOS';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
export default function Invoices(props) {
    //Configuring Axios with Auth
    // const [realToken, setRealToken] = useState(null);
    // const getAuthedAxios = async () => {
    //     try {
    //         setAgainLoad(true);
    //         const token = await AsyncStorage.getItem("jwt");
    //         setRealToken(token);
    //         setAgainLoad(false);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // useEffect(() => {
    //     getAuthedAxios();
    // });

    const [OrdersData, setOrdersData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    // const getOrdersFromServer = async () => {
    //     try {
    //         setRefresh(true);
    //         setLoading(true);
    //         const ressellerId = await AsyncStorage.getItem("Resseller");
    //         const response = await axios.get('https://meridukan-api.herokuapp.com/Orders');
    //         const orderss = response.data.filter(data => data.reseller === ressellerId);
    //         setOrdersData(orderss);
    //         setRefresh(false);
    //         setLoading(false);

    //     } catch (e) {
    //         Alert.alert(JSON.stringify(e));
    //         console.log(e);
    //     }
    // }
    // useEffect(() => {
    //    getOrdersFromServer();
    // });
    const getOrders = async () => {
        try {
         setRefresh(true);
         setLoading(true);
         const ressellerId = await AsyncStorage.getItem("Resseller");
         const response = await axios.get('https://meridukan-api.herokuapp.com/Orders');
         const completedOrders = response.data.filter(data => data.status === 'Completed');
         const fiOr = completedOrders.filter(fdata => fdata.reseller.id === ressellerId);
         setOrdersData(fiOr);
         setRefresh(false);
         setLoading(false);
        }catch (e) {
            Alert.alert(JSON.stringify(e));
            console.log(e);
        }
    };
    useEffect(() => {
        getOrders();
    },[]);
 
    return (
        <View style={{ flex: 1, backgroundColor: '#333333' }}>
            <Header
                title='Invoices'
            />
            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row', margin: 10 }}><Text style={{ fontWeight: 'bold', color: 'white' }}>loading Invoices..</Text><ActivityIndicator size='small' color='white' /></View> :
                OrdersData.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}><Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>No Invoice Found :( </Text></View> :
                    <View style={{top:10}}>
                    <FlatList
                        onRefresh={getOrders}
                        refreshing={refresh}
                        data={OrdersData}
                        keyExtractor={item => 'key' + item._id}
                        renderItem={itemData => (
                            <OrdersCard
                                customer={itemData.item.customer.name}
                                address={itemData.item.customer.city}
                                street={itemData.item.products}
                                date={itemData.item.createdAt}
                                onDetails={() => {
                                    props.navigation.navigate('InvoicesD', {
                                        id: itemData.item.id,
                                        customer: itemData.item.customer.name,
                                        cartItems: itemData.item.ordered_products,
                                        totalAmount: itemData.item.total_amount,
                                        date: itemData.item.createdAt,
                                        lastUpdate: itemData.item.updatedAt,
                                        year: itemData.item.year,
                                        status: itemData.item.status,
                                        quantity: itemData.item.quantity,
                                        marginAmount:itemData.item.margin_amount,
                                        vendor:itemData.item.vendor.username
                                    })
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
