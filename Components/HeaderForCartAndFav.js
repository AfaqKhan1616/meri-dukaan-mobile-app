import React, { useState } from 'react';
import { View, TextInput, StyleSheet, StatusBar, Text } from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
const Header = props => {
    const [focus, setFocus] = useState(false);
    return (
        <View style={styles.header}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{
                top:10, flexDirection: 'row', paddingHorizontal: 10,
            }}>
                <View style={{top:7}}>
                    <Entypo name="shopping-bag" size={28} color="white" />
                </View>
                <Text style={{
                    color: 'white',
                    fontSize:19 ,
                    padding: 10,
                    bottom:1
                }}>{props.title}</Text>
            </View>
            {props.children}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#323232',
        elevation: 100,
        // transform:[{rotate:80deg'}]
    },
    searchBar: {
        width: '80%',
        backgroundColor: 'white',
        opacity: 0.8,
        borderRadius: 50,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        width: '100%',
        height: 40,
        padding: 10,
        opacity: 0.8,
    }
});
export default Header;