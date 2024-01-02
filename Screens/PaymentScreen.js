import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity,Video,Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import PanierHeader from '../Components/PanierHeader';
import {firebase} from '../config_firebase'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import {Ionicons,SimpleLineIcons,MaterialCommunityIcons,Fontisto} from '@expo/vector-icons'
import Postcode from 'react-native-daum-postcode';
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import ModalPayment from '../Components/ModalPayment';

export default function PaymentScreen(props) {
  const navigation =useNavigation()
  const [product,setProduct]=useState([])
  const [valeur,setValeur]=useState([])
  var quantite=0
  const {params}=props.route
  const Panier=params?params.Panier:null
  const prixTotal =params?params.prixTotal:null
  const prixProduit=params?params.prixProduit:null
  const Products =params?params.produitsSelectionnes:null;
  const productName=params?params.productName:null
  const productImage=params?params.productImage:null
  const productQuantite=params?params.productQuantite:null
///////////////////////////////////////////////////////////


const [isModal, setModal] = useState(false);
const [name,setName]=useState("")
const [phoneNumber,setPhoneNumber]=useState("")
const [cart,setCart]=useState([])
const [modalpayment,setModalpayment]=useState(false)

const [address, setAddress] = useState();
const [compliteAddress, setCompleteAddress] = useState();
const [productTobuy,setProductTobuy]=useState([])


const openModal = () => {
  setModal(true);
};

const closeModal = () => {
  setModal(false);
};

const handleComplete = (data) => {
  let _fullAddress = data.address;
  let _extraAddress = "";

  if (data.addressType === "R") {
    if (data.bname !== "") {
      _extraAddress += data.bname;
    }
    if (data.buildingName !== "") {
      _extraAddress +=
        _extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    _fullAddress += _extraAddress !== "" ? ` (${_extraAddress})` : "";
  }
  console.log(_fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

  

   setAddress(_fullAddress)

  closeModal();

 
};




const onAddAddress=()=>{
  if(address!=null  && compliteAddress!=null){
    registerAddress() /// Show the Address a the scrollview of the  same page
    setAddress(null) 
    setCompleteAddress(null)
  }else{
    alert('Please write your address')
  }

}


// this methode help to delete the address in the scrollview
const onDeletedAddress=async(documentId)=>{
  firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Address').doc(documentId).delete().then(()=>{
    firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Address').get().then(data=>
      {
         return setCart(data.docs.map(doc=>doc.data()))
      })

  })
}


const registerAddress=async()=>{
   try{
    const db=firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Address').doc(compliteAddress)
     db.set({
         Address: address + ' ' + compliteAddress,
         id: compliteAddress
       })


       }catch(error){
     console.log('Error adding Address' ,error)
     }
  


}



///////////////////////////////////////////////////////////
  
const handleCheckboxPress = (itemAddress, state,) => {
  const db = firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Address');
  
  // If the current address is already selected, unselect it
  if (state) {
    db.doc(itemAddress).update({
      State: false,
    });
  } else {
    // If the current address is not selected, first unselect all addresses
    db.get().then((querySnapshot) => {
      const batch = firebase.firestore().batch();

      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { State: false });
      });

      // Then select the current address
      batch.update(db.doc(itemAddress), { State: true });
      batch.commit();
    });
  }
};








 //get data from firebase
 useEffect(()=>{
  firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Address').onSnapshot((querySnapshot) => {
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setCart(data);
    }
  })
  firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Panier').onSnapshot((querySnapshot) => {
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setProductTobuy(data);
    }
  })
  

 },[])

  const getPrices=()=>{
   if(prixTotal==null)
   {return prixProduit
  }else if(prixProduit==null){
    return prixTotal}
  }

  useEffect(()=>{
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
  },[])
   /// Close modal 
   const onCloseModal=()=>{
    setModalpayment(false)
   }

  return (
    <View style={styles.container}>
    <View style={styles.upperRow}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
         <Ionicons name='chevron-back-circle' size={30}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate('Panier')}}>
          <Text style={{position:'absolute', fontSize:14, fontWeight:'bold',color:'red',marginLeft:1, marginTop:-3, fontWeight:'bold'}}>{product.length}</Text>
         <Ionicons name='basket-outline' size={30} color='green'/>
        </TouchableOpacity>
     </View>

   <View  style={{marginTop:55}}>
    <TouchableOpacity style={{marginTop:15, width:150,height:50, borderWidth:0.5,
       justifyContent:'center', alignItems:'center',backgroundColor:'#DFD4CA'}}
       onPress={()=>openModal()}>
      <Text>Search for Address</Text>
    </TouchableOpacity>

    <View style={styles.text_wrapper}>
      <Text style={{width:'95%',}} placeholder='address'>{address}</Text>
    </View>
    <View style={styles.text_wrapper}>
      <TextInput style={{width:'95%',}}  placeholder='Complete the address'
                 type="text"
                 name="address"
                 value={compliteAddress}
                 onChangeText={(compliteAddress)=>setCompleteAddress(compliteAddress)}/>
    </View>
   </View>
   <View>
   <Modal visible={isModal} style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => closeModal()} style={{ padding: 10 }}>
         <Ionicons name='chevron-back-circle' size={30} />
       </TouchableOpacity>
       <Postcode onSelected={data => handleComplete(data)}/>
     </View>
    </Modal>


   </View>
   
  <View style={{marginTop:5,alignItems:'center',marginBottom:10}}>
    <TouchableOpacity style={styles.addAddress} onPress={()=>{onAddAddress()}}>
      <Text> Add Address </Text>
    </TouchableOpacity>
  </View>

    <Text style={{fontSize:20,fontWeight:'bold', marginTop:5}}> Select an address: </Text>  
    <View style={{marginTop:5, width:'97%',borderWidth:1,alignContent:'center',alignItems:'center', padding:4,}}>
      

        <ScrollView style={{width:'100%',height:140}}>
          {
            cart?.map((item,idx)=>(
            <View key={idx} style={[styles.SelectAddress, item.State && styles.SelectedAddress]}   >
             <TouchableOpacity onPress={()=>{onDeletedAddress(item.id)}}>
               <Ionicons name='trash' size={25}/>
             </TouchableOpacity>

             <TouchableOpacity style={{flexDirection:'row', flex:1,alignItems:'center'}}  onPress={()=>{handleCheckboxPress(item.id, item.State)}}>
             <View  style={{flex:1,alignContent:'center'}}>
                <Text numberOfLines={1}>  🎯 {item.Address}</Text>
             </View>
              
             <View
                 style={[styles.checkboxBase, item.State && styles.checkboxChecked]}
                >
                 {item.State && <Ionicons name="checkmark" size={24} color="white" />}
             </View>

             </TouchableOpacity>
             
            </View>

            ))

          }


        </ScrollView> 

    </View>
    <Text style={{fontSize:20,fontWeight:'bold', marginTop:5,width:'95%'}}>Products</Text>  
    <View style={{marginTop:5, width:'97%',borderWidth:1,alignContent:'center',alignItems:'center', padding:4,}}>
      

        <ScrollView style={{width:'100%',height:150}}>
          {
            prixTotal!=null?( Products?.map((item,idx)=>(
              <View key={idx} style={[styles.SelectAddress, item.State && styles.SelectedAddress]}   >
               <View style={{flexDirection:'row', flex:1}} >
               <View  style={{flex:1,flexDirection:'row',alignItems:'center',gap:10}}>
                  <Image source={{uri:item.Produit}} style={{width:25,height:25, borderRadius:10}}/>
                  <Text numberOfLines={1}  style={{flex:1}}>🔒 {item.Name}</Text>
                  <Text numberOfLines={1} > Quantite:  {item.Quantite}</Text>
               </View>
               </View>
               
              </View>
  
              ))):(
              <View style={styles.SelectAddress}   >
               <View style={{flexDirection:'row', flex:1}} >
                <View  style={{flex:1,flexDirection:'row',alignItems:'center',gap:10}}>
                  <Image source={{uri:productImage}} style={{width:25,height:25, borderRadius:10}}/>
                  <Text numberOfLines={1}  style={{flex:1}}>🔒 {productName}</Text>
                  <Text numberOfLines={1} > Quantite:  {productQuantite}</Text>
               </View>
               </View>
               
              </View>
              )
            

          }


        </ScrollView> 

    </View>


    
  <View style={{marginTop:10,alignItems:'center',marginTop:675,position:'absolute',}}>
      <Text style={{fontSize:20, fontWeight:'bold'}}>Prix Total: {getPrices()} FCFA</Text>
    <TouchableOpacity style={styles.btn} onPress={()=>{setModalpayment(!modalpayment)}}>
      <Text> Acheter les Produit </Text>
    </TouchableOpacity>
   </View>
   {
    modalpayment && (<ModalPayment onClose={onCloseModal}/>)
   }
   
    </View>
    
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
    upperRow:{
      marginHorizontal:20,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      position:'absolute',
      top:30,
      width:'95%',
      zIndex:999
  
  },
    btn:{
      width:300,
      height:40,
      borderWidth:0.5,
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
      marginTop:5,
      backgroundColor:'#E5E6DC',
      shadowOpacity:100,
      shadowColor: 'black',
      shadowOpacity: 10,
      elevation: 6,
      shadowRadius: 15 ,
      shadowOffset : { width: 100, height: 100},
      borderWidth:0,
      borderRadius:0,
   
    },
    text_wrapper:{
       width:'100%',
       borderWidth:0.5,
       height:30,
       justifyContent:'center',
       alignItems:'center',
       flexDirection:'row',
       marginTop:20
       
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
      },
      checkboxChecked: {
        backgroundColor: 'coral',
      },
      addAddress:{
      width:200,
      height:30,
      borderWidth:0.5,
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
      marginTop:10,
      marginBottom:10,
      backgroundColor:'#C3F7C9',
      shadowOpacity:100,
      shadowColor: 'black',
      shadowOpacity: 10,
      elevation: 6,
      shadowRadius: 15 ,
      shadowOffset : { width: 100, height: 100},
      borderWidth:0,
      borderRadius:0,
      },
      SelectAddress:{ 
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center', 
        backgroundColor:'#E5E6DC', 
        padding:5, 
        borderRadius:10,
        shadowOpacity:100,
        shadowColor: 'black',
        shadowOpacity: 10,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 100, height: 100},
        borderWidth:0,
        marginTop:10,
        alignContent:'center'
    
      },
    SelectedAddress:{
       width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center', 
        backgroundColor:'#C3F7C9', 
        padding:5, 
        borderRadius:10,
        shadowOpacity:100,
        shadowColor: 'black',
        shadowOpacity: 10,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 100, height: 100},
        borderWidth:0,
        marginTop:10,
        alignContent:'center', 
    }

  });