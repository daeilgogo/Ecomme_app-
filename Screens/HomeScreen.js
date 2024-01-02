import { View, Text,StyleSheet,ScrollView,Image,TouchableOpacity,FlatList, Dimensions } from 'react-native'
import React,{useState} from 'react'
import Header from '../Components/Header';
import { slide_product } from '../Base_donnee/List_product';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config_firebase'
import Veste from '../Base_donnee/Veste';
import ChaussureItem from '../Base_donnee/Chaussure';
import Basket from '../Base_donnee/Basket';
import Immobilier from '../Base_donnee/Immobilier';
import Tunique from '../Base_donnee/Tunique';
import { SafeAreaView, } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box'


const WIDTH =Dimensions.get('window').width
const HEIGTH =Dimensions.get('window').height

export default function HomeScreen(props) {
  const  navigation = useNavigation();
 
  const [delivery,setDelivery]=useState(true)
  const [indexCheck,setIndexCheck]=useState("0")
  const [imageActive,setImageActive]=useState(0)

 //// Voir le Detail Page

 ///Get Data from firebase

 /// Item de basket

  return (
    <SafeAreaView style={styles.container}>
     <Header/>
     <ScrollView style={{marginTop:30,width:'100%',height:'50%'}} 
     showsVerticalScrollIndicator={false}>
      <SliderBox images={slide_product}
        dotColor='black'
        inactiveDotColor='gray'
        ImageComponentStyle={{borderRadius:15,width:"95%"}}
        autoplay
        circleLoop
        
        />
     <View style={styles.view_categorie}>
       <Text style={styles.text_categorie}>Les Tunique  Afro</Text>
     </View>
     <Tunique/>
    
{
  /////////////////////////////////////////////////////Veste et pret a porter
}
     <View style={styles.view_categorie}>
       <Text style={styles.text_categorie}>Les Vestes Pret-a-porter</Text>
     </View>
     <Veste/>
     

     {
  /////////////////////////////////////////////////////Chaussure
}
     <View style={styles.view_categorie}>
       <Text style={styles.text_categorie}>Les Chaussures</Text>
     </View>
    <ChaussureItem/>
     
    



{
  /////////////////////////////////////////////////////Basket
}
     <View style={styles.view_categorie}>
       <Text style={styles.text_categorie}>Les Baskets</Text>
     </View>
     <Basket/>
     

     {
      //////////////Meubles 
     }
     <View style={styles.view_categorie}>
       <Text style={styles.text_categorie}>Lits et Canapes</Text>
     </View>
     <Immobilier/>
    


     
     </ScrollView>
    </SafeAreaView>
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


    option:{
      marginLeft:-100,

    },
    view_categorie:{
       marginTop:20,
       marginLeft:6,
       width:400,
       backgroundColor:'#F2F2F2',
       marginBottom:'3%'
    }
    ,
    text_categorie:{
      fontSize:20,
      fontWeight:'bold',
    },
    image:{
      height:150,
      width:150,
      borderRadius:10,
    }
  });
  