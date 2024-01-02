import { View, Text,StyleSheet,ScrollView,Image,TouchableOpacity,FlatList, Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import {firebase} from '../config_firebase'
import { useNavigation } from '@react-navigation/native'

const WIDTH =Dimensions.get('window').width
const HEIGTH =Dimensions.get('window').height

export default function Tunique() {
    const navigation=useNavigation()
    const [tunique,setTunique]=useState()
     /// Item de veste
     useEffect(()=>{
      firebase.firestore().collection('Tunique').get().then(produit=>{
        return setTunique( produit.docs.map(doc=>doc.data()))
       })
     },[])
 
  return (
    
     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
     {
      tunique?.map((item,idx)=>(
        <TouchableOpacity key={idx}  style={{marginLeft:5,padding:5,borderRadius:10,backgroundColor:'#FCFCF0'}} onPress={()=>{navigation.navigate('Detail',{image:item.Image_uri, prix:item.Product_price, 
        name:item.Product_name,description:item.Product_description, size:item.Product_size,value:item.Value})}}>
          <Image source={{uri:item.Image_uri}} style={styles.image}/>
          <Text style={{fontSize:17, fontWeight:'bold'}}>{item.Product_name}</Text>
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
  