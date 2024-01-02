import React, { useEffect, useState } from "react";
import { CardField, StripeProvider, useStripe } from "@stripe/stripe-react-native";
import {View, Text, FlatList, StyleSheet,ScrollView,Image,TouchableOpacity,TextInput, Button, Alert} from "react-native";
import IndexPayment from "./IndexPayment";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Payment() {
  return (
    <View style={styles.container}>
        
        <StripeProvider  publishableKey="pk_test_51MAHgtB1nzOgRqnKh8we8I2PBrjz0RkSUCkKvSAmaKv2urFrgkw0swRv48JrTh8gHvuIpC6CoyQtATRQzvZn1hfY00qZ1T3jEH"
        merchantIdentifier="merchant.identifier">
            <SafeAreaView>
               <Text>Enter your Name</Text>
               
            </SafeAreaView>
 
        </StripeProvider>

     
  </View>
  );
}
// }

//     const handlePayment= async ()=>{
//         try{
//             const {error} = await confirmPayment(key,{
//                 type:'Card',
//                 billingDetails:{
//                     email:'nekdaek@gmail.com',
//                 }
//             })
//            if(error){
//             Alert.alert('error',error.message)
//            }else{
//             Alert.alert('Payment Succefful!!');
//            }

//         }catch(error){
//             Alert.alert('Error catch',error)
//         }
      
     
//         //confirm Payment
       

//     };
//     return(
//         <View>
//             <CardField 
//             postalCodeEnabled={false}
//             style={{
//                 height:50,
//                 width:400,
//             }}
//             />
//             <Button title="Pay Now" onPress={handlePayment}/>
//         </View>
//     )



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});