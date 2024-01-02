import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native'
import React from 'react'
import ProfilHeader from '../Components/ProfilHeader';
import ProfilBody from '../Components/ProfilBody';
import {Ionicons} from '@expo/vector-icons'



export default function ProfilManagment({navigation}) {
  
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.upperRow}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
         <Ionicons name='chevron-back-circle' size={30}/>
        </TouchableOpacity>
     </View>
      
      {
        //Header of Profil page
      }
      <ProfilHeader/>
      {
        //Body of Profil Page
      }
      <ProfilBody/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
upperRow:{
  marginHorizontal:20,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  position:'absolute',
  top:30,
  width:'95%',
  zIndex:999
}
});
