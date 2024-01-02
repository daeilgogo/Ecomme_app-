import { View, Text,StyleSheet,ScrollView,Image,TouchableOpacity,FlatList, Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import {firebase} from '../config_firebase'
import { useNavigation } from '@react-navigation/native'

const WIDTH =Dimensions.get('window').width
const HEIGTH =Dimensions.get('window').height

export default function Basket() {
    const navigation=useNavigation();
    const [basket,setBasket]=useState()
    const [detailpage,setDetailpage]=useState(false)
    /// Ouvrir le detail page
    
     /// Item de veste
     useEffect(()=>{
      firebase.firestore().collection('Basket').get().then(produit=>{
        return setBasket( produit.docs.map(doc=>doc.data()))
       })
     },[])
 
  return (
    
     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
     {
      basket?.map((item,idx)=>(
          
        <TouchableOpacity key={idx}  style={{marginLeft:5,padding:5,borderRadius:10,backgroundColor:'#FCFCF0'}}  onPress={()=>{navigation.navigate('Detail',{image:item.Image_uri, prix:item.Product_price,size:item.Product_size,
         name:item.Product_name,description:item.Product_description,value:item.Value})}}>
          <Image source={{uri:item.Image_uri}} style={styles.image}/>
          <Text>{item.Product_name}</Text>
          <Text style={{fontSize:15,fontWeight:'bold'}}>{item.Product_price} {item.Value}</Text>
          <Text>{item.Product_size}</Text>
        </TouchableOpacity>
        
      ))
     }
     </ScrollView>
    
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    WRAP:{
      width:WIDTH,
      height:HEIGTH*0.25,
    },
    wrapDot:{
      position:'absolute',
      bottom:0,
      flexDirection:'row',
      alignSelf:'center'
    },

    option:{
      marginLeft:-100,

    },
    view_categorie:{
       marginTop:20,
       marginLeft:6,
       width:400,
       backgroundColor:'#F2F2F2'
    }
    ,
    text_categorie:{
      fontSize:20,
      fontWeight:'bold',
    },
    image:{
      height:170,
      width:170,
      borderRadius:10,
    }
  });
  