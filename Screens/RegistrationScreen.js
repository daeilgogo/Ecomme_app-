import { View, Text,StyleSheet,TextInput,TouchableOpacity,Image,SafeAreaView } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config_firebase';

export default function RegistrationScreen() {

  const navigation=useNavigation();
  /// usestate
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [name,setName]=useState();
  const [phone,setPhone]=useState();
//// creer un compte 

const register=async(email,password,name,phone)=>
{
  try {
    if(name==='' || email==='' || password ==='' || phone===''){
       
      alert('Entre toutes les informations demandees')
    }else{
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp:true,
        url:'http://test1-4430d.firebaseapp.com'
      })
      .then(()=>{
        alert('Verification email sent')
      }).catch((error)=>{
        alert(error.message)
      })
      .then(()=>{
        firebase.firestore().collection('Users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          Name:name,
          Email:email,
          Phone:phone,
          Password:password,
        })
        navigation.replace('Tab' ,{screen:'Home'})
      })
      .catch((error)=>{
        alert(error.message)
      })
    })
    .catch((error)=>{
      alert(error.message)
    })

  }} catch (error) {
    alert(error.message)
  }
}

  return (
    <SafeAreaView style={styles.container}>

      <Image source={require('../Images/logo.jpg')} style={styles.logo}/>

      {
        // Le TextInput des Email et mot de passe
      }

      <View style={styles.view_input}>
         <TextInput placeholder='Nom et Prenom'
         autoCorrect={false}
         onChangeText={(name)=>setName(name)} style={styles.text_input}/>
      </View>
      <View style={styles.view_input}>
         <TextInput placeholder='Email'
         autoCapitalize='none'
         onChangeText={(email)=>setEmail(email)} style={styles.text_input}/>
      </View>
      <View style={styles.view_input}>
         <TextInput placeholder='Password'
         secureTextEntry={true}
         autoCapitalize='none'
         onChangeText={(password)=>setPassword(password)} style={styles.text_input}/>
      </View>
      <View style={styles.view_input}>
         <TextInput placeholder='Numero de telephone'
         keyboardType='number-pad'
         onChangeText={(phone)=>setPhone(phone)} style={styles.text_input}/>
      </View>

      {
        // Boutton de login et de registration
      }

      <TouchableOpacity style={styles.login_btn} onPress={()=>register(email,password,name,phone)}>
        <Text>Registration</Text>
      </TouchableOpacity>
      <View style={{marginTop:20,flexDirection:'row'}}>
           <Text style={{fontSize:15}}>J'ai un Compte?</Text>
           <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('Login')}>
             <Text style={{color:'red', fontSize:15}}>Se connecter</Text>
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
      width:'89%',
      height:50,
      justifyContent:'center',
    

  },
  view_input:{
      backgroundColor:'#EEF5F4',
      width:'90%',
      height:60,
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
      width:250,
      height:120,
      borderRadius:30,
  }
});
