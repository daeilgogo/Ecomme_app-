import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function Header(props) {
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:30, width:'95%'}}>
         <Image source={require('../Images/logo.jpg')} style={styles.logo}/>
         <TouchableOpacity>
             <Ionicons name="notifications-outline" size={25} style={{marginTop:15}}  />
         </TouchableOpacity>
        
      </View>
      
      <View style={styles.view_search}>
        <Ionicons name="search-sharp" size={20}  />
         <TextInput placeholder='Recherche' style={styles.text_search} onPressIn={()=>{navigation.navigate('Recherche')}}/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      width:'100%',
      backgroundColor: '#fff',
      alignItems: 'center',
    },

    logo:{
        width:105,
        height:50,
    },
    view_search:{
      backgroundColor:'#EEF5F4',
      width:'95%',
      height:50,
      borderRadius:20,
      borderLeftColor:'blue',
      alignItems:'center',
      borderWidth:3,
      marginTop:20,
      justifyContent:'center',
      borderRightColor:'red',
      borderTopColor:'yellow',
      borderBottomColor:'yellow',
      flexDirection:'row',
      padding:10
  },
  text_search:{

      backgroundColor:'#EEF5F4',
      flex:1,
      height:30,
      justifyContent:'center',

  }
  });