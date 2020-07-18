import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, CheckBox, StatusBar, Share, Alert, Button, CameraRoll, Picker, Modal, TouchableOpacity, FlatList, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../Components/HeaderForcategories';
import CategoryButton from '../Components/CategoryButton';
import { Ionicons, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import CategoryCard from '../Components/CategoryCard';
import { useDispatch } from 'react-redux';
import * as ToCartActions from '../Store/Actions/AddToCartAction';
import * as ToFavActions from '../Store/Actions/AddToFavouriteAction';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';
export default function HomeScreen(props) {
  console.disableYellowBox = true;
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart.cart);
  // const productsFromCollections = props.navigation.getParam('products');
  const titleOfC = props.navigation.getParam('title');
  const collectionId = props.navigation.getParam('id');
  const [lowTOHigh, setLowToHigh] = useState(false);
  const [collections, setCollections] = useState(false);
  const [HighToLow, setHighToLow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [ProductsInMemory, setProductsInMemory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [imgUri, setUri] = useState(null);
  const [titleOFC, setTitleOfC] = useState(titleOfC);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const arr = [];
  for (var a = 0; a < cartData.length; a++) {
    arr.push(cartData[a].vendor.username);
  }
  const ids = [];
  for (var a = 0; a < cartData.length; a++) {
    ids.push(cartData[a].id);
  };
  const API_URL = `https://meridukan-api.herokuapp.com/collections`;


  const image_source = 'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg';
  const image_title = 'Picturess';
  const cid = props.navigation.getParam('collectionId');


  const fetchingProducts = async () => {
    try {
      setRefresh(true);
      setLoading(true);
        const response = await axios.get(`https://meridukan-api.herokuapp.com/collections/${cid}`);
        setLoading(false);
        setProducts(response.data.products);
        setProductsInMemory(response.data.products);
        setRefresh(false);
    } catch (e) {
      Alert.alert(e)
    }
  };
  useEffect(() => {
    fetchingProducts();
  },[]);

  // const loadDataOnPress = async () => {
  //   setLoading(true);
  //   const result = await axios.get(`https://meridukan-api.herokuapp.com/collections/${itemData.item.id}`)
  //   const fetchedProducts = result.data.products;
  //   setProducts(fetchedProducts);
  //   setLoading(false);
  // };
  const sortHighToLow = () => {
    setModalVisible(false);
    setHighToLow(true);
  };

  const sortLowToHigh = () => {
    setModalVisible(false);
    setLowToHigh(true);
    setHighToLow(false);
  };
  const searchProducts = value => {
    const filteredProducts = ProductsInMemory.filter(
      product => {
        const productTitle = (product.title).toLowerCase();
        let searchTermLowerCase = value.toLowerCase();
        return productTitle.indexOf(searchTermLowerCase) > -1
      }
    )
    setProducts(filteredProducts);
  };
  // const share = async (title, description, vendor, img) => {
  //   try {
  //     const res = await FileSystem.downloadAsync(img, FileSystem.documentDirectory + '.jpeg');
  //     setUri({ localUri: res.uri });
  //     await Sharing.shareAsync(imgUri.localUri);
  //     const result = await Share.share({
  //       message: title + '|' + description + '|' + vendor + ' Powered By : MERI-DUKAN'
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //         // Alert.alert(result);
  //       } else {
  //         // shared
  //         // Alert.alert(result);
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  // const fetchCollections = async () => {
  //   try {
  //     const collections = await axios.get('https://meridukan-api.herokuapp.com/collections');
  //     setCollections(collections.data);
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };
  // useEffect(() => {
  //   fetchCollections();
  // });
  const shortString = (description) => {
    const newStr = description.substr(0, 40);
    const charToReplace = newStr.charAt(9);
    const doneIt = charToReplace.replace(charToReplace, ' ...');
    const concatenatedStr = newStr.concat(doneIt);
    return concatenatedStr;
  }


  return (
    <View style={{ flex: 1, opacity: modalVisible ? 0.2 : 1, backgroundColor: '#333333' }}>
      <StatusBar barStyle='light-content' style={{ color: 'grey' }} />
      <Header
        goCart={() => {
          props.navigation.navigate('Cart')
        }}
        length={cartData.length}
        onOpenDrawer={() => {
          props.navigation.toggleDrawer();
        }}
        value={searchValue}
        onChanging={sv => setSearchValue(sv)}
        onsubmit={() => searchProducts(searchValue)}
        loading={!loading}
      />
      <View>
        <View style={{ top: 10 }}>
          {/* <FlatList
            horizontal
            data={collections}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <CategoryButton
                  CategoryText={itemData.item.name}
                  onP={() => {
                    Alert.alert(JSON.stringify(itemData.item.products));
                    setLoading(true);
                    setTitleOfC(itemData.item.name);
                    setProducts(null);
                    setProducts(itemData.item.products);
                    setLoading(false);
                  }}
                />
            )}
          /> */}
        </View>
        <View style={{
          top: 10,
          alignSelf: 'flex-end',
          right: 10
        }}>
          <TouchableOpacity onPress={() => {
            setModalVisible(true);
          }}>
            <MaterialIcons name="filter-list" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity  onPress={sortHighToLow}>
          <Text>SORT BY HIGH TO LOW</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sortLowToHigh}>
          <Text>SORT BY LOW TO HIGH</Text>
        </TouchableOpacity> */}



      </View>

      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
      >
        <View style={styles.modal}>
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', top: 30, color: '#2F66A9' }}>SET FILTERS</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.moBtn} onPress={sortHighToLow}>
              <Text style={styles.moBtnText}>SORT BY EXPENSIVE TO CHEAP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moBtn} onPress={sortLowToHigh}>
              <Text style={styles.moBtnText}>SORT BY CHEAP TO EXPENSIVE</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ elevation: 10, width: 150, height: 40, borderRadius: 20, borderWidth: 0.4, top: 70, alignItems: 'center', alignSelf: 'center', backgroundColor: '#2F66A9', borderColor: '#2F66A9' }}
            onPress={() => { setModalVisible(false) }}>
            <Text style={{
              fontSize: 18,
              top: 5,
              color: 'white'
            }}>Close me</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ color: 'white' }}>Loading {titleOFC} </Text>
        <ActivityIndicator size='small' color='white' />

      </View> :
        <View style={{ flex: 1, top: 20 }}>
         {products.length === 0 ? <View style={{alignSelf:'center',flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18,textAlign:'center'}}>No Product found in {titleOFC}</Text></View> : <FlatList
            onRefresh={fetchingProducts}
            refreshing={refresh}
            numColumns={2}
            data={HighToLow ? products.sort((a, b) => {
              if (a.price > b.price) {
                return -1;
              };
            }) : lowTOHigh ? products.sort((a, b) => {
              if (a.price < b.price) {
                return -1;
              }
            }) : products}
            renderItem={itemData => (
              <CategoryCard
                productTitle={itemData.item.title}
                productImage={!itemData.item.pictures[0].url ? 'No img' : itemData.item.pictures[0].url}
                ProductDescription={shortString(itemData.item.description)}
                ProductPrice={itemData.item.price}
                productSupplier={itemData.item.vendor.username}
                stockQuantity={itemData.item.stock_quantity}
                Onshare={async () => {
                  try {
                    const res = await FileSystem.downloadAsync(itemData.item.pictures[0].url, FileSystem.documentDirectory + '.jpeg');
                    setUri({ localUri: res.uri });
                    await Sharing.shareAsync(imgUri.localUri);
                    const result = await Share.share({
                      message: itemData.item.title + '|' + itemData.item.description + '|' + itemData.item.vendor + ' Powered By : MERI-DUKAN'
                    });
                    if (result.action === Share.sharedAction) {
                      if (result.activityType) {
                        // shared with activity type of result.activityType
                        // Alert.alert(result);
                      } else {
                        // shared
                        // Alert.alert(result);
                      }
                    } else if (result.action === Share.dismissedAction) {
                      // dismissed
                    }
                  } catch (error) {
                    console.log(error.message);
                  }
                }}
                ToCart={() => {
                  if(itemData.item.stock_quantity === 0) {
                    Alert.alert('Stock Shortage.','Sorry this product is out of stock.');
                    return;
                  }
                  else if (ids.includes(itemData.item.id)) {
                    Alert.alert('Ooho', 'You have already carted this item may be you can icrease the quantity of item by going into cart!');
                    return;
                  }
                  else if (arr.length === 0 || arr.includes(itemData.item.vendor.username)) {
                    dispatch(ToCartActions.addProductToCart(
                      itemData.item.id,
                      itemData.item.title,
                      itemData.item.description,
                      itemData.item.price,
                      1,
                      itemData.item.vendor,
                      itemData.item.vendor.username,
                      itemData.item.pictures[0].url,
                      itemData.item.stock_quantity
                    ))

                  }
                  else {
                    Alert.alert('OUR POLICY', 'According to policy of meri-dukan you can only add items to cart of one supplier at a time!');
                    return;
                  }

                }
                }
                Favourite={() => {
                  dispatch(ToFavActions.addToFavourite(
                    itemData.item.title,
                    itemData.item.description,
                    itemData.item.price,
                    !itemData.item.pictures[0].url ? 'No img' : itemData.item.pictures[0].url))
                }
                }
                goToDetails={() => {
                  props.navigation.navigate('ProductDetail', {
                    title: itemData.item.title,
                    description: itemData.item.description,
                    price: itemData.item.price,
                    supplier: itemData.item.vendor,
                    image: !itemData.item.pictures[0].url ? 'No img' : itemData.item.pictures[0].url,
                    comments: itemData.item.reviews,
                    id: itemData.item._id
                  });
                }}
              />
            )}
          />}
        </View>}
    </View>

  )
};
// HomeScreen.navigationOptions = navData => {
//     return {
//         tabBar:{
//             label:'Products',
//             icon: ({ tintColor }) => (<AntDesign name='key' size={25} color={tintColor} />)
//         }
//     }
// }
const styles = StyleSheet.create({
  btn: {
    width: 80,
    height: 30,
    backgroundColor: '#2F66A9',
    borderColor: '#2F66A9',
    borderWidth: 0.5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white'
  },
  searchBar: {
    width: '96%',
    borderColor: 'white',
    borderWidth: 0.5,
    alignSelf: 'center',
    padding: 10,
    height: 50,
    backgroundColor: 'white',
    elevation: 8,
    borderRadius: 5,
    top: 10
  },
  modal: {
    width: '80%',
    height: '60%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    elevation: 10,
    borderColor: 'white',
    top: 100
  },
  moBtn: {
    width: '90%',
    alignSelf: 'center',
    height: 60,
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    top: 60,
    elevation: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  moBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 5,
    color: 'grey'
  }
});
