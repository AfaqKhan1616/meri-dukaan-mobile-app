import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, ToastAndroid, YellowBox, AsyncStorage, ActivityIndicator } from 'react-native';
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

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#DCDCDC' }}>
            <View>    
                <View style={styles.customerDetails}>
                    <View style={{
                        padding: 10
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.cdtext}>Customer Name: </Text>
                            <Text style={styles.cdtext}>{props.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.cdtext}>Phone Number: </Text>
                            <Text style={styles.cdtext}>{props.mobile}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.cdtext}>Address: </Text>
                            <Text style={styles.cdtext}>{props.street}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.cdtext}>Delivery Charges: </Text>
                            <Text style={styles.cdtext}>{props.DC}PKR</Text>
                </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.cdtext}>Margin Earned: </Text>
                            <Text style={styles.cdtext}>{props.margin} PKR</Text>
                        </View> 
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.cdtext}>Product Supplier: </Text>
                            <Text style={styles.cdtext}>{props.vendorName}</Text>
                        </View>  */}
                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 0.8,
                                width: '100%',
                                top: 10
                            }}
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.cdtext}>Total Charges: </Text>
                            <Text style={styles.cdtext}>{props.cash} PKR</Text>
                        </View>
                    </View>
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
        color:'white'
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
        height: 280,
        backgroundColor: '#323232',
        elevation: 5,
        top: 10
    },
    cdtext: {
        fontSize: 16,
        color: 'white',
        padding: 5,
        fontWeight:'600'
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