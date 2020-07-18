import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Alert, TextInput, Dimensions, YellowBox, ImageBackground, ToastAndroid, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as CommentActions from '../Store/Actions/AddCommentsAction';
import CommentBox from '../Components/CommentBox';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Header from '../Components/HeaderForCartAndFav';
import * as ToCartActions from '../Store/Actions/AddToCartAction';
import * as ToFavActions from '../Store/Actions/AddToFavouriteAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
export default function ProductDetailScreen(props) {
    const dispatch = useDispatch();
    console.disableYellowBox = true;
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
    const [comment, setComment] = useState('');
    const [commentSections, setCommentSection] = useState(false);
    const [aboutTrue, setAboutSection] = useState(true);
    const [commentsToRender, setCommentsToRender] = useState([]);
    const [vendorname,setVendorName] = useState(null);
    const [refresh,setRefresh] = useState(false);
    const [loading,setLoading] = useState(false);
    const cartData = useSelector(state => state.cart.cart);
    const favourites = useSelector(state => state.fav.favourites);

    // const commentsData = useSelector(state => state.comment.comments);
    const d = new Date();
    const title = props.navigation.getParam('title');
    const description = props.navigation.getParam('description');
    const price = props.navigation.getParam('price');
    const Vendor = props.navigation.getParam('supplier');
    const image = props.navigation.getParam('image');
    const comments = props.navigation.getParam('comments');
    const product_id = props.navigation.getParam('id');
    const [addedToFav, setAddedToFav] = useState(false);
    const [addToCart, setAddToCart] = useState(false);
    console.log('Vendor in details',Vendor);
    // const fetchEmail = async (resellerId) => {
    //     try {
    //         const resellerAcc = await axios.get('https://meridukan-api.herokuapp.com/users/5ed3d28c1a8c4f3858f737a4');
    //         console.log('------------USERr', resellerAcc);
    //         const user = resellerAcc.data.email;
    //         return user;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    const fetchComments = async () => {
        try {
            setLoading(true);
            setRefresh(true);
            const commentsRes = await axios.get('https://meridukan-api.herokuapp.com/reviews');
            // const commentToRender = commentsRes.data.filter(data => data.product.id === product_id);
            // console.log('CommentsRes', commentToRender);
            setCommentsToRender(commentsRes.data.filter(data => data.product.id === product_id));
            setRefresh(false);
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchComments();
    }, []);

    const FetchVendor = async () => {
        try {
            setLoading(true);
            setRefresh(true);
            const vendorName = await axios.get(`https://meridukan-api.herokuapp.com/users/${Vendor}`);
            setVendorName(vendorName.data);
            setRefresh(false);
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        FetchVendor();
    }, []);
    // const fetchingProducts = async () => {
    //     try {
    //         const response = await axios.get(`https://meridukan-api.herokuapp.com/products/${product_id}`);
    //         setCommentsToRender(response.data.reviews);
    //     } catch (e) {
    //       Alert.alert(e)
    //     }
    //   };
    //   useEffect(() => {
    //     fetchingProducts();
    //   },[]);

    const postComment = async () => {
        try {
            const resellerID = await AsyncStorage.getItem('Resseller');
            const response = await axios.post('https://meridukan-api.herokuapp.com/reviews', {
                review: comment,
                reseller: resellerID,
                product: product_id
            });
            console.log(response);
            setComment('');
            fetchComments();
        } catch (e) {
            console.log(e);
        }
    };
    const RemoveSticks = (email) => {
            const newStr = email.substr(0, email.length);
            const charToReplace = newStr.charAt(0);
            const doneIt = charToReplace.replace(charToReplace, ' ...');
            const concatenatedStr = newStr.concat(doneIt);
            return concatenatedStr;
    }
    return (
        <View style={{backgroundColor: '#333333',flex:1 }}>
            <Header title={title}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', right: 10 }}>
                    <TouchableOpacity onPress={() => {
                        if (addToCart) {
                            ToastAndroid.showWithGravity('This product is already in cart', ToastAndroid.SHORT, ToastAndroid.CENTER);
                            return;
                        }
                        setAddToCart(true)
                        ToastAndroid.showWithGravity(`${title} added to cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
                        dispatch(ToCartActions.addProductToCart(product_id, title, description, price, 1, Vendor, image));
                    }}>
                        {addToCart ? <Entypo name="shopping-cart" size={20} color="white" style={{ top: 5, paddingBottom: 5 }} /> : <AntDesign name="shoppingcart" size={20} color="white" style={{
                            margin: 5

                        }} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (addedToFav) {
                            ToastAndroid.showWithGravity(`${title} is already in favourites.`, ToastAndroid.SHORT, ToastAndroid.CENTER);
                            return;
                        }
                        setAddedToFav(true)
                        ToastAndroid.showWithGravity(`${title} added to favourites`, ToastAndroid.SHORT, ToastAndroid.CENTER);
                        dispatch(ToFavActions.addToFavourite(title, description, price, image))
                    }}>

                        {addedToFav ? <AntDesign name="star" size={20} color="white" style={{ margin: 5 }} /> : <AntDesign name="staro" size={20} color="white" style={{ margin: 5 }} />}
                    </TouchableOpacity>
                </View>
            </Header>
            <View style={{ borderRadius: 20, elevation: 50, borderWidth: 2, borderColor: 'white', height: 150, top: 10, width: '90%', alignSelf: 'center' }}>
                <ImageBackground
                    source={{ uri: image }}
                    imageStyle={{ resizeMode: 'stretch', borderRadius: 20 }}
                    style={{ width: '100%', height: 150, alignSelf: 'center' }}
                />
            </View>
            <View style={styles.tabBar}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                    setCommentSection(false);
                    setAboutSection(true);
                }}><View><Text style={{ color: aboutTrue ? 'white' : 'white', fontWeight: aboutTrue ? 'bold' : '400', fontSize: 25 }}>About</Text>{aboutTrue ? <View style={{ width: 50, borderWidth: 2, borderColor: 'orange' }} /> : null}</View></TouchableOpacity>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                    setAboutSection(false);
                    setCommentSection(true);
                }}><View><Text style={{ color: commentSections ? 'white' : 'white', fontWeight: commentSections ? 'bold' : '400', fontSize: 25 }}>Reviews</Text>{commentSections ? <View style={{ width: 50, borderWidth: 2, borderColor: 'orange' }} /> : null}</View></TouchableOpacity>
            </View>
            {aboutTrue ?
                <View style={styles.aboutSection}>
                    <View style={{ padding: 10, left: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>{title}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{price} PKR</Text>
                        <Text style={{ fontSize: 20, width: Dimensions.get('window').width - 60, color: 'white' }}>{description}</Text>
                        {/* <Text style={{ fontSize: 20, width: Dimensions.get('window').width - 60, color: 'white' }}>Supplier : {JSON.stringify(vendorname.username)}</Text> */}
                    </View>
                </View>
                :
                <View style={styles.commentSections}>
                    <KeyboardAwareScrollView>
                            <View>
                                <Text style={{ color: 'white', fontSize: 16, left: 20 }}>Reviews({commentsToRender.length})</Text>
                                <View style={{ flex: 1,padding:10,overflow:'scroll' }}>
                                    <ScrollView>
                                        <FlatList
                                        
                                            onRefresh={fetchComments}
                                            refreshing={refresh}
                                            data={commentsToRender}
                                            keyExtractor={item => item.id}
                                            renderItem={itemData => (
                                                <CommentBox
                                                    email={itemData.item.reseller.email}
                                                    comment={itemData.item.review}
                                                />
                                            )}
                                        />
                                    </ScrollView>
                                </View>
                                <View style={styles.commentBar}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{
                                            backgroundColor: 'black',
                                            height: 45,
                                            width: 50,
                                            borderTopLeftRadius: 30,
                                            borderBottomLeftRadius: 30,
                                            bottom: 10,
                                            right: 12
                                        }}>
                                            <AntDesign name="plus" size={24} color="white" style={{ alignSelf: 'center', top: 10 }} />
                                        </View>
                                        <TextInput
                                            placeholder='Write your comment here...'
                                            value={comment}
                                            onChangeText={cm => setComment(cm)}
                                            onSubmitEditing={postComment}
                                            style={{
                                                width: '90%',
                                                height: 45,
                                                bottom: 10,
                                                left: 10
                                            }}
                                        />
                                        {comment.length > 1 ? <View>
                                            <TouchableOpacity style={{ width: 90, height: 40, backgroundColor: 'transparent' }} onPress={postComment}>
                                                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Post</Text>
                                            </TouchableOpacity>
                                        </View> : null}
                                    </View>
                                </View>
                            </View>
                    </KeyboardAwareScrollView>
                </View>}
        </View>

    )
};
const styles = StyleSheet.create({
    tabBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        height: 40,
        top: 10,
        right: 10,
        marginHorizontal: 20
    },
    commentSections: {
        top: 20
    },
    aboutSection: {
        top: 20
    },
    commentBar: {
        width: '95%',
        height: 45,
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        paddingBottom: 30,
        overflow: 'hidden',
    }
});