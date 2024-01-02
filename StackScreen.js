import React,{useEffect, useState}from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabScreens from './TabScreens';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import {firebase} from './config_firebase'
import DetailScreen from './Screens/DetailScreen';
import VendreItem from './Screens/VendreItem';
import CategorieDetail from './Components/CategorieDetail';
import ProfilManagment from './Screens/ProfilManagment';
import PaymentScreen from './Screens/PaymentScreen';
import StripePayement from './Screens/StripePayment';
import { PaymentView } from './Payment Scr/PayementView';
import { PaymentSrc } from './Payment Scr/PaymentScreen';


const Stack = createNativeStackNavigator();
export default function StackScreen() {

  const [initializing,setInitializing]=useState('')
  const [user,setUser]=useState();

  function onAuthSatteChange(user){
    setUser(user)
    if(initializing)
    setInitializing(false)

  }
  useEffect(()=>{
    const subscriber =firebase.auth().onAuthStateChanged(onAuthSatteChange)
    return subscriber;
  },[])

  if(initializing) return null;

  // if the user is not Login ,return those screen,
  if (!user){
    return (
      <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Registration' component={RegistrationScreen} options={{title:'Creer un Compte',headerBackTitle:'se connecter',headerTitleStyle:{alignItem:'center',color:'blue',}}}/>
      </Stack.Navigator>
    )

  }
  return (
    <Stack.Navigator>
        <Stack.Screen name='Tab' component={TabScreens} options={{headerShown:false, }}/>  
        <Stack.Screen name='Detail' component={DetailScreen} options={{headerShown:false, }}/> 
        <Stack.Screen name='Vente' component={VendreItem} options={{headerShown:false, }}/>  
        <Stack.Screen name='CtgDetail' component={CategorieDetail} options={{headerShown:false}}/>
        < Stack.Screen name='Profile' component={ProfilManagment} options={{headerShown:false}}/>
        < Stack.Screen name='Payment' component={PaymentScreen} options={{headerShown:false}}/>
        < Stack.Screen name='stripe' component={PaymentSrc} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}