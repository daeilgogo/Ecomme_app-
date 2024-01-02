import { View, Text,StyleSheet,Image,TouchableOpacity,SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import PanierHeader from '../Components/PanierHeader';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config_firebase'
import {Ionicons,SimpleLineIcons,MaterialCommunityIcons,Fontisto} from '@expo/vector-icons'


export default function DetailScreen(props) {
    const navigation = useNavigation();
    const [count,setCount]=useState(1)

    const incerment =()=>{
      setCount(count+1)
    }
    const decrement =()=>{
      if(count>1){
        setCount(count-1)
      }
   
    }

    const {params} =props.route
    const Image_ = params?params.image:null;
    const Name_= params?params.name:null;
    const Prix_= params?params.prix:null;
    const Description_= params?params.description:null;
    const Size_= params?params.size:null;
    const Id = params?params.Id:null;
    const Value_ =params?params.value:null;
    const [panier,setPanier]=useState([])
    const ProductId =JSON.stringify(Id)
    const [product,setProduct]=useState([])
    const [quantite,setQuantite]=useState('1')


    //// Calcul du Prix du produit par rapport a la quantite
    const prixProduit=(total=0)=>{
      total=(Number(Prix_)*count)
      return total
    }


    

    /// mettre dans le panier

    const AddTobasket=()=>{
       AddTodb()
        
    }
    //Lire les donnes de firebase





    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection('Users')
        .doc(firebase.auth().currentUser.uid)
        .collection('Panier')
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setProduct(data);
        });
    
      // Assurez-vous de vous désabonner lorsque le composant est démonté
      return () => unsubscribe();
    }, []);
   
     

    // Envoyer les donner dans la base donnee
    
    const AddTodb=async()=>{
      try {
          await firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Panier').doc(Name_).set({
          
            Produit:Image_,
            Name:Name_,
            Prix: prixProduit(),
            Size:Size_,
            Quantite:count,
            Value:Value_,
            PrixInitial:Prix_,
            State:true

            
          })
          alert('Produit ajouter au panier');
    
        
      } catch (error) {
        alert('Error de transfer',error)
      }
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
         <Ionicons name='chevron-back-circle' size={30}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate('Panier')}}>
          <Text style={{position:'absolute', fontSize:14, fontWeight:'bold',color:'red',marginLeft:1, marginTop:-3, fontWeight:'bold'}}>{product.length}</Text>
         <Ionicons name='basket-outline' size={30} color='blue'/>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%', marginTop:70 }}>
         <Image source={{uri:Image_}} style={styles.image}/>
      </View>

        

    
    <View style={{flexDirection:'row', justifyContent:'space-between',width:'95%'}}>
    </View>
    <View style={styles.detail}>
       <View style={styles.titleRow}>
          <Text style={styles.title}> {Name_} </Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{Prix_} {Value_}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {
              [1,2,3,4,5].map((index)=>(
                <Ionicons key={index} name='star' size={24} color='gold'/>
              ))
            }
            <Text style={styles.ratingtext}>  (4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={()=>{incerment()}}>
              <SimpleLineIcons name='plus' size={20}/>
            </TouchableOpacity>
            <Text style={styles.ratingtext}>   {count}   </Text>
            <TouchableOpacity onPress={()=>{decrement()}}>
              <SimpleLineIcons name='minus' size={20}/>
            </TouchableOpacity>
          </View>
        </View>
        <View  style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            Description 
          </Text>
          <Text style={styles.descText}>
          Lorem Ipsum is simply dummy text freof the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>

        <View style={{marginBottom:10}}>
          <View style={styles.location}>
            <View style={{flexDirection:'row'}}>
              <Ionicons name='location-outline' size={20}/>
              <Text>   Yaounde   </Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons name='truck-delivery-outline' size={20}/>
              <Text>   Free Delivery   </Text>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={()=>navigation.navigate('Payment',{prixProduit:(Prix_*count), productName:Name_, productImage:Image_, productQuantite:count})} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW </Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={()=>AddTobasket()} style={styles.addCart}>
            <Fontisto name='shopping-bag' color='white' size={24}/>
          </TouchableOpacity>

        </View>
        
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    
  login_btn:
  {
      backgroundColor:'white',
      width:300,
      height:50,
      borderRadius:50,
      borderColor:'blue',
      alignItems:'center',
      borderWidth:1,
      marginTop:25,
      justifyContent:'center',
      backgroundColor:'#C3FCF5',
      flexDirection:'row'
     
  },
     upperRow:{
    marginHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    position:'absolute',
    top:30,
    width:'95%',
    zIndex:999

},
image:{
  aspectRatio:1,
  resizeMode:'cover',
  borderTopRightRadius:20,
  borderTopLeftRadius:20
  
},
detail:{
  marginTop:-15,
  backgroundColor:'white',
  width:'100%',
  borderTopLeftRadius:25,
  borderTopRightRadius:25,
  padding:5

},
titleRow:{
  flexDirection:'row',
  alignItems:'center',
  width:'95%',
  paddingBottom:10,
  justifyContent:'space-between',
  marginHorizontal:10,
  top:10

},
title:{
  fontWeight:'bold',
  fontSize:30,
  flex:1,

},
priceWrapper:{
  backgroundColor:'gray',
  borderRadius:10

},
price:{
  fontWeight:'normal',
  fontSize:30,
  paddingHorizontal:6

},
ratingRow:{
  flexDirection:'row',
  alignItems:'center',
  width:'95%',
  paddingBottom:10,
  justifyContent:'space-between',
  top:0,

},
rating:{
  top:10,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginHorizontal:0,
},
ratingtext:{
  color:'gray',
  fontWeight:'bold',
  fontSize:30,
  paddingHorizontal:5
},
descriptionWrapper:{
  marginTop:10,
  marginHorizontal:5,

},
description:{
  fontWeight:'bold',
  fontSize:20,
},
descText:{
  fontSize:12,
  textAlign:'justify',
  marginBottom:0,
  color:'black'
},
location:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:'gray',
  padding:5,
  borderRadius:10,
  marginTop:10,

},
cartRow:{
  flexDirection:'row',
  alignItems:'center',
  width:'100%',
  paddingBottom:10,
  justifyContent:'space-between',


},
addCart:{
  width:37,
  height:37,
  borderRadius:50,
  margin:10,
  backgroundColor:'#7BD579',
  alignItems:'center',
  justifyContent:'center'
},
cartBtn:{
  width:'70%',
  backgroundColor:'black',
  padding:10,
  borderRadius:10,
  marginLeft:12
},
cartTitle:{
  textAlign:'center',
  fontWeight:'bold',
  fontSize:20,
  color:'white',
},

  });