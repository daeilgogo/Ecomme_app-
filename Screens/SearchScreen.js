import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SearchHeader from '../Components/SearchHearder';

export default function SearchScreen() {

  return (
    <View style={styles.container}>
      <SearchHeader/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
    },
  });
  