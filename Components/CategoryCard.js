import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
export default function CategoryCard({
  stockQuantity,
  productSupplier,
  goToDetails,
  Onshare,
  productTitle,
  ProductDescription,
  ProductPrice,
  productImage,
  Favourite,
  ToCart,
  key,
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={goToDetails}>
        <View style={styles.imgContainer}>
          {productImage === null || undefined ? (
            <Text>No Image </Text>
          ) : (
            <Image
              source={{
                uri: productImage === null || undefined ? "" : productImage,
              }}
              style={styles.img}
            />
          )}
        </View>
      </TouchableOpacity>
      <View style={{ width: Dimensions.get("window").width / 2 - 10 }}>
        <Text
          style={{ fontSize: 14, color: "black", left: 10, fontWeight: "bold" }}
        >
          {productTitle}
        </Text>
        <Text style={{ fontSize: 13, color: "grey", left: 10 }}>
          {ProductDescription}
        </Text>
        {stockQuantity === 0 ? (
          <Text style={{ fontSize: 13, color: "red", left: 10 }}>
            Out of stock!
          </Text>
        ) : (
          <Text style={{ fontSize: 13, color: "grey", left: 10 }}>
            Stock Quantity{stockQuantity}
          </Text>
        )}
        <Text
          style={{ fontSize: 15, color: "black", left: 10, fontWeight: "bold" }}
        >
          {ProductPrice}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          bottom: 4,
        }}
      >
        <TouchableOpacity onPress={Onshare}>
          <AntDesign
            name="sharealt"
            size={20}
            color="black"
            style={{
              margin: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={ToCart}>
          <AntDesign
            name="shoppingcart"
            size={20}
            color="black"
            style={{
              margin: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={Favourite}>
          <AntDesign
            name="heart"
            size={24}
            color="black"
            style={{ margin: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    height: 320,
    width: Dimensions.get("window").width / 2.1,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    elevation: 10,
    borderColor: "white",
    marginHorizontal: 5,
    marginVertical: 5,
    paddingBottom: 30,
    marginBottom: 10,
  },
  imgContainer: {
    width: "100%",
    height: 150,
  },
  img: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },
});
