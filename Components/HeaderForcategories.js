import React, { useState } from 'react';
import { View, TextInput, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
const HeaderForCategories = props => {
    const [focus, setFocus] = useState(false);
    return (
        <View style={styles.header}>
            <View style={{ top: StatusBar.currentHeight - 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View>
                    <TouchableOpacity onPress={props.onOpenDrawer}>
                        <Entypo name="shopping-bag" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                {/*ICON*/}
                <View style={[styles.searchBar, {
                    borderColor: focus ? 'white' : 'white',
                    borderWidth: focus ? 2 : 0.5
                }]}>
                    <View style={{
                        flexDirection: 'row',
                        alignSelf:'center'
                    }}>

                        <View style={{ alignSelf: 'center', alignItems: 'center', left: focus ? 20 : props.value.length >= 1 ? 20 : 110 }}>
                            <Ionicons name="ios-search" size={20} color="black" />
                        </View>
                        <TextInput
                            placeholder='Search'
                            style={[styles.searchInput, {
                                alignSelf: focus ? 'flex-start' : 'center',
                                paddingLeft: focus ? 30 : props.value.length >=1 ?30 : 0,
                                textAlign: focus ? 'left' : props.value.length >= 1 ? 'left' : 'center'
                            }]}
                            placeholderTextColor='black'
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            value={props.value}
                            onChangeText={props.onChanging}
                            onSubmitEditing={props.onsubmit}
                            editable={props.loading ? true : false}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity onPress={props.goCart}>
                        <View style={{
                            width: 25,
                            height: 25,
                            borderRadius: 25 / 2,
                            backgroundColor: 'white',
                            zIndex: 2000,
                            top:5,
                            right:5,
                            opacity:0.9,
                            alignItems:'center'
                        }}>
                            <Text style={{ color: 'white', textAlign: 'center',color:'black',fontWeight:'bold',top:2}}>{props.length}</Text>
                        </View>
                        <AntDesign name="shoppingcart" size={28} color="white" style={{bottom:30}}/>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'center',
        bottom:15
    },
    searchInput: {
        width: '100%',
        height: 40,
        padding: 10,
        opacity: 0.8,
    }
});
export default HeaderForCategories;