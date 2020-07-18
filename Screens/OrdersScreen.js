import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, Text, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import OrdersCard from '../Components/OrdersCard';
import { useSelector } from 'react-redux';
import Header from '../Components/HeaderForCartAndFav';
import CategoryButton from '../Components/btnForOS';
import axios from 'axios';
import { set } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
export default function Orders(props) {
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
    const [pending,setPending] = useState(false);
    const [confirmed,setConfirmed] = useState(false);
    const [completed,setCompleted] = useState(false);
    const [Returned,setReturned] = useState(false);
    const [Delivered,setDelivered] = useState(false);
    const [Cancelled,setCancelled] = useState(false);
    console.log('--------------------------------------Order DATA==--------------------------',OrdersData);
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
         if(pending) {
            const orderss = response.data.filter(data => data.status === 'Pending');
            const fiOr = orderss.filter(fdata => fdata.reseller.id === ressellerId);
            setOrdersData([]);
            setOrdersData(fiOr);
         } else if(confirmed) {
            const orderss = response.data.filter(data => data.status === 'Confirmed');
            const fiOr = orderss.filter(fdata => fdata.reseller.id === ressellerId);
            setOrdersData([]);
            setOrdersData(fiOr);
         } else if (completed) {
            const orderss = response.data.filter(data => data.status === 'Completed');
            const fiOr = orderss.filter(fdata => fdata.reseller.id === ressellerId);
            setOrdersData([]);
            setOrdersData(fiOr);
        } else if(Returned) {
            const orderss = response.data.filter(data => data.status === 'Returned');
            const fiOr = orderss.filter(fdata => fdata.reseller.id === ressellerId);
            setOrdersData([]);
            setOrdersData(fiOr);
        } else if(Delivered) {
            const orderss = response.data.filter(data => data.status === 'Delivered');
            const fiOr = orderss.filter(fdata => fdata.reseller.id === ressellerId);
            setOrdersData([]);
            setOrdersData(fiOr);
        } else if(Cancelled) {
            const orderss = response.data.filter(data => data.status === 'Cancelled');
            const fiOr = orderss.filter(fdata => fdata.reseller.id === ressellerId);
            setOrdersData([]);
            setOrdersData(fiOr);
        } else {
            const fiOr = response.data.filter(fdata => fdata.reseller.id === ressellerId);
            setOrdersData([]);
            setOrdersData(fiOr);
            console.log(fiOr);
        }
         
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
   const pendingHandler = async() => {
       setPending(true);
       setConfirmed(false);
       setCompleted(false);
       setReturned(false);
       setDelivered(false);
       setCancelled(false);
       await getOrders();
   };
   const ConfirmedHandler = async() => {
    setPending(false);
    setConfirmed(true);
    setCompleted(false);
    setReturned(false);
    setDelivered(false);
    setCancelled(false);
    await getOrders();
};
const CompletedHandler = () => {
    setPending(false);
    setConfirmed(false);
    setCompleted(true);
    setReturned(false);
    setDelivered(false);
    setCancelled(false);
    getOrders();
    getOrders();
};
const ReturnedHandler = () => {
    setPending(false);
    setConfirmed(false);
    setCompleted(false);
    setReturned(true);
    setDelivered(false);
    setCancelled(false);
    getOrders();
    getOrders();
};
const DeliveredHandler = () => {
    setPending(false);
    setConfirmed(false);
    setCompleted(false);
    setReturned(false);
    setDelivered(true);
    setCancelled(false);
    getOrders();
    getOrders();
};
const CancelledHandler = () => {
    setPending(false);
    setConfirmed(false);
    setCompleted(false);
    setReturned(false);
    setDelivered(false);
    setCancelled(true);
    getOrders();
    getOrders();
};
    return (
        <View style={{ flex: 1, backgroundColor: '#333333' }}>
            <Header
                title='My Orders'
            />
            <View style={{top:10}}>
            <View style={{alignSelf:'center',flexDirection:'row'}}>
            <CategoryButton onP={pendingHandler} CategoryText='Pending' btnValue={pending}/>
            <CategoryButton onP={ConfirmedHandler} CategoryText='Confirmed' btnValue={confirmed}/>
            <CategoryButton onP={CompletedHandler} CategoryText='Completed' btnValue={completed}/>
            </View>
            <View style={{alignSelf:'center',flexDirection:'row'}}>
            <CategoryButton onP={ReturnedHandler} CategoryText='Returned' btnValue={Returned}/>
            <CategoryButton onP={DeliveredHandler} CategoryText='Delivered' btnValue={Delivered}/>
            <CategoryButton onP={CancelledHandler} CategoryText='Cancelled' btnValue={Cancelled}/>
            </View>
            </View>
            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row', margin: 10 }}><Text style={{ fontWeight: 'bold', color: 'white' }}>loading Orders..</Text><ActivityIndicator size='small' color='white' /></View> :
                OrdersData.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}><Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>No Order Found...</Text></View> :
                    <View style={{top:10,flex:1}}>
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
                                    props.navigation.navigate('OrderDetail', {
                                        id: itemData.item.id,
                                        customer: itemData.item.customer.name,
                                        cartItems: itemData.item.ordered_products,
                                        totalAmount: itemData.item.total_amount,
                                        date: itemData.item.createdAt,
                                        month: itemData.item.month,
                                        year: itemData.item.year,
                                        status: itemData.item.status,
                                        quantity: itemData.item.quantity,
                                        lastUpdate:itemData.item.last_update,
                                        
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
