import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
export default function OrdersCard (props) {
    return (
        <TouchableOpacity
        onPress={props.onDetails}
        >
        <View style={styles.card}>
            <View style={{
                flexDirection:'row',
                marginHorizontal:20
            }}> 
            <View style={{
                right:30,
                justifyContent:'center',
                alignItems:'center',
                alignSelf:'center',
                width: 50,
                height:'100%',
                bottom:2
            }}>
            {/* <Feather name="target" size={24} color="#398AD7" /> */}
            <MaterialIcons name="done" size={24} color="black" />
            </View>
            <View>
            <Text style={{fontSize:18,color:'black',right: 20,}}>{props.customer}</Text>
            <View>
            <Text style={{fontSize:16,color:'black',right:20,top:2}}>{props.address}</Text>
            <View style={{justifyContent:'flex-end',alignSelf:'flex-end',alignItems:'flex-end',left:150,bottom:10}}>
            <Text style={{fontSize:14,color:'black',alignSelf:'flex-end',top:18,right:100}}>{props.date}</Text>
            </View>
            </View>
            </View>
            </View>
        </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    card:{
        width:'90%',
        height:100,
        borderRadius:10,
        borderWidth:1,
        borderColor:'white',
        padding:15,
        margin:10,
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:'white',
        elevation:10
    }
});