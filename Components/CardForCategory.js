import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Dimensions,
} from "react-native";
import Header from "../Components/HeaderForcategories";
import { TouchableOpacity } from "react-native-gesture-handler";
const CardForCategory = (props) => {
  return (
    <TouchableOpacity onPress={props.onGo}>
      <View style={styles.card}>
        <View style={{ opacity: 0.9, width: "70%" }}>
          <Text
            style={{
              fontSize: 20,
              color: "#335353",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    // width: 100,
    // height: 150,
    // borderColor: "white",
    // marginHorizontal: 5,
    // paddingHorizontal: 5,
    // marginVertical: 6,
    // borderRadius: 10,
    // elevation: 10,
    // backgroundColor: "white",

    width: Dimensions.get("window").width / 2 - 20,
    height: 100,
    borderColor: "white",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
    marginVertical: 6,
    alignSelf: "center",
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
  },
});
export default CardForCategory;
