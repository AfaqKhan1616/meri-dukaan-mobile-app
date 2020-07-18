import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  ToastAndroid,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  Button,
} from "react-native";
import axios from "axios";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
const AuthScreen = (props) => {
  console.disableYellowBox = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setPasswordVisible] = useState(false);
  const [focus, setFocus] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  // const validateUser = async() => {
  //     if(email.length < 2) {
  //         Alert.alert('Invalid Email pattern','Email should be greater than 2 digits atleast.');
  //         return;
  //     } else if (username.length < 3) {
  //         Alert.alert('Invalid Username pattern','Username should be greater than 3 digits atleast.');
  //         return;
  //     } else if(password.length < 3) {
  //         Alert.alert('Invalid Password pattern ','Password should be greater than 3 digits atleast.');
  //         return;
  //     }
  // }
  // function onFinishLogin(values){
  //     console.log("Received values of form: ", values);
  //     // const { email, password } = values;
  //     axios
  //         .post("https://meridukan-api.herokuapp.com/auth/local/", {
  //             identifier: email,
  //             password: password,
  //         })
  //         .then(async (res) => {
  //             setLoading(true);
  //             if (res.data.user.role.type === "public") {
  //                 // ToastAndroid.showWithGravity("Welcome " + LoggedInUsername + res.data.user.role.name, ToastAndroid.SHORT, ToastAndroid.CENTER);
  //                 // const token = res.data.jwt;
  //                 // console.log('Token IS', token);
  //                 // await AsyncStorage.setItem("jwt", token);
  //                 // await AsyncStorage.setItem("LoggedInUsername", LoggedInUsername);
  //                 // await AsyncStorage.setItem("userId", UserId);
  //                 // await AsyncStorage.setItem("userRole", role);
  //                 await AsyncStorage.setItem('Resseller', res.data.user.id);
  //                 setLoading(false);
  //                 props.navigation.navigate('categories');
  //                 //   window.location = "/";
  //             } else if (res.data.user.role.type === "admin") {
  //                 Alert.alert(JSON.stringify("Welcome " + res.data.user.role.name, 2.0))
  //                 const token = res.data.jwt;
  //                 // await AsyncStorage.setItem("jwt", token);
  //                 // await AsyncStorage.setItem("LoggedInUsername", LoggedInUsername);
  //                 // await AsyncStorage.setItem("userId", UserId);
  //                 // await AsyncStorage.setItem("userRole", role);
  //                 props.navigation.navigate('categories');
  //                 setLoading(false);
  //                 //   window.location = "/";
  //             } else {
  //                 console.log("Invalid Supplier Account!", 1.5);
  //                 setLoading(false);
  //             }
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //             Alert.alert(JSON.stringify(error));
  //             const status = error.status;
  //             if (status === 400) {
  //                 Alert.alert("The Email or Password is Incorrect! ", 2.0)
  //             } else if (status === 404) {
  //                 Alert.alert("This Account Doesn't Exist! ", 2.0)
  //                 Alert.alert(JSON.stringify(error));
  //             }
  //             setLoggedIn(false);
  //             // message.error(error.message);
  //         });
  // };
  // const onLog = async () => {
  //     try {
  //         setLoading(true);
  //         const res = await axios.post("https://meridukan-api.herokuapp.com/auth/local/", {
  //             identifier: email,
  //             password: password,
  //         });
  //         console.log(res.data);
  //         await AsyncStorage.setItem('Resseller', res.data.user.id);
  //         await AsyncStorage.setItem('LoggedInUsername', res.data.user.username);
  //         console.log(res.data.user.id);
  //         setLoading(false);
  //         props.navigation.navigate('categories');

  //     }
  //     catch (error) {
  //         Alert.alert(JSON.stringify(error));
  //         console.log(error);
  //         const status = error.status;
  //         if (status === 400) {
  //             Alert.alert("The Email or Password is Incorrect! ", 2.0)
  //         } else if (status === 404) {
  //             Alert.alert("This Account Doesn't Exist! ", 2.0)
  //             Alert.alert(JSON.stringify(error));
  //         }
  //         setLoggedIn(false);
  //         // message.error(error.message);
  //     };
  // };

  const onLog = () => {
    setLoading(true);
    const res = axios
      .post("https://meridukan-api.herokuapp.com/auth/local/", {
        identifier: email,
        password: password,
      })
      .then((res) => {
        console.log(AsyncStorage.setItem("Resseller", res.data.user.id));

        AsyncStorage.setItem("LoggedInUsername", res.data.user.username);
        const userD = AsyncStorage.setItem("UserData", res.data.user);
        console.log(userD);
        props.navigation.navigate("categories");
        setPassword("");
      })
      .catch((e) => console.log(e));
    setLoading(false);
  };
  return (
    <KeyboardAvoidingView behavior="height">
      <View>
        {/* <TextInput value={email} onChange={em => setEmail(em)} placeholder='Email..' style={{top:30}}/>
                <TextInput value={password} onChange={ps => setPassword(ps)} password='Password..' style={{top:40}}/>
                <View style={{top:40}}><Button title='press' onPress={() => onLog} style={{top:30}}/></View> */}
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              top: 30,
              left: 20,
            }}
            onPress={() => props.navigation.navigate("main")}
          >
            <View>
              <MaterialIcons name="navigate-before" size={40} />
            </View>
            <View
              style={{
                flexDirection: "row",
                top: 9,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                }}
              >
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            top: "10%",
            left: 30,
          }}
        >
          <Text
            style={{
              fontSize: 70,
              color: "#333333",
              fontFamily: "Sacrem",
            }}
          >
            Meri Dukan
          </Text>
        </View>
        <View
          style={{
            left: 30,
            top: 30,
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: 28,
            }}
          >
            Proceed With your
          </Text>
        </View>
        <View
          style={{
            left: 30,
            top: 30,
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </View>

        <View style={styles.BarStyling}>
          <TextInput
            value={email}
            onChangeText={(em) => setEmail(em)}
            placeholder="Email.."
            placeholderTextColor="black"
            style={styles.BarTIStyling}
          />
          <AntDesign
            name="user"
            size={20}
            style={{ color: "black", top: 10 }}
          />
        </View>
        <View style={styles.BarStyling}>
          <TextInput
            value={password}
            onChangeText={(m) => setPassword(m)}
            placeholder="Password.."
            secureTextEntry={visiblePassword ? false : true}
            placeholderTextColor="black"
            style={styles.BarTIStyling}
          />
          <AntDesign
            name="key"
            size={20}
            style={{ color: "black", top: 10 }}
            onPress={() => {
              setPasswordVisible((prev) => !prev);
            }}
          />
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.LoginBtn} onPress={onLog}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              {loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="smalls" color="white" />
                </View>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 25,
                    color: "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  LOG IN
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  BarStyling: {
    height: 50,
    width: "80%",
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
    top: "10%",
    borderBottomColor: "black",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderWidth: 1,
  },
  BarTIStyling: {
    flex: 1,
  },
  LoginBtn: {
    backgroundColor: "#333333",
    borderColor: "#333333",
    borderWidth: 3,
    width: "80%",
    padding: 5,
    height: 50,
    margin: 5,
    borderRadius: 30,
    alignItems: "center",
  },
  btnView: {
    flexDirection: "column",
    alignItems: "center",
    top: "10%",
  },
});
export default AuthScreen;
