import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import {firebase} from '../config_firebase'
import { useNavigation } from '@react-navigation/native';

export default function ProfilHeader() {
  const navigation =useNavigation()
  const [profil,setProfil]=useState('')

/// call data from firebase
useEffect(()=>{
  firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get().then(db=>{
    return setProfil(db.data())
  })
},[])


  return (
    <View style={styles.container}>
    <View>
       <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{navigation.navigate('Profile')}}>
             <Ionicons name="person-circle-outline" size={100}  />
             <View style={styles.view_profil}>
                  <Text style={{fontSize:30}}>{profil.Name}</Text>
             </View>
       </TouchableOpacity>
    </View>
    
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop:50,
   
    },

    logo:{
        width:70,
        height:70,
        borderRadius:50
    },
    view_profil:{
        backgroundColor:'#EEF5F4',
        width:'100%',
        height:50,
        borderRadius:20,
        borderLeftColor:'blue',
        borderWidth:3,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'red',
        borderTopColor:'yellow',
        borderBottomColor:'yellow',
        flexDirection:'row'
    },

  });