import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import Header from "../Components/Header";
import CategoryCard from "../Components/CardForCategory";
import axios from "axios";
import {
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
const categoriesScreen = (props) => {
  const [collections, setCollections] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearchVal] = useState("");
  const [CollectionsInMemory, setCollectionsInMemory] = useState([]);
  // const fetchCollections = async () => {

  //     try {
  //         setLoading(true);
  //         const collections = await axios.get('https://meridukan-api.herokuapp.com/products');
  //         setCollections(collections.data);
  //         setLoading(false);
  //     } catch (e) {
  //         console.log(e)
  //     }
  // };
  // useEffect(() => {
  //     fetchCollections();
  // });
  const fetchCol = async () => {
    try {
      const response = await axios.get(
        "https://meridukan-api.herokuapp.com/collections"
      );
      setCollections(response.data);
      setCollectionsInMemory(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCol();
  }, []);
  const searchColl = (value) => {
    const filteredCol = CollectionsInMemory.filter((col) => {
      const colName = col.name.toLowerCase();
      let searchTermLowerCase = value.toLowerCase();
      return colName.indexOf(searchTermLowerCase) > -1;
    });
    setCollections(filteredCol);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#333333" }}>
      <Header />
      <View
        style={{
          width: "90%",
          backgroundColor: "white",
          height: 50,
          padding: 10,
          elevation: 15,
          borderRadius: 30,
          top: 20,
          left: 20,
        }}
      >
        <View
          style={{ flexDirection: "row", margin: 10, bottom: 15, padding: 10 }}
        >
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            style={{
              width: "100%",
              height: 50,
              bottom: 15,
              paddingLeft: 10,
            }}
            placeholder="Search Categories..."
            value={search}
            onChangeText={(sm) => setSearchVal(sm)}
            onEndEditing={() => searchColl(search)}
          />
        </View>
        <View style={{ alignSelf: "flex-end", bottom: 90 }}>
          <TouchableOpacity
            onPress={() => {
              setSearchVal("");
            }}
          >
            {search.length === 0 ? null : (
              <FontAwesome name="remove" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            top: Dimensions.get("window").height / 3,
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {loading ? (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "white" }}>Loading Collections...</Text>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <View style={{ alignSelf: "center", top: 30 }}>
              <FlatList
                data={collections}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) => (
                  <CategoryCard
                    type={itemData.item.name}
                    // img={itemData.item.products[0].pictures.url}
                    onGo={() => {
                      props.navigation.navigate("Home", {
                        title: itemData.item.name,
                        collectionId: itemData.item.id,
                      });
                    }}
                  />
                )}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  Banner: {
    width: "100%",
    height: 80,
    marginTop: 20,
    overflow: "hidden",
    backgroundColor: "black",
  },
});
export default categoriesScreen;
