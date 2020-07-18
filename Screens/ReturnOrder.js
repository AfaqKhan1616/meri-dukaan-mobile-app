import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity, FlatList, ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../Components/HeaderForCartAndFav';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderActions from '../Store/Actions/OrdersAction';
import OrderSummaryCard from '../Components/OrderSummaryCard';
import axios from 'axios';
export default function ReturnOrder(props) {
    console.disableYellowBox = true;
    const [customerName, setCustomerName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [FlatNo, setFlatNo] = useState('');
    const [StreetColony, setStreetColony] = useState('');
    const [city, setCity] = useState('');
    const [state, setStateValue] = useState('');
    const [landmark, setLandMark] = useState('');
    const [pincode, setPincode] = useState('');
    const [loading, setLoading] = useState(false);
    const [showMore,setShowMore] = useState(false);
    const [orderedData,setOrderedData] = useState([]);
    // const cartData = props.navigation.getParam('cart');
    const total = props.navigation.getParam('total');
    const customer = props.navigation.getParam('customer');
    const ID = props.navigation.getParam('id');
    const date = props.navigation.getParam('date');
    // const ar = [];
    // for (var a = 0; a < cartData.length; a++) {
    //     ar.push(cartData[a].description);
    //     Alert.alert(ar);
    // };
    const proceedFunc = async () => {
        try {
            setLoading(true);
            const result = await axios.post('https://meridukan-api.herokuapp.com/customers', {
                name: customerName,
                mobile: PhoneNumber,
                street: StreetColony,
                address: landmark,
                city: city,
                state: state,
                pin_code: pincode
            }
            );
            setLoading(false);
            props.navigation.navigate('OrderSummary', {
                // cart: cartData,
                totalAmount: total,
                name: customerName,
                pn: PhoneNumber,
                Address: FlatNo,
                city: city,
                quantity: quantity,
                state: state,
                landmark: landmark,
                pincode: pincode,
                customer_id: result.data.id
            });
            setCustomerName('');
            setPhoneNumber('');
            setFlatNo('');
            setStreetColony('');
            setCity('');
            setStateValue('');
            setLandMark('');
            setPincode('');
        } catch (e) {
            console.log(e);
        }
    };
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
    return (
        <View style={{ flex: 1}}>
            <Header
                title='Return Order'
            >
               <TouchableNativeFeedback onPress={() => {Alert.alert('Return.',` ${customer} Are you sure you want to return your order.`)}} style={{right:20,top:15}}>
                   <Text style={{color:'white',fontWeight:'bold',fontSize:18,top:7}}>Done</Text>
               </TouchableNativeFeedback>
            </Header>
            <ScrollView style={{overflow:'hidden'}}>
             <View style={{padding:10,paddingBottom:20,height:Dimensions.get('window').height}}>
                <View style={[styles.ReturnCard,{
                    height:showMore ? 380 : 150
                }]}>
                    <View style={styles.alignIt}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Order Id</Text>
                        <Text style={{fontSize:15,fontWeight:'500',color:'grey'}}>{ID}</Text>
                    </View>
                    <View style={styles.alignIt}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Total Amount</Text>
                    <Text style={{fontSize:18,fontWeight:'500',color:'grey'}}>{total} PKR</Text>
                    </View>
                    <View style={styles.alignIt}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Customer</Text>
                    <Text style={{fontSize:18,fontWeight:'500',color:'grey'}}>{customer}</Text>
                    </View>
                    
                    {showMore ? 
                    <View>
                    <View style={styles.alignIt}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Ordered on</Text>
                    <Text style={{fontSize:14,fontWeight:'500',color:'grey'}}>{date}</Text>
                    </View>
                    <View style={{height:200,backgroundColor:'white',overflow: 'hidden',}}>
                        <Text style={{fontSize:18,fontWeight:'bold',color:'black',left:5}}>Products you ordered:   {orderedData.length}</Text>
                         <FlatList
                         showsVerticalScrollIndicator={false}
                            data={orderedData}
                            keyExtractor={(item, index) => item.id}
                            renderItem={itemData => (
                                <OrderSummaryCard
                                    // image={itemData.item.}
                                    title={itemData.item.product.title}
                                    Description={itemData.item.product.description}
                                    Price={itemData.item.product.price}
                                    quantity={itemData.item.quantity}
                                />
                            )}
                        />
                        </View>
                        </View>
                     : null}
                    <View style={{alignSelf:'flex-end',top:10,right:10}}>
                        <TouchableOpacity onPress={() => setShowMore(prev => !prev)}>
                            {showMore ? <Text style={{fontSize:16,color:'blue',fontWeight:'bold'}}>Show less</Text> : <Text style={{fontSize:16,color:'blue',fontWeight:'bold'}}>Show More</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.Container}>
                    <View style={{alignSelf:'center',top:10}}>
                    <Text style={{
                        color:'black',
                        fontWeight:'bold',
                        fontSize:20,
                        left:10
                    }}>Details:</Text>
                    <TextInput
                    style={{fontSize:14,height:150,borderColor:'grey',borderWidth:1,width:'80%',bottom:10,textAlignVertical:'top',padding:10,paddingTop:10,paddingRight:10,paddingLeft:10,top:10,borderRadius:20}}
                    placeholder='Write here why do you want to return this order?'
                    placeholderTextColor='grey'
                    />
                    </View>
                </View>
                </View>
                </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
  ReturnCard:{
      width:'93%',
      borderRadius:20,
      borderWidth:1,
      borderColor:'white',
      backgroundColor:'white',
      elevation:10,
      height:230,
      padding:10,
      alignSelf:'center',
      top:10,
  },
  alignIt:{
      flexDirection:'row',
      justifyContent:'space-between',
      padding:5
  },
  Container:{
      width:'90%',
      justifyContent:'center',
      alignSelf:'center',
      top:10
  }
});