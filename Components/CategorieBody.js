import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function CategorieBody() {
   const navigation =useNavigation();
   
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.categorie_btn} onPress={()=>{navigation.navigate('CtgDetail',{titre:'Tunique'})}}>
      
       <Text style={styles.categorie_text}>Les Tunique Afro</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.categorie_btn}  onPress={()=>{navigation.navigate('CtgDetail',{titre:'Veste'})}}>
      
       <Text style={styles.categorie_text}>Les veste pet-a-porter</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.categorie_btn} onPress={()=>{navigation.navigate('CtgDetail',{titre:'Chaussure'})}}>
       
       <Text style={styles.categorie_text}>Les chaussure</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.categorie_btn} onPress={()=>{navigation.navigate('CtgDetail',{titre:'Basket'})}}>
       
       <Text style={styles.categorie_text}>Les Basket</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    <TouchableOpacity style={styles.categorie_btn}  onPress={()=>{navigation.navigate('CtgDetail',{titre:'Immobilier'})}}>
       
       <Text style={styles.categorie_text}>Lits et Canapes</Text>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </TouchableOpacity>
    
    
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
   
    },

    logo:{
        width:105,
        height:50,
    },
    categorie_btn:{
        backgroundColor:'white',
        width:'98%',
        height:40,
        alignItems:'center',
        borderWidth:1,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'red',
        borderLeftColor:'white',
        borderBottomColor:'black',
        borderTopColor:'white',
        flexDirection:'row'
    },
    categorie_text:{

        backgroundColor:'white',
        width:'85%',
        height:30,
        justifyContent:'center',
        fontSize:18,
        marginLeft:5

    }
  });