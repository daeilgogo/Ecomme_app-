import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,TextInput,ScrollView,TouchableOpacity,Text, Image,SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Button from '../Components/Button';
import ImageViewer from '../Components/ImageViewer';
import {firebase} from '../config_firebase'
import { useNavigation } from '@react-navigation/native';

const PlaceholderImage = require('../Images/logo.jpg');

export default function VendreItem() {
  const navigation= useNavigation()
  const [selectedValue, setSelectedValue] = useState("Chaussure");
  const [selectedImage, setSelectedImage] = useState(null);
  const [name,setName]=useState()
  const [prix,stePrix]=useState()
  const [description,setDescription]=useState()
  const [size,setSize]=useState()
  const [priceValue,setPriceValue]=useState("FCFA")

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  }; 

  /// Add product in To firebase

  const addToDb=async()=>{
    try {
      if(name==='' || prix ==='' || size==='' || selectedValue ===null || description==='' || selectedImage ===null || priceValue ===''){
        alert('Please Enter all Information about your Product')
      }else{
      await firebase.firestore().collection(selectedValue).doc(name).set({
        Product_name:name,
        Product_price:prix,
        Product_size:size,
        Product_cathegorie:selectedValue,
        Product_description:description,
        Image_uri:selectedImage,
        Value:priceValue

      })
      alert("Success")
      navigation.navigate('Home')
    }
      
    } catch (error) {
      alert('error',error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
     
     <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
      </View>
     
      <View style={styles.view_input}>
         <TextInput placeholder='Nom du produit'
         autoCorrect={false}
         onChangeText={(name)=>setName(name)} style={styles.text_input}/>
      </View>
      <View style={styles.view_input}>
         <TextInput placeholder='Prix du produit'
         autoCorrect={false}
         keyboardType='number-pad'
         onChangeText={(prix)=>stePrix(prix)} style={styles.text_input}/>
      </View>
      <View style={styles.view_input}>
         <TextInput placeholder='Taille du produit'
         autoCorrect={false}
         onChangeText={(size)=>setSize(size)} style={styles.text_input}/>
      </View>
      <View style={styles.view_input}>
         <TextInput placeholder='Description du produit'
         autoCorrect={false}
         onChangeText={(description)=>setDescription(description)} style={styles.text_input}/>
      </View>
      <View style={{flexDirection:'row'}}>
      <Picker
        selectedValue={selectedValue}
        style={{  width: 150 , backgroundColor:'white', marginTop:20,marginLeft:20}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Chaussure" value="Chaussure" />
        <Picker.Item label="Tunique" value="Tunique" />
        <Picker.Item label="Basket" value="Basket" />
        <Picker.Item label="Veste" value="Veste" />
        <Picker.Item label="Imobilier" value="Imobilier" />
      </Picker>
      <Picker
        selectedValue={priceValue}
        style={{ width: 150 , backgroundColor:'white', marginTop:20,marginLeft:20}}
        onValueChange={(itemValue, itemIndex) => setPriceValue(itemValue)}
      >
        <Picker.Item label="FCFA" value="FCFA" />
        
      </Picker>
      </View>

      <View style={{width:'100%',alignContent:'center',alignItems:'center'}}>
         <TouchableOpacity style={styles.login_btn} onPress={addToDb} >
           <Text>Ajouter Votre Produit</Text>
         </TouchableOpacity>
      </View>
    
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D6D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
   
    paddingTop: 60,
   
  },
  footerContainer: {
    marginTop:5,
    alignItems: 'center',
  },
  
  login_btn:
  {
      backgroundColor:'white',
      width:'90%',
      height:50,
      borderRadius:50,
      borderColor:'blue',
      alignItems:'center',
      borderWidth:1,
      marginTop:20,
      justifyContent:'center',
      backgroundColor:'#C3FCF5'
     
  },
  text_input:{
      backgroundColor:'#EEF5F4',
      width:'90%',
      height:30,
      justifyContent:'center',
    

  },
  view_input:{
      backgroundColor:'#EEF5F4',
      width:'100%',
      height:40,
      borderRadius:20,
      borderColor:'blue',
      alignItems:'center',
      borderWidth:1,
      marginTop:10,
      justifyContent:'center',
      alignItems:'center',

  },
  logo:
  {
      width:300,
      height:144,
      borderRadius:30,
  }
});
