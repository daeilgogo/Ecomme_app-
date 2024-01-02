import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import PanierHeader from '../Components/PanierHeader';
import {firebase} from '../config_firebase'
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import {Ionicons} from '@expo/vector-icons'

export default function PanierScreen(props) {
  const navigation =useNavigation()
  const [product,setProduct]=useState([])
  const [valeur,setValeur]=useState([])
  const [selectedProduct,setSelectedProduct]=useState([])
  
  const {params}=props.route
  const Panier=params?params.Panier:null

//// Somme total des produits
  const prixT=(sum=0)=>{
         product.forEach(item => {

          if(item.State==true){
             sum += Number(item.Prix);
            // setSelectedProduct([selectedProduct,...item])
          }
             
             
            
         })

    return sum
  }

  /////Deleter Product from fireBase

  const deleteProduct=async(nom)=>{
    try {
     
          firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Panier').doc(nom).delete().then(()=>{
            firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Panier').get().then(produit=>
              {
                 return setProduct(produit.docs.map(doc=>doc.data()))
              })
      
          })
         
    } catch (error) {
      alert(error)
    }
  }

//// add quantite
  const addQuantite=(qnt,nom,prix)=>{
    
      var add=Number(qnt)+1
      if(0<=add && add<=10){
        var total=Number(prix)*Number(add)
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Panier').doc(nom).update({
          Prix:total,
          Quantite:add
         })
      }else{
        return 0
      }
     
  }

  ///remove  quantite
  const removeQuantite=(qnt,nom,prix)=>{
   
    var add=Number(qnt)-1
      if(0<=add && add<=10){
        var total=Number(prix)*Number(add)
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Panier').doc(nom).update({
          Prix:total,
          Quantite:add
         })
      }else{
        return 0
      }


 }

 //get data from firebase
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

const handleCheckboxPress = (itemAddress, state, ) => {
  const db=firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Panier').doc(itemAddress)
  db.update({
    State:!state
    })
};

const [produitsAchetes, setProduitsAchetes] = useState([]);

// Fonction pour acheter les produits sélectionnés
const acheterProduits = () => {
  const produitsSelectionnes = product.filter((item) => item.State === true);
  setProduitsAchetes(produitsSelectionnes);

  // Naviguez vers l'écran de paiement avec les produits sélectionnés
  navigation.navigate('Payment', {
    prixTotal: prixT(), // Passer le prix total
    produitsSelectionnes: produitsSelectionnes, // Passer les produits sélectionnés
  });
};



  return (
    <SafeAreaView style={styles.container}>
      <PanierHeader/>
    <ScrollView style={{width:'100%',alignContent:'center'}}>
    {
      product?.map((item,idx)=>(
        <View key={idx} style={{flexDirection:'row',width:'100%',borderRadius:10,marginTop:10,alignContent:'center',padding:5,backgroundColor:'#E1ECF0',gap:10}}>
          <TouchableOpacity
           style={[styles.checkboxBase, item.State && styles.checkboxChecked]}
           onPress={()=>{handleCheckboxPress(item.Name,item.State)}}
            >
             {item.State && <Ionicons name="checkmark" size={24} color="white" />}
          </TouchableOpacity>

          <TouchableOpacity key={idx}  style={{borderRadius:15,marginTop:2,flexDirection:'row',flex:1,}} 
            onPress={()=>{navigation.navigate('Detail',{image:item.Produit, prix:item.PrixInitial, 
            name:item.Name,size:item.Size,description:item.description,value:item.Value})}}
          >

          <Image source={{uri:item.Produit}} style={styles.image}/>
          <View style={{marginLeft:10,width:'50%'}}>
          <Text>Nom: {item.Name}</Text>
          <Text style={{fontSize:15,fontWeight:'bold'}}>Prix: {item.Prix} {item.Value}</Text>
          <Text>Size: {item.Size}</Text>
          <Text style={{fontSize:15,fontWeight:'bold'}}>Quantite: {item.Quantite}</Text>
          </View>

          </TouchableOpacity>
        
          <View style={{flexDirection:'row',marginTop:10,gap:20,}}>
             <TouchableOpacity style={{width:30,height:30,backgroundColor:'#C7F1F1',alignItems:'center',borderWidth:1,
               justifyContent:'center',marginTop:70,borderRadius:100}}
               onPress={()=>addQuantite(item.Quantite,item.Name,item.PrixInitial)}
              >
                 <Text style={{fontSize:25,fontWeight:'bold'}}>+</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{width:30,height:30,backgroundColor:'#F1CFC7',alignItems:'center',borderWidth:1,
               justifyContent:'center',marginTop:70,marginLeft:5,borderRadius:100}}
               onPress={()=>removeQuantite(item.Quantite,item.Name,item.PrixInitial)}>
                 <Text style={{fontSize:25,fontWeight:'bold'}}>-</Text>
               </TouchableOpacity>
            
          </View>
          <TouchableOpacity style={{width:30,height:30,backgroundColor:'#B5B4B3',alignItems:'center', borderWidth:1,
               justifyContent:'center',marginTop:5,borderRadius:5,marginLeft:-15}}
               onPress={()=>deleteProduct(item.Name)}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>x</Text>
          </TouchableOpacity>

        </View>
        
        
        
      ))
     }

    </ScrollView>
    <View style={{alignItems:'center',marginBottom:0}}>
      <Text style={{fontSize:23,fontWeight:'bold'}}>Prix Total: {prixT()} FCFA</Text>
    <TouchableOpacity style={styles.btn} onPress={acheterProduits}>
      <Text style={{fontSize:15,fontWeight:'bold'}}> Acheter les Produit </Text>
    </TouchableOpacity>

    </View>
   
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    image:{
      width:150,
      height:150,
    },
    btn:{
      width:300,
      height:50,
      borderWidth:0.5,
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
      marginTop:10,
      marginBottom:10,
      backgroundColor:'#E5E6DC'
    },
    checkboxBase: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'coral',
      backgroundColor: 'transparent',
      marginTop:10
    },
    checkboxChecked: {
      backgroundColor: 'coral',
    },
  });