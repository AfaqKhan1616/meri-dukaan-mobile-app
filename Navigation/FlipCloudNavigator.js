import { Ionicons, Feather, AntDesign, Entypo,FontAwesome5 } from "@expo/vector-icons";
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from '../Screens/AuthScreen';
import Home from '../Screens/HomeScreen';
import CartScreen from '../Screens/CartScreen';
import OrdersScreen from '../Screens/OrdersScreen';
import FavouriteScreen from '../Screens/FavouriteScreen';
import OrderForm from '../Screens/OrderForm';
import AddAddress from '../Screens/AddAddress';
import OrdersSummary from '../Screens/OrderSummary';
import OrderDetail from '../Screens/OrderDetail';
import ProductDetail from '../Screens/ProductDetailScreen';
import ProfileScreen from '../Screens/userProfile';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Text } from 'react-native';
import SignUpScreen from '../Screens/SignUpScreen';
import ReturnOrder from '../Screens/ReturnOrder';
import CategoryScreen from '../Screens/CategoriesScreen';
import InvoicesScreen from '../Screens/InvoicesScreen';
import InvoicesDetail from '../Screens/InvoicesDetail';
import MainScreen from '../Screens/MainScreen';
import AddMargin from '../Screens/AddMarginScreen';
import Customers from '../Screens/CustomersScreen';
import categoriesScreen from "../Screens/CategoriesScreen";
const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? 'yellow' : "white",
    },
    headerTintColor: Platform.OS === "android" ? "white" : 'blue',
    headerMode: 'none',
    showHeader: false
};

const nav = createStackNavigator({
    main:MainScreen
},{
    headerMode:'none',
    navigationOptions:{
        showHeader:false
    }
});
const authNav = createSwitchNavigator({
    Main:nav,
    Auth: AuthScreen,
    SignUp:SignUpScreen
});
const ProductsNavigator = createStackNavigator(
    {
        categories:categoriesScreen,
        Home: Home,
        // ItemD: ItemDetail,
        // ProductsOverview: ProductsOverviewScreen,
        // userPDScreen: userPScreen,
        Cart: CartScreen,
        // CartS: CartDetailScreen,
        // ProductD: ProductItem,
        // MyProductS: MyProductScreen,
        // AddMargin: AddMarginScreen,
        // ShippingAddress: ShippingAddressScreen,
        AddAddress: AddAddress,
        OrderSummary: OrdersSummary,
        OrderScreen: OrdersScreen,
        ProductDetail: ProductDetail,
        OrderDetail:OrderDetail,
        ReturnOrder:ReturnOrder,
        AddMargin:AddMargin,
        customers:Customers
     

    },
    {
        defaultNavigationOptions: defaultNavOptions,
        headerMode: 'none',
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons name={"md-cart"} size={23} color={drawerConfig.tintColor} />
            ),
            headerVisible: false
        },
    }
);
const FavoriteNavigator = createStackNavigator(
    {
        Favorite: FavouriteScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        headerMode: 'none',
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <AntDesign name="heart" size={24} color="black" />),
            headerVisible: false
        },
    }
);

// const SearchNavigator = createStackNavigator(
//   {
//     Search: SearchScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//     // navigationOptions: {
//     //   drawerIcon: drawerConfig => (
//     //     <Ionicons name={"md-cart"} size={23} color={drawerConfig.tintColor} />
//     //   )
//     // }
//   }
// );
//{
//     headerMode: 'none',
//     navigationOptions: {
//         headerVisible: false,
//     }
const UserProfileNav = createStackNavigator(
    {
        userProfile: ProfileScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        // navigationOptions: {
        //   drawerIcon: drawerConfig => (
        //     <Ionicons name={"md-cart"} size={23} color={drawerConfig.tintColor} />
        //   )
        // }
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }
);

const ordersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen,
        // Products: ProductsOverviewScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        headerMode: 'none',
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons name={"md-list"} size={23} color='red' />
            ),
        },
        showHeader: false
    }
);
const invoicesNav = createStackNavigator(
    {
        Invoices: InvoicesScreen,
        InvoicesD:InvoicesDetail
        // Products: ProductsOverviewScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        headerMode: 'none',
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons name={"md-list"} size={23} color='red' />
            ),
        },
        showHeader: false
    }
);

const tabScreenConfig = {
    Products: {
        screen: ProductsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="md-home" size={20} color='white' />;
            },
            tabBarColor: 'yellow',
        },
    },
    Orders: {
        screen: ordersNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Feather name="target" size={20} color='white'/>;
            },
            tabBarColor: 'blue',
        },
    },
    Favorites: {
        screen: FavoriteNavigator,
        navigationOptions: {
            tabBarColor: 'blue',
            tabBarIcon: (tabInfo) => {
                return <Entypo name="heart" size={20} color='white' />;
            },
        },
    },
    // Search: {
    //   screen: SearchNavigator,
    //   navigationOptions: {
    //     tabBarIcon: (tabInfo) => {
    //       return <Ionic name="md-search" size={25} color={tabInfo.tintColor} />;
    //     },
    //     tabBarColor: Colors.primaryColor,
    //     tabBarLabel: <Text style={{ fontFamily: "open-sans-bold" }}>Search</Text>,
    //   },
    // },
    UserProfile: {
        screen: UserProfileNav,
        navigationOptions: {
            tabBarColor: 'blue',
            tabBarIcon: (tabInfo) => {
                return <Entypo name="user" size={20} color='white' />;
            },
        },
    },
    InvoicesTab: {
        screen: invoicesNav,
        navigationOptions: {
            tabBarColor: 'blue',
            tabBarIcon: (tabInfo) => {
                return <FontAwesome5 name="file-invoice" size={20} color="white" />;
            },
        },
    },
};
const ProdTabNavigator =
    Platform.OS === "android"
        ? createBottomTabNavigator(tabScreenConfig, {
            activeTintColor: "white",
            shifting: true,
            tabBarOptions: {
                activeTintColor: 'white',
                activeBackgroundColor: '#323232',
                inactiveBackgroundColor: '#323232',
                showLabel:false,
                // labelStyle: {
                //     fontSize: 10,
                //     color: 'white',
                //     top: 2,
                // },
                tabStyle: {
                    backgroundColor: '#323232',
                    borderColor:'#323232'
                }
            }
        })
        : createBottomTabNavigator(tabScreenConfig);

// const UserNavigator = createStackNavigator(
//   {
//     User: userProductScreen,
//     Edit: editProductScreen,
//     // Products: ProductsOverviewScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons name={"md-create"} size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//   }
// );

const shopNavigator = createDrawerNavigator(
    {
        Auth: authNav,
        Products: ProdTabNavigator,
        Orders: ordersNavigator,
        // UserScreen: UserNavigator,
    }
);

export default createAppContainer(shopNavigator);







