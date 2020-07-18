import React,{useState} from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../Components/HeaderForCartAndFav';
export default function OrderForm(props) {
    const[focusedOne,setFocusedOne] = useState(false);
    const[focusedTwo,setFocusedTwo] = useState(false);
    const[focusedThree,setFocusedThree] = useState(false);
    const[focusedFour,setFocusedFour] = useState(false);
    const[focusedFive,setFocusedFive] = useState(false);
    const[focusedSix,setFocusedSix] = useState(false);
    const[focusedSeven,setFocusedSeven] = useState(false);
    const[focusedEight,setFocusedEight] = useState(false);
    const[focusedNine,setFocusedNine] = useState(false);
 
 return (
     <KeyboardAwareScrollView
     style={{flex:1}}
     >
         <Header
         headerTitle='Add Address'
         />
   <View style={styles.mainScreen}>
       <View style={styles.wrapper}>
           <View style={styles.MainInputs}>
               <Text style={focusedOne ? styles.labelFocused:styles.labelNotFocused}>CUSTOMER NAME</Text>
               <TextInput style={[styles.input,[
                   {
                    borderBottomColor:focusedOne ? '#398AD7' : 'grey',
                    borderBottomWidth:focusedOne ? 2 : 0.5,
                   }
               ]]} onFocus={() => setFocusedOne(true)} onBlur={() => setFocusedOne(false)}/>
               <Text style={focusedTwo ? styles.labelFocused : styles.labelNotFocused}>PHONE NUMBER</Text>
               <TextInput style={[styles.input,[
                   {
                    borderBottomColor:focusedTwo ? '#398AD7' : 'grey',
                    borderBottomWidth:focusedTwo ? 2: 0.5,
                   }
               ]]} onFocus={() => setFocusedTwo({borderColor:'red',borderWidth:2})} onBlur={() => setFocusedTwo(false)}/>
               <Text style={styles.label}>FLAT/HOUSE NO./BUILDING</Text>
               <TextInput style={[styles.input,[
                   {
                    borderBottomColor:focusedThree ? '#398AD7' : 'grey',
                    borderBottomWidth:focusedThree ? 1 : 0.5,
                   }
               ]]} onFocus={() => setFocusedThree(true)} onBlur={() => setFocusedThree(false)}/>
               <Text style={styles.label}>STREET/COLONY</Text>
               <TextInput style={[styles.input,[
                   {
                    borderBottomColor:focusedFour ? '#398AD7' : 'grey',
                    borderBottomWidth:focusedFour ? 1 : 0.5,
                   }
               ]]} onFocus={() => setFocusedFour(true)} onBlur={() => setFocusedFour(false)}/>
               <Text style={styles.label}>FLAT/HOUSE NO./BUILDING</Text>
               <TextInput style={[styles.input,[
                   {
                    borderBottomColor:focusedFive ? '#398AD7' : 'grey',
                    borderBottomWidth:focusedFive ? 1 : 0.5,
                   }
               ]]} onFocus={() => setFocusedFive(true)} onBlur={() => setFocusedFive(false)}/>
           </View>
           <View>
               <View style={{
                   flexDirection:'row',
                   justifyContent:'space-between',
                   width:'100%',
                   top:10
               }}>
                   <View>
                   <Text style={styles.twoInputLabel}>CITY</Text>
                   <TextInput style={styles.twoInputStyle}/>
                   </View>
                   <View>
                   <Text style={styles.twoInputLabel}>LANDMARK</Text>
                   <TextInput style={styles.twoInputStyle}/>
                   </View>
               </View>
               <View style={{
                   flexDirection:'row',
                   justifyContent:'space-between',
                   width:'100%',
                   top:10
               }}>
                   <View>
                   <Text style={styles.twoInputLabel}>STATE</Text>
                   <TextInput style={styles.twoInputStyle}/>
                   </View>
                   <View>
                   <Text style={styles.twoInputLabel}>PINCODE</Text>
                   <TextInput style={styles.twoInputStyle}/>
                   </View>
               </View>
           </View>
       </View>
   </View>
   </KeyboardAwareScrollView>
 )
};
const styles = StyleSheet.create({
    wrapper:{
     padding:10,
     paddingVertical:10
    },
    input :{
        width:'95%',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        color:'grey',
        fontSize:14,
        paddingLeft:5
    },
    labelNotFocused:{
        fontSize:15,
        marginHorizontal:10,
        marginTop:12,
        color:'grey'
    },
    labelFocused:{
        fontSize:18,
        marginHorizontal:10,
        marginTop:12,
        color:'#398AD7'
    },
    twoInputStyle:{
        width:150,
        borderBottomWidth:0.5,
        borderBottomColor:'grey',
        margin:10
    },
    twoInputLabel:{
        fontSize:15,
        top:10,
        color:'grey',
        padding:10
    }
});