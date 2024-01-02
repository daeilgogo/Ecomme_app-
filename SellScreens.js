import { View, Text, StyleSheet,Image} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './Screens/HomeScreen';
import MypageScreen from './Screens/MypageScreen';
import SearchScreen from './Screens/SearchScreen';
import PanierScreen from './Screens/PanierScreen';
import CategorieScreen from './Screens/CategorieScreen';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
export default function SellScreen() {
  return (
   <Tab.Navigator screenOptions={{}}>
    <Tab.Screen name='Categorie' component={CategorieScreen} options={{headerShown:false,tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="menu-outline" color={color} size={size} style={focused? styles.activeIcon: styles.icon}  />
          ),}}/>

     <Tab.Screen name='Recherche' component={SearchScreen} options={{headerShown:false,tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="search-outline" color={color} size={size} style={focused? styles.activeIcon: styles.icon}  />
          ),}}/>
     <Tab.Screen name='Home' component={HomeScreen} options={{headerShown:false, tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="home-outline" color={color} size={size} style={focused? styles.activeIcon: styles.icon}  />
          ),}}/>
     <Tab.Screen name='Mapage' component={MypageScreen} options={{headerShown:false, tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="person-outline" color={color} size={size} style={focused? styles.activeIcon: styles.icon}  />
          ),}}/>
     <Tab.Screen name='Panier' component={PanierScreen} options={{headerShown:false, tabBarIcon: ({ color,size, focused}) => (
            <Ionicons name="basket-outline" color={color} size={size} style={focused? styles.activeIcon: styles.icon}  />
          ),}}/>
    
   </Tab.Navigator>
  )
}


const styles=StyleSheet.create({
    activeIcon:{
        size:50,
        color:'red',
    

    },
    icon:{
        color:'black',
        size:20
    }
})