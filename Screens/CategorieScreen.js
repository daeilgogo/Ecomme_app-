import { View, Text,StyleSheet,ScrollView,Image,TouchableOpacity,FlatList, Dimensions,SafeAreaView } from 'react-native'
import React,{useState} from 'react'
import Header from '../Components/Header';
import { slide_product } from '../Base_donnee/List_product';
import { useNavigation } from '@react-navigation/native';
import CategorieBody from '../Components/CategorieBody';
import { SliderBox } from 'react-native-image-slider-box'


const WIDTH =Dimensions.get('window').width
const HEIGTH =Dimensions.get('window').height

export default function CategorieScreen(props) {
  const  navigation = useNavigation();
 
  const [delivery,setDelivery]=useState(true)
  const [indexCheck,setIndexCheck]=useState("0")
  const [imageActive,setImageActive]=useState(0)



  return (
    <SafeAreaView style={styles.container}>
     <Header/>
     <ScrollView style={{marginTop:30,width:'100%',}} 
     showsVerticalScrollIndicator={false}>
       <SliderBox images={slide_product}
        dotColor='black'
        inactiveDotColor='gray'
        ImageComponentStyle={{borderRadius:15,width:"95%"}}
        autoplay
        circleLoop
        />
  <CategorieBody/>

     
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
       width:'100%',
       backgroundColor:'#F2F2F2'
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
  