import { View, Text,StyleSheet,Image,ImageBackground,TouchableOpacity,TextInput,SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config_firebase'

export default function LoginScreen() {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

    //utilisation de useNavigation
    const navigation =useNavigation();
    /// Login 

    const Login_user=async(email,password)=>{
      try {
        if(email==='' || password ===''){
          alert('Entre email et mot de passe');
        }else{
          await  firebase.auth().signInWithEmailAndPassword(email,password);
          navigation.replace('Tab',{ screen:'Home'});
        }
        
      } catch (error) {
        alert(error);
      }
    }

  return (
    <SafeAreaView style={styles.container}>

      <Image source={require('../Images/logo.jpg')} style={styles.logo}/>

      {
        // Le TextInput des Email et mot de passe
      }

      <View style={styles.view_input}>
         <TextInput placeholder='Email' style={styles.text_input} 
         autoCapitalize='none'
         onChangeText={(email)=>setEmail(email)}/>
      </View>
      <View style={styles.view_input}>
         <TextInput placeholder='Password' style={styles.text_input} 
         secureTextEntry={true}
         autoCapitalize='none'
          onChangeText={(password)=>setPassword(password)}/>
      </View>

      {
        // Boutton de login et de registration
      }

      <TouchableOpacity style={styles.login_btn} onPress={()=>Login_user(email,password)}>
        <Text>Se connecter</Text>
      </TouchableOpacity>
      <View style={{marginTop:20,flexDirection:'row'}}>
           <Text style={{fontSize:15}}>J'ai pas un Compte?</Text>
           <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('Registration')}>
             <Text style={{color:'red', fontSize:15}}>Creer un compte</Text>
           </TouchableOpacity>
      </View>
      
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

    login_btn:
    {
        backgroundColor:'white',
        width:230,
        height:50,
        borderRadius:50,
        borderColor:'blue',
        alignItems:'center',
        borderWidth:1,
        marginTop:50,
        justifyContent:'center',
        backgroundColor:'#C3FCF5'
       
    },
    text_input:{
        backgroundColor:'#EEF5F4',
        width:'95%',
        height:40,
        justifyContent:'center',
      

    },
    view_input:{
        backgroundColor:'#EEF5F4',
        width:'97%',
        height:50,
        borderRadius:20,
        borderColor:'blue',
        alignItems:'center',
        borderWidth:1,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'

    },
    logo:
    {
        width:300,
        height:150,
        borderRadius:30,
    }
  });
  