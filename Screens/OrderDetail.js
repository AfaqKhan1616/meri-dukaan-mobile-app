import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Modal, TouchableOpacity, Dimensions, ToastAndroid, ActivityIndicator, YellowBox ,AsyncStorage} from 'react-native';
import Header from '../Components/HeaderForCartAndFav';
import { FlatList, TextInput, ScrollView } from 'react-native-gesture-handler';
import OrderSummaryCard from '../Components/OrderSummaryCard';
import HeaderForCartAndFav from '../Components/HeaderForCartAndFav';
import { MaterialIcons,Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderActions from '../Store/Actions/OrdersAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
export default function OrderDetail(props) {
    const[userName,setUserName] = useState('');
    const accessingUser = async() => {
        const user = await AsyncStorage.getItem('LoggedInUsername');
        setUserName(user);
    };
    useEffect(() => {
        accessingUser();
    },[]);

        // const cart = props.navigation.getParam('cartItems');
        YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
        const cartData = useSelector(state => state.cart.cart);
        const customer = props.navigation.getParam('customer');
        const total = props.navigation.getParam('totalAmount');
        const date = props.navigation.getParam('date');
        const month = props.navigation.getParam('month');
        const year = props.navigation.getParam('year');
        const status = props.navigation.getParam('status');
        const quantity = props.navigation.getParam('quantity');
        const [visible, setVisible] = useState(false);
        const dispatch = useDispatch();
        const ID = props.navigation.getParam('id');
        const [orderedData, setOrderedData] = useState([]);
        const [loading, setLoading] = useState(false);
    console.disableYellowBox = true;
    ///Push Notifications
    const [pushToken, setPushToken] = useState('');
    const [notification, setNotification] = useState({});
    const [orderCancelled,setOrderCancelled] = useState(false);
    const registerForPushNotification = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        setPushToken(token);


        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    }
    useEffect(() => {
        registerForPushNotification();
        const notificationSubscription = Notifications.addListener(_handleNotification);
    },[]);
    const _handleNotification = notification => {
        // Vibration.vibrate(1,1,false);
        setNotification(notification);
    };
    const sendPushNotification = async () => {
        let response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(status === 'Confirmed' ? bodyForConfirmed : status === 'Delivered' ? bodyForDelivered:orderCancelled?bodyForOrderedCancelled:null)
        })
    }
    const bodyForConfirmed = {
        to:pushToken,
        sound:'default',
        title:`Order Confirmed 😃`,
        body:`Dear Customer ${JSON.stringify(userName)}! Your ordered item ID: ${ID} has been confirmed!`
    };
    const bodyForDelivered = { 
        to:pushToken,
        sound:'default',
        title:'🎉Order Delivered 🥳',
        body:`Dear customer ${JSON.stringify(userName)}! How did you find our product, Dont forget to review us! Thanks,Love,Meri-dukan`
    };
    const bodyForOrderedCancelled = {
        to: pushToken,
        sound: 'default',
        title: 'Ordered Cancelled 😢',
        body: `Dear customer ${JSON.stringify(userName)}! We are sad to know that you have cancelled the order! If you have found anything not perfect you can surely send complain via contacts! Thanks , Love , Meri-dukan`
    }
    useEffect(() => {
        const NotifyUsers = async() => {
        if(status === 'Confirmed') {
            await sendPushNotification();
        }else if(orderCancelled) {
            await sendPushNotification();
        }else if(status === 'Delivered') {
            await sendPushNotification();
        } else {
            return;
        }
    }
    NotifyUsers();
    },[status]);



    const cancelOrder = async () => {
        try {
            await axios.delete(`https://meridukan-api.herokuapp.com/Orders/${ID}`);
        } catch (e) {
            throw new Error(e.message);
        };
    };
    useEffect(() => {
        if (status === 'Delivered') {
            Alert.alert('Hurraayyy!', 'How did you find your order? Dont forget to review us! If you still havent recieved your order contact us. And If you will press order recieved your order will be deleted from this screen.!!', [{ text: 'Not recieved :(' }, { text: 'Yes,I have recieved :)',onPress:() => {
                cancelOrder();
                props.navigation.goBack();
            }}])
        };
    },[]);
    const fetchingProductsFromOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://meridukan-api.herokuapp.com/Orders/${ID}`);
            setOrderedData(response.data.ordered_products);
            setLoading(false);
        } catch (e) {
            throw new Error(e.message);
        }
    };
    useEffect(() => {
        fetchingProductsFromOrder();
    },[]);
    const returnOrderHandler = async() => {
        try{
         const response = axios.put(`https://meridukan-api.herokuapp.com/Orders/${ID}`,{
             status:'Returned'
         });
         ToastAndroid.showWithGravity('Your return request has been submitted',ToastAndroid.SHORT,ToastAndroid.CENTER)
         console.log(response.data);
        }catch(e) {
         console.log(e);
        }
    };
    return (
        <View style={{ flex: 1, opacity: visible ? 0.5 : 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false);
                }}
            >
                <View style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#323232',
                    width: '90%',
                    height: '60%',
                    elevation: 400,
                    borderRadius: 10,
                    top: Dimensions.get('window').width / 3,
                    alignItems: 'center'
                }}>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', width: 300, top: 30 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center',color:'white'}}>ORDER CANCELLATION</Text>
                        <Text style={{ fontSize: 17, left: 5, top: 10,color:'white' }}>Wouldn't you mind to share why you have cancelled this order?</Text>
                    </View>
                    <View style={{ top: 50 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', top: 10,color:'white'}}>Share Details.</Text>
                        <TextInput
                            style={{color:'white',textAlignVertical: 'top', width: 300, top: 20, height: '50%', padding: 10, borderColor: 'grey', borderWidth: 1 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={() => {
                            setVisible(false);
                        }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.DoneBtn} onPress={() => {
                            Alert.alert('Sure?', 'Do you really want to cancel this order?',
                                [{ text: 'No' }, {
                                    text: 'Yes,Cancel It', onPress: () => {
                                        props.navigation.goBack();
                                        dispatch(OrderActions.cancelOrder(ID));
                                        ToastAndroid.showWithGravity('Order Cancelled!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                                        setOrderCancelled(true);
                                        cancelOrder();
                                    }
                                }]
                            );
                            setVisible(false);
                        }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Done</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            <HeaderForCartAndFav
                title={`${customer}'s Order`}
            >
           { status === 'Pending' || status === 'Delivered'?  <TouchableOpacity
                    onPress={() => {
                        if(status === 'Delivered') {
                            returnOrderHandler();
                        } else if (status === 'Pending') {
                            setVisible(true);
                        }
                    }  
                    }
                    style={{
                        backgroundColor: 'white',
                        width: 100,
                        height: 40,
                        padding: 10,
                        borderColor: 'white',
                        borderWidth: 1,
                        borderRadius: 5,
                        right:5,
                        top:10,
                        flexDirection:'row',
                        alignSelf:'flex-end'
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bottom: 3
                    }}>
                        {status==='Delivered' ?<Ionicons name="ios-return-right" size={24} color="black" />:<MaterialIcons name="cancel" size={24} color="black" />}
                        <Text style={{fontSize:17,left:5}}>{status === 'Delivered' ? 'Return' : 'Cancel' }</Text>
                    </View>
                </TouchableOpacity> : null}
            </HeaderForCartAndFav>
            <View style={styles.totalAmount}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 20
                }}>

                    <Text style={{ color: 'grey', fontSize: 16 }}>Amount you have to pay</Text>
                    <Text style={{ color: 'green', fontSize: 18 }}>{total} PKR</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20
            }}>

                <Text style={{ color: 'grey', fontSize: 16 }}>Order Status</Text>
                <Text style={{ color: 'green', fontSize: 18 }}>{status}</Text>
            </View>
            <View style={styles.totalAmount}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 20
                }}>
                    <Text style={{ color: 'grey', fontSize: 16 }}>Order placed on</Text>
                    <Text style={{ color: 'green', fontSize: 14 }}>{date}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20
            }}>
                <Text style={{ color: 'grey', fontSize: 16 }}>Order Id:</Text>
                <Text style={{ color: 'green', fontSize: 14 }}>{ID}</Text>
            </View>
            <ScrollView>
                <View style={styles.cart}>
                    <Text style={{ padding: 10, fontWeight: 'bold' }}>Products you have ordered: </Text>
                    {loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', top: 80 }}>
                            <ActivityIndicator size='large' color='#2F66A9' />
                        </View>
                        :

                        <FlatList
                            data={orderedData}
                            keyExtractor={(item, index) => item.id}
                            renderItem={itemData => (
                                <OrderSummaryCard
                                    // image={itemData.item.pictures.url}
                                    title={itemData.item.product.title}
                                    Description={itemData.item.product.description}
                                    Price={itemData.item.product.price}
                                    quantity={itemData.item.quantity}
                                />
                            )}
                        />
                    }
                </View>
                {status === 'Confirmed' ? 
                <View>
                    <TouchableOpacity style={styles.returnOrderBtn} onPress={() => {
                        props.navigation.navigate('ReturnOrder',{
                            id:ID,
                            total:total,
                            customer:customer,
                            date:date
                        })
                    }}>
                        <Text style={{fontSize:16,color:'white',textAlign:'center'}}>Return Order</Text>
                    </TouchableOpacity>
                    </View> 
                    :  null   
            }
            </ScrollView>
            {/* <View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color:'white'}}>My Order is delivered!</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
};
const styles = StyleSheet.create({
    totalAmount: {
        width: '100%',
        backgroundColor: 'white',
        height: 60,
    },
    cart: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        top: 10,
        elevation: 20,
    },
    btn: {
        width: '90%',
        height: 40,
        backgroundColor: '#2F66A9',
        borderColor: '#2F66A9',
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        top: 20
    },
    cancelBtn: {
        backgroundColor: '#ff0080',
        width: 110,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10
    },
    DoneBtn: {
        backgroundColor: '#00ff80',
        width: 110,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10
    },
    returnOrderBtn:{
        width:'90%',
        height:30,
        backgroundColor:'#2F66A9',
        borderColor:'#2F66A9',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:30,
        padding:20,
        marginBottom:10,
        top:10
        
    }

});