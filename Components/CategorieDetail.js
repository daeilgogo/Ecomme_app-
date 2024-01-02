import { View, Text,StyleSheet,ScrollView,Image,TouchableOpacity,FlatList, Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import Header from '../Components/Header';
import { slide_product } from '../Base_donnee/List_product';
import { useNavigation } from '@react-navigation/native';
import CategorieBody from '../Components/CategorieBody';
import {firebase} from '../config_firebase'


const WIDTH =Dimensions.get('window').width
const HEIGTH =Dimensions.get('window').height

export default function CategorieDetail(props) {
  const  navigation = useNavigation();
 
  const [indexCheck,setIndexCheck]=useState("0")
  const [product,setProduct]=useState()

  
 /// Get element from CategorieScreen
 const {params} =props.route
const Titre = params?params.titre:null


 ///Get Data from firebase
 useEffect(()=>{
  firebase.firestore().collection(Titre).get().then(produit=>{
    return setProduct( produit.docs.map(doc=>doc.data()))
   })
 },[])

 

  return (
    <View style={styles.container}>
     <Header/>
     <ScrollView style={{marginTop:30,width:'100%',}} 
     showsVerticalScrollIndicator={false}>
        {/* <FlatList style={styles.WRAP}
          data={slide_product}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          extraData={indexCheck}
          renderItem={({item,index})=>(
       <TouchableOpacity onPress={()=>{setIndexCheck(item.id)}}>
         <View style={styles.WRAP}>
          <Image style={{height:300,width:400,marginLeft:5,borderRadius:30}} source={{uri:item}}/>
         </View>
       </TouchableOpacity>

     )}

     /> */}
       <ScrollView >
     {
      product?.map((item,idx)=>(
        <TouchableOpacity key={idx}  style={{borderRadius:15,marginTop:2,borderWidth:1,flexDirection:'row'}} onPress={()=>{navigation.navigate('Detail',{image:item.Image_uri, prix:item.Product_price, 
        name:item.Product_name,size:item.Product_size,description:item.Product_description,value:item.Value})}}>
          <Image source={{uri:item.Image_uri}} style={styles.image}/>
          <View style={{marginLeft:10}}>
          <Text>{item.Product_name}</Text>
          <Text style={{fontSize:15,fontWeight:'bold'}}>{item.Product_price} {item.Value}</Text>
          <Text>{item.Product_size}</Text>
          </View>
          
        </TouchableOpacity>
        
      ))
     }
     </ScrollView>
    

     
     </ScrollView>
    </View>
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
      marginLeft:-50,

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
      height:75,
      width:75,
      borderRadius:10,
    }
  });
  