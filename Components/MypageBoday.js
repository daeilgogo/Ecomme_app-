import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import {firebase} from '../config_firebase'
import { useNavigation } from '@react-navigation/native';

export default function MypageBoday() {
   const navigation =useNavigation();
   const logout=()=>{
      firebase.auth().signOut();
      
   }
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.view_search} onPress={()=>navigation.navigate('Payment')}>
       <Ionicons name="card-outline" size={20}  />
       <Text style={styles.text_search}>Gestion Mode de Payment</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.view_search}>
       <Ionicons name="location-outline" size={20}  />
       <Text style={styles.text_search}>Gestion Address</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.view_search}>
       <Ionicons name="menu-outline" size={20}  />
       <Text style={styles.text_search}>Gestion de commande</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.view_search}>
       <Ionicons name="information-circle-outline" size={20}  />
       <Text style={styles.text_search}>Contrat et contact</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.view_search} onPress={()=>navigation.navigate('Vente')}>
       <Ionicons name="add-circle-outline" size={20}  />
       <Text style={styles.text_search}>Vendre mes Produit</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.view_search} onPress={()=>logout()}>
       <Ionicons name="log-out-outline" size={20}  />
       <Text style={styles.text_search}>Se deconnecter</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    
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
        width:105,
        height:50,
    },
    view_search:{
        backgroundColor:'white',
        width:'98%',
        height:40,
        alignItems:'center',
        borderWidth:1,
        marginTop:30,
        justifyContent:'center',
        borderRightColor:'red',
        borderLeftColor:'white',
        borderBottomColor:'black',
        borderTopColor:'white',
        flexDirection:'row',
        alignContent:'center'
    },
    text_search:{

        backgroundColor:'white',
        height:30,
        justifyContent:'center',
        fontSize:18,
        marginLeft:5,
        flex:1

    }
  });