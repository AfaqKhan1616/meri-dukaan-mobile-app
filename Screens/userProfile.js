import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";
export default function UserProfile(props) {
  console.disableYellowBox = true;
  const orders = useSelector((state) => state.order.orders);
  const [loading, setLoading] = useState(false);
  const [user, setUsername] = useState("");
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");
  const [orderCount, setOrderCount] = useState(0);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const favourites = useSelector((state) => state.fav.favourites);
  const cartedItems = useSelector((state) => state.cart.cart);
  const [userEmail, setUserEmail] = useState(null);
  const [useAddress, setUserAddress] = useState(null);
  const [username, setUserName] = useState(null);

  const gettingUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("UserData");
      console.log("userdata..................." + user);
      setUserEmail(user.email);
      setUserAddress(user.address);
      setUserName(user.username);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    gettingUserData();
  }, []);
  const gettingUser = async () => {
    const user = await AsyncStorage.getItem("LoggedInUsername");
    // const userData = await AsyncStorage.getItem("AccountData");
    const token = await AsyncStorage.getItem("jwt");
    setUsername(user);
    setToken(token);
    // setUserData(userData);
  };

  const gettingOrderCount = async () => {
    try {
      setLoading(true);
      const resseller = await AsyncStorage.getItem("Resseller");
      const orderCountResult = await axios.get(
        "https://meridukan-api.herokuapp.com/Orders"
      );
      const filterIt = orderCountResult.data.filter(
        (data) => data.reseller.id === resseller
      );
      setOrderCount(filterIt.length);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    gettingOrderCount();
  }, []);
  const logout = async () => {
    try {
      setLogoutLoading(true);
      const token = await AsyncStorage.getItem("jwt");
      const reseller = await AsyncStorage.getItem("Resseller");
      await AsyncStorage.removeItem("jwt");
      await AsyncStorage.removeItem("Resseller");
      props.navigation.navigate("Auth");
      setLogoutLoading(false);
    } catch (e) {
      Alert.alert(e);
    }
  };
  useEffect(() => {
    gettingUser();
  }, []);
  if (logoutLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <Text>Logging you out...</Text>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }
  // const useRole = AsyncStorage.getItem("userRole");
  // console.log(user);
  // console.log(user);
  // console.log(userID);
  // console.log(useRole);
  // if(loading) {
  //     return (
  //         <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#107dac'}}>
  //             <Text>Logging you out</Text>
  //             <ActivityIndicator color='white' size='large'/>
  //         </View>
  //     )
  // }
  const shortString = (name) => {
    const newStr = name.substr(0, 30);
    const charToReplace = newStr.charAt(0);
    const doneIt = charToReplace.replace(charToReplace, "");
    const concatenatedStr = newStr.concat(doneIt);
    return concatenatedStr;
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri:
            "https://webgradients.com/public/webgradients_png/076%20Premium%20Dark.png",
        }}
        style={{ height: "100%", width: "100%" }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            right: 10,
            top: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Logout?",
                "Do you really want to logout from meri-dukan?",
                [
                  { text: "no" },
                  {
                    text: "Yes",
                    onPress: () => {
                      logout();
                    },
                  },
                ]
              )
            }
          >
            <AntDesign name="setting" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              bottom: 50,
              borderColor: "white",
              borderWidth: 3,
              borderRadius: 360,
            }}
          >
            <Image
              source={{
                uri:
                  "https://365psd.com/images/istock/previews/1009/100996291-male-avatar-profile-picture-vector.jpg",
              }}
              style={{ width: 120, height: 120, borderRadius: 100 / 2 }}
            />
          </View>
          <View style={{ alignItems: "center", bottom: 40 }}>
            <Text
              style={{ fontSize: 18, color: "#107dac", fontWeight: "bold" }}
            >
              {shortString(JSON.stringify(user))}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              bottom: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "grey", fontWeight: "bold" }}>
              Orders
            </Text>
            <Text style={{ fontSize: 15, color: "grey", fontWeight: "bold" }}>
              Favourites
            </Text>
            <Text style={{ fontSize: 15, color: "grey", fontWeight: "bold" }}>
              Carted Items
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              bottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: "bold",
                right: 20,
              }}
            >
              {loading ? (
                <View style={{ width: 30, height: 30, right: 10, padding: 10 }}>
                  <ActivityIndicator size="small" color="blue" />
                </View>
              ) : (
                <Text>{orderCount}</Text>
              )}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: "bold",
                right: 20,
              }}
            >
              {favourites.length}
            </Text>
            <Text style={{ fontSize: 15, color: "black", fontWeight: "bold" }}>
              {cartedItems.length}
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width - 20,
              borderColor: "grey",
              borderWidth: 0.3,
              alignSelf: "center",
              top: 5,
            }}
          />

          <View
            style={{
              paddingLeft: 15,
              marginBottom: 15,
              top: 40,
              flexDirection: "column",
              alignItems: "flex-start",
              width: Dimensions.get("window").width - 40,
            }}
          >
            <Text
              style={{ color: "#107dac", fontWeight: "bold", fontSize: 17 }}
            >
              Email
            </Text>
            <Text style={{ color: "black", fontSize: 17 }}>
              Noman1616@gmail.com
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 15,
              marginBottom: 15,
              top: 40,
              flexDirection: "column",
              alignItems: "flex-start",
              width: Dimensions.get("window").width - 40,
            }}
          >
            <Text
              style={{ color: "#107dac", fontWeight: "bold", fontSize: 17 }}
            >
              Address
            </Text>
            <Text style={{ color: "black", fontSize: 17 }}>
              islamabad Pakistan
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 15,
              marginBottom: 15,
              top: 40,
              flexDirection: "column",
              alignItems: "flex-start",
              width: Dimensions.get("window").width - 40,
            }}
          >
            <Text
              style={{ color: "#107dac", fontWeight: "bold", fontSize: 17 }}
            >
              Contact
            </Text>
            <Text style={{ color: "black", fontSize: 17 }}>0311 5854271</Text>
          </View>
          <View
            style={{
              paddingLeft: 15,
              marginBottom: 15,
              top: 40,
              flexDirection: "column",
              alignItems: "flex-start",
              width: Dimensions.get("window").width - 40,
            }}
          >
            <Text
              style={{ color: "#107dac", fontWeight: "bold", fontSize: 17 }}
            >
              Role
            </Text>
            <Text style={{ color: "black", fontSize: 17 }}>Reseller</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    borderColor: "white",
    borderWidth: 1,
    top: Dimensions.get("window").height / 5,
    padding: 10,
  },
  modal: {
    width: "80%",
    height: 100,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 50,
    padding: 10,
  },
});
