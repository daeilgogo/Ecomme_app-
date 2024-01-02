import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config_firebase'

export default function ProfilBody() {
   const navigation =useNavigation();
   const [profile,setProfile]=useState('')
   const [name,setName]=useState('')
   const [email,setEmail]=useState('')
   const [phone,setPhone]=useState('')
  //get data from firebase

  firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get().then(db=>{
    return setProfile(db.data());
  })

  // Update information on firebase

  const updateData=async()=>{
    try{
       if(name === '' || email ==='' || phone ===''){

        alert('please enter all infomations')

       }else{
            await firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).update({
                Name:name,
                Email:email,
                Phone:phone,
            })
    
            alert('update Succed')
          }
            
        


    }catch(error){
      alert(error)
    }
   
 }
  return (
    <View style={styles.container}>
    <View style={styles.view_search}>
       <Ionicons name="person-circle-outline" size={20}  />
       <TextInput placeholder={profile.Name}style={styles.text_search}
       autoCorrect={false}
       onChangeText={(name)=>setName(name)}></TextInput>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </View>
    <View style={styles.view_search}>
       <Ionicons name="mail-outline" size={20}  />
       <TextInput placeholder={profile.Email}style={styles.text_search}
       autoCapitalize='none'
       autoCorrect={false}
       onChangeText={(email)=>setEmail(email)}></TextInput>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </View>
    <View style={styles.view_search}>
       <Ionicons name="call-outline" size={20}  />
       <TextInput placeholder={profile.Phone} style={styles.text_search}
       keyboardType='number-pad'
       onChangeText={(phone)=>setPhone(phone)}></TextInput>
       <Ionicons name="chevron-forward-outline" size={20}  />
    </View>

    <TouchableOpacity style={styles.btn}
    onPress={()=>updateData()}>
        <Text> Update Your Information </Text>
    </TouchableOpacity>
    
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
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
        borderWidth:1,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'red',
        borderLeftColor:'white',
        borderBottomColor:'black',
        borderTopColor:'white',
        flexDirection:'row'
    },
    text_search:{

        backgroundColor:'white',
        flex:1,
        height:30,
        justifyContent:'center',
        fontSize:18,
        marginLeft:5

    },
    btn:{
       marginTop:50,
       borderWidth:0.5,
       backgroundColor:'#C3FCF5',
       padding:15, 
       borderRadius:10

    }
  });