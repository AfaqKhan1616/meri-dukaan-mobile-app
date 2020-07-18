import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../Components/HeaderForCartAndFav';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderActions from '../Store/Actions/OrdersAction';
import axios from 'axios';
export default function AddAddress(props) {
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
    const [customers, setCustomers] = useState([]);
    const [fetchAccC, setFetchAccordingToPandC] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    // const cartData = props.navigation.getParam('cart');
    const cash = props.navigation.getParam('totalAmount');
    const margin = props.navigation.getParam('margin');
    const checkIfExists = async () => {
        try {
            const getCustomers = await axios.get('https://meridukan-api.herokuapp.com/customers');
            setCustomers(getCustomers.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        checkIfExists();
    }, []);
    const customer_Data = [];
    for (var c = 0; c < customers.length; c++) {
        customer_Data.push(customers[c].mobile)
    };

    // const CustomerAr = [];
    // for (var a = 0; a < customers.length; a++) {
    //     CustomerAr.push(customers[a].mobile);

    // };
    // Alert.alert(JSON.stringify(CustomerAr));
    // console.log(CustomerAr);

    const validateData = () => {
        //Validating Form
        if (customerName.length < 2 || customerName.length > 20) {
            Alert.alert('INVALID CUSTOMER NAME', 'The length of customer name should be between 2 - 20.');
            return;
        } else if (PhoneNumber.length < 2 || PhoneNumber.length > 14) {
            Alert.alert('INVALID PHONE NUMBER', 'The length of phone number should be between 3 - 14')
        } else if (FlatNo.length < 2 || FlatNo.length > 20) {
            Alert.alert('INVALID HOUSE NO:', 'The length of House number must be between 2 - 20')
        } else if (StreetColony.length < 2) {
            Alert.alert('INVALID STREET COLONY', 'The length of street name should be greater than 2 atleast')
        } else if (city.length < 2) {
            Alert.alert('INVALID CITY NAME', 'The length of city name should be greater than 2 atleast')
        } else if (state.length < 2) {
            Alert.alert('INVALID STATE NAME', 'The length of state name should be greater than 2 atleast')
        } else if (landmark.length < 2) {
            Alert.alert('INVALID LANDMARK', 'The length of landmark should be greater than 2 atleast')
        } else if (pincode.length < 2) {
            Alert.alert('INVALID PINCODE', 'The length of pincode should be greater than 2 atleast')
        }
    };
    const proceedFunc = async () => {
        try {
            validateData();
            setLoading(true);
                setLoading(true);
                const result = await axios.post('https://meridukan-api.herokuapp.com/customers', {
                    name: customerName,
                    mobile: PhoneNumber,
                    street: StreetColony,
                    address: FlatNo + landmark + city + state,
                    city: city,
                    state: state,
                    pin_code: pincode
                }
                );
                setCustomerId(null);
                setCustomerId(result.data.id);
                props.navigation.navigate('OrderSummary', {
                    // cart: cartData,
                    totalAmount: cash,
                    margin:margin,
                    id: result.data.id,
                });
                setLoading(false);
            setLoading(false);

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
    return (
        <View style={{ flex: 1, backgroundColor: '#323232' }}>
            <Header
                title='Add Address'
            />
            <KeyboardAwareScrollView>
                <View style={styles.mainScreen}>
                    <View style={styles.wrapper}>
                        <View style={styles.MainInputs}>
                            <Text style={styles.label}>CUSTOMER NAME</Text>
                            <TextInput style={styles.input} value={customerName} onChangeText={cn => setCustomerName(cn)} />
                            <Text style={styles.label}>PHONE NUMBER</Text>
                            <TextInput style={styles.input} keyboardType='phone-pad' value={PhoneNumber} onChangeText={pn => setPhoneNumber(pn)} />
                            <Text style={styles.label}>FLAT/HOUSE/BUILDING NO</Text>
                            <TextInput style={styles.input} value={FlatNo} onChangeText={fn => setFlatNo(fn)} />
                            <Text style={styles.label}>STREET COLONY</Text>
                            <TextInput style={styles.input} value={StreetColony} onChangeText={sc => setStreetColony(sc)} />
                        </View>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                top: 10
                            }}>
                                <View>
                                    <Text style={styles.twoInputLabel}>CITY</Text>
                                    <TextInput style={styles.twoInputStyle} value={city} onChangeText={c => setCity(c)} />
                                </View>
                                <View>
                                    <Text style={styles.twoInputLabel}>LANDMARK</Text>
                                    <TextInput style={styles.twoInputStyle} value={landmark} onChangeText={lm => setLandMark(lm)} />
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                top: 10
                            }}>
                                <View>
                                    <Text style={styles.twoInputLabel}>STATE</Text>
                                    <TextInput style={styles.twoInputStyle} value={state} onChangeText={s => setStateValue(s)} />
                                </View>
                                <View>
                                    <Text style={styles.twoInputLabel}>PINCODE</Text>
                                    <TextInput style={styles.twoInputStyle} value={pincode} onChangeText={pc => setPincode(pc)} />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.proceedBtn} onPress={proceedFunc}>
                            {loading ? <View style={{ justifyContent: 'center', alignItems: "center", alignSelf: 'center' }}><ActivityIndicator size='small' color='black' /></View> : <Text style={styles.proceedBtnText}>Proceed</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        paddingVertical: 10
    },
    input: {
        width: '95%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 14,
        paddingLeft: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    label: {
        fontSize: 15,
        marginHorizontal: 10,
        marginTop: 15,
        color: 'white',
        fontWeight: '200',
    },
    twoInputStyle: {
        width: 150,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        margin: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    twoInputLabel: {
        fontSize: 15,
        top: 10,
        color: 'white',
        marginHorizontal: 10,
        fontWeight: '200'

    },
    proceedBtn: {
        width: '95%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        alignSelf: 'center',
        marginBottom: 5
    },
    proceedBtnText: {
        fontSize: 20,
        color: '#323232',
        fontWeight: 'bold'
    }
});