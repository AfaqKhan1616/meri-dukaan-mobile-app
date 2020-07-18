import React, { useState } from 'react';
import { View, Text, StyleSheet,Image, StatusBar } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
export default function CommentBox(props) {
    const [search, setSearch] = useState('');
    return (
        <View style={{height:100}}>
        <ScrollView style={styles.card}>
            <View style={{
                flexDirection: 'row',
                marginHorizontal:20
            }}>
                <View>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100 / 2,
                            right:20,
                            top:10,
                        }}
                        source={{
                            uri: 'https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png'
                        }}
                    />
                </View>
                <View>
                    <View>
                    <Text>{JSON.stringify(props.email)}</Text>
                    </View>
                    <View style={{width:'200%'}}>
                    <Text style={{width:'100%'}}>{props.comment}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    card: {
        width: '95%',
        backgroundColor: 'white',
        elevation: 20,
        borderBottomWidth: 0.8,
        padding:10,
        borderRadius:30,
        alignSelf:'center',
        margin:10
    },
    btn: {
        borderColor: 'white',
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        top:10,
    },
    btnCon: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    img: {
        width: '50%',
        height: 43
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
