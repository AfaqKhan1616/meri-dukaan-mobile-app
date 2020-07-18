import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, Dimensions, KeyboardAvoidingView, ImageBackground, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios';
import { MaterialIcons,MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const AuthScreen = (props) => {
    console.disableYellowBox = true;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [visiblePassword, setPasswordVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [focus, setFocus] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    // const onFinishRegistration = (values) => {
    //     console.log("Received values of form: ", values);
    //     // const { email, password, username } = values;
    //     setLoading(true);
    //     axios.post("https://meridukan-api.herokuapp.com/auth/local/register", {
    //         email: email,
    //         password: password,
    //         username: username,
    //         address: address,
    //         name: name,
    //         confirmed: "true",
    //     }).then((res) => {
    //         console.log(res);
    //          AsyncStorage.setItem('Resseller', res.data.user.id);
    //          AsyncStorage.setItem('LoggedInUsername', res.data.user.name);
    //         props.navigation.navigate('categories');
    //         setLoading(false);
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //             Alert.alert(JSON.stringify(error))
    //         });
    // };

    const onLog = () => {
        setLoading(true);
            const res = axios.post("https://meridukan-api.herokuapp.com/auth/local/register", {
                email: email,
                password: password,
                username: username,
                address: address,
                name: name,
                confirmed: "true",
            }).then(res=>{
                 AsyncStorage.setItem('Resseller', res.data.user.id);
                 AsyncStorage.setItem('LoggedInUsername', res.data.user.name);
                 props.navigation.navigate('categories');
                 setPassword('');
            }).catch(e=>console.log(e));     
            setLoading(false);    
    };
    return (
        <KeyboardAwareScrollView style={{flex:1}}>
            <View>
                <View>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 50,
                        top: 30,
                        left: 20
                    }}
                        onPress={() => props.navigation.navigate('main')}
                    >
                        <View>
                            <MaterialIcons name="navigate-before" size={40} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            top: 9,
                        }}>
                            <Text style={{
                                fontSize: 25
                            }}>Back</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    top: '10%',
                    left: 30
                }}>
                    <Text style={{
                        fontSize: 70,
                        color: '#333333',
                        fontFamily: 'Sacrem',
                    }}>Meri Dukan</Text>
                </View>
                <View style={{
                    left: 30,
                    top: 30,
                    marginVertical: 5
                }}>
                    <Text style={{
                        fontSize: 28
                    }}>Get Started</Text>
                </View>

                <View style={styles.BarStyling}>
                    <TextInput
                        value={username}
                        onChangeText={em => setUsername(em)}
                        placeholder='Username' placeholderTextColor="black"
                        style={styles.BarTIStyling} />
                    <AntDesign name="user" size={20} style={{ color: 'black', top: 10 }} />
                </View>
                <View style={styles.BarStyling}>
                    <TextInput
                        value={name}
                        onChangeText={em => setName(em)}
                        placeholder='Name' placeholderTextColor="black"
                        style={styles.BarTIStyling} />
                    <AntDesign name="user" size={20} style={{ color: 'black', top: 10 }} />
                </View>

                <View style={styles.BarStyling}>
                    <TextInput
                        value={email}
                        onChangeText={em => setEmail(em)}
                        placeholder='Email' placeholderTextColor="black"
                        style={styles.BarTIStyling} />
                    <MaterialCommunityIcons name="email-outline" size={24} color="black" />     
                             </View>

                <View style={styles.BarStyling}>
                    <TextInput
                        value={address}
                        onChangeText={em => setAddress(em)}
                        placeholder='Address' placeholderTextColor="black"
                        style={styles.BarTIStyling} />
                    <Feather name="map-pin" size={18} color="black" style={{ top: 10 }} />
                </View>
                <View style={styles.BarStyling}>
                    <TextInput placeholder='Password'
                        value={password}
                        onChangeText={ps => setPassword(ps)}
                        secureTextEntry={visiblePassword ? false : true}
                        placeholderTextColor="black"
                        style={styles.BarTIStyling} />
                    <AntDesign name="key" size={20} style={{ color: 'black', top: 10 }} onPress={() => {
                        setPasswordVisible(prev => !prev);
                    }} />
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.LoginBtn} onPress={onLog}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='smalls' color='white' />
                            </View> : <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', flexDirection: 'row', justifyContent: 'space-between', }}> Sign Up
          </Text>}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
};
const styles = StyleSheet.create({
    BarStyling: {
        height: 50,
        width: '80%',
        padding: 10,
        marginHorizontal: 15,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
        top: '10%',
        borderBottomColor: 'black',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderWidth: 1
    },
    BarTIStyling: {
        flex: 1,
    },
    LoginBtn: {
        backgroundColor: '#333333',
        borderColor: '#333333',
        borderWidth: 3,
        width: '80%',
        padding: 5,
        height: 50,
        margin: 5,
        borderRadius: 30,
        alignItems: 'center',
        paddingBottom:20

    },
    btnView: {
        flexDirection: 'column',
        alignItems: 'center',
        top:40,
        paddingBottom:40
    }

});
export default AuthScreen;