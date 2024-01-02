import { View, Text,StyleSheet,SafeAreaView } from 'react-native'
import React from 'react'
import ProfilHeader from '../Components/ProfilHeader';
import MypageBoday from '../Components/MypageBoday';

export default function MypageScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {
        //Header of Profil page
      }
      <ProfilHeader/>
      {
        //Body of Profil Page
      }
      <MypageBoday/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
