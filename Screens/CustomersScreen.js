import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, Text, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import OrdersCard from '../Components/OrdersCard';
import { useSelector } from 'react-redux';
import Header from '../Components/HeaderForCartAndFav';
import CategoryButton from '../Components/btnForOS';
import axios from 'axios';
import { AntDesign,FontAwesome } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
export default function customers(props) {
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
    const quantity = props.navigation.getParam('quantity');
    const size = props.navigation.getParam('size');
    const [customers, setCustomersData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const [search,setSearchVal] = useState('');
    const [CustomersInMemory,setCustomersInMemory] = useState(null);

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
    const getCustomers = async () => {
        try {
            setRefresh(true);
            setLoading(true);
            const response = await axios.get('https://meridukan-api.herokuapp.com/customers');
            console.log('CUSTOMERS ALL',response.data);
            setCustomersData(response.data);
            setCustomersInMemory(response.data);
            setRefresh(false);
            setLoading(false);
        } catch (e) {
            Alert.alert(JSON.stringify(e));
            console.log(e);
        }
    };
    useEffect(() => {
        getCustomers();
    }, []);
    const searchProducts = value => {
        const filteredCustomers = CustomersInMemory.filter(
          searchval => {
            const customersName = (searchval.name).toLowerCase();
            let searchTermLowerCase = value.toLowerCase();
            return customersName.indexOf(searchTermLowerCase) > -1
          }
        )
        setCustomersData(filteredCustomers);
      };
      const cash = props.navigation.getParam('cash');
      const margin = props.navigation.getParam('margin');

    return (
        <View style={{ flex: 1, backgroundColor: '#333333' }}>
            {searchBar ?
                <View style={{
                    width: '100%',
                    backgroundColor: 'white',
                    height: 50,
                    padding: 10,
                    elevation:15
                }}>
                    <View style={{flexDirection:'row',margin:10,bottom:15,padding:10}}>
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput style={{
                        width: '100%',
                        height: 50,
                        bottom:15,
                        paddingLeft:10
                    }} placeholder='Search Customers...' value={search} onChangeText={sm => setSearchVal(sm)} onEndEditing={() => searchProducts(search)}/>
                </View>
                <View style={{alignSelf:'flex-end',bottom:90}}>
                    <TouchableOpacity onPress={() => {
                        setSearchBar(false);
                    }}> 
                <FontAwesome name="remove" size={24} color="black" />
                </TouchableOpacity>
                </View>
                <View>
                    
                </View>
                </View>
                : <Header
                    title='Customers'
                >
                    <View style={{ alignSelf: 'flex-end', right: 5, top: 5}}>
                        <View style={{
                            flexDirection:'row',
                            paddingBottom:10,
                            margin:10
                        }}>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('sure?','Do you want to create a new customer for this order?',[{text:'No'},{text:'Yes',onPress:() => {
                                props.navigation.navigate('AddAddress',{
                                    totalAmount: cash,
                                    margin:margin
                                })
                            }}]);
                        }}>
                            <AntDesign name="plus" size={24} color="white" style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSearchBar(true);
                        }}>
                            <AntDesign name="search1" size={24} color="white" />
                        </TouchableOpacity>
                        </View>
                    </View>
                </Header>}
            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row', margin: 10 }}><Text style={{ fontWeight: 'bold', color: 'white' }}>loading Customers..</Text><ActivityIndicator size='small' color='white' /></View> :
                customers.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}><Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>No Invoice Found :( </Text></View> :
                    <View style={{ top: 10 }}>
                        <FlatList
                            onRefresh={getCustomers}
                            refreshing={refresh}
                            data={customers}
                            keyExtractor={item => 'key' + item._id}
                            renderItem={itemData => (
                                <OrdersCard
                                    customer={itemData.item.name}
                                    address={itemData.item.street}
                                    date={itemData.item.createdAt}
                                    onDetails={() => {
                                        Alert.alert('Are you sure?','Do you really want to create a order with this customer?',
                                        [{text:'No'},{text:'Yes',onPress:() => {
                                            props.navigation.navigate('OrderSummary', {
                                                id: itemData.item.id,
                                                totalAmount: cash,
                                                margin:margin,
                                                quantity:quantity,
                                                size:size
                                            })
                                        }}]
                                        )
                                        
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
