import React, { useState } from 'react';
import { View, TextInput, StyleSheet, StatusBar, Text } from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
const Header = props => {
    const [focus, setFocus] = useState(false);
    return (
        <View style={styles.header}>
            <View style={{
                top:20, flexDirection: 'row', paddingHorizontal: 10,
            }}>
                <View style={{top:5}}>
                    <Entypo name="shopping-bag" size={28} color="white" />
                </View>
                <Text style={{
                    color: 'white',
                    fontSize: 34,
                    fontFamily: 'Sacrem',
                    padding: 10,
                    bottom:10
                }}>Meri-dukan</Text>
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