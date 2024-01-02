 import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config_firebase'

export default function PanierHeader(props) {

  // this methode help to delete the address in the scrollview
  const onDeletedAddress = async () => {
    const collectionRef = firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Panier');
  
    // Get all documents in the collection
    const querySnapshot = await collectionRef.get();
  
    // Delete each document
    querySnapshot.forEach((doc) => {
      collectionRef.doc(doc.id).delete();
    });
  }
  
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:30, width:'95%'}}>
         <Image source={require('../Images/logo.jpg')} style={styles.logo}/>
         <TouchableOpacity onPress={onDeletedAddress}>
             <Ionicons name="trash" size={25} style={{marginTop:15}}  />
         </TouchableOpacity>
        
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