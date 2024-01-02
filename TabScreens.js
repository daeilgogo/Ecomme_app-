import { View, Text, StyleSheet,Image} from 'react-native'
import React,{useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './Screens/HomeScreen';
import MypageScreen from './Screens/MypageScreen';
import SearchScreen from './Screens/SearchScreen';
import PanierScreen from './Screens/PanierScreen';
import CategorieScreen from './Screens/CategorieScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import {firebase} from './config_firebase';

const Tab = createBottomTabNavigator();
export default function TabScreens() {
  const [product,setProduct]=useState([])




  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Users')
      .doc(firebase.auth().currentUser.uid)
      .collection('Panier')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setProduct(data);
      });
  
    // Assurez-vous de vous désabonner lorsque le composant est démonté
    return () => unsubscribe();
  }, []);


  return (
   <Tab.Navigator screenOptions={{}}>
    <Tab.Screen name='Categorie' component={CategorieScreen} options={{headerShown:false,tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="menu-outline" color={focused? 'blue':'black'} size={focused? 30:20} />
          ),}}/>

     <Tab.Screen name='Recherche' component={SearchScreen} options={{headerShown:false,tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="search-outline" color={focused? 'blue':'black'} size={focused? 30:20}  />
          ),}}/>
     <Tab.Screen name='Home' component={HomeScreen} options={{headerShown:false, tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="home-outline" color={focused? 'blue':'black'} size={focused? 30:20}  />
          ),}}/>
     <Tab.Screen name='Mapage' component={MypageScreen} options={{headerShown:false, tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="person-outline" color={focused? 'blue':'black'} size={focused? 30:20}  />
          ),}}/>
     <Tab.Screen name='Panier' component={PanierScreen} options={{headerShown:false, tabBarIcon: ({ color,size, focused}) => (
      <View style={{alignContent:'center'}}>
            <Text style={{fontSize:15, marginTop:-3,marginLeft:20, position:'absolute', color:'red', fontWeight:'bold'}}>{product.length}</Text>
            <Ionicons name="basket-outline" color={focused? 'blue':'black'} size={focused? 30:20}  />
      </View>
          ),}}/>
    
   </Tab.Navigator>
  )
}


const styles=StyleSheet.create({
    activeIcon:{
        size:50,
        color:'blue',
    

    },
    icon:{
        color:'black',
        size:20
    }
})