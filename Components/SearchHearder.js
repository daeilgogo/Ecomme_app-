import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity ,SafeAreaView,ScrollView,Dimensions, } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import {firebase} from '../config_firebase'
import { useEffect,useCallback } from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native';
import { Keyboard } from 'react-native-keyboard-aware-scroll-view'; // Import Keyboard from the correct library


const WIDTH =Dimensions.get('window').width
const HEIGTH =Dimensions.get('window').height

export default function SearchHeader(props) {

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const navigation=useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      setSearch('')
    }, [])
  );

 


  useEffect(() => {
    
    const fetchData = async () => {
      const basketData = await fetchCollection('Basket');
      const chaussureData = await fetchCollection('Chaussure');
      const immobilierData = await fetchCollection('Imobilier');
      const vesteData = await fetchCollection('Veste');
      const tuniqueData = await fetchCollection('Tunique');

      // Combine the data from multiple collections into one array
      const allData = [...tuniqueData,...vesteData,...basketData, ...chaussureData, ...immobilierData];

      setData(allData);
      Verification(allData);
    };

    fetchData();
  }, []);

  const fetchCollection = async (collectionName) => {
    const snapshot = await firebase.firestore().collection(collectionName).get();
    return snapshot.docs.map((doc) => doc.data());
  };

  const Verification = (newData) => {
    if (search.trim() === '') {
      setResult([]);
      return;
    }

    const foundUsers = newData.filter((user) =>
      user.Product_name.toLowerCase().includes(search.toLowerCase())
    );

    setResult(foundUsers);
  };

  useEffect(() => {
    Verification(data);
  }, [search]);
  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.view_search}>
         <TextInput placeholder='Recherche' style={styles.text_search} value={search} onChangeText={(search) => setSearch(search)}
          autoFocus={true} // Automatically show the keyboard
           />
         <Ionicons name="search-sharp" size={20}  />
      </View>

      <ScrollView style={{width:'100%'}}
          showsVerticalScrollIndicator={false} 
      >
        {result.length > 0 ? (
          result.map((item, idx) => (
            <TouchableOpacity key={idx}  style={{borderRadius:15,marginTop:10,flexDirection:'row',width:'95%',marginHorizontal:10,padding:2,backgroundColor:'#E1ECF0'}} onPress={()=>{navigation.navigate('Detail',{image:item.Image_uri, prix:item.Product_price, 
              name:item.Product_name,size:item.Product_size,description:item.Product_description,value:item.Value})}}>
                <Image source={{uri:item.Image_uri}} style={styles.image}/>
                <View style={{marginLeft:10}}>
                <Text>{item.Product_name}</Text>
                <Text style={{fontSize:15,fontWeight:'bold'}}>{item.Product_price} {item.Value}</Text>
                <Text>{item.Product_size}</Text>
                </View>
                
              </TouchableOpacity>
          ))
        ) : (
          <View style={{width:'100%',marginTop:-20}}>
            <Image source={{uri:'https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png'}} style={{width:'100%',height:500}}/>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop:20,
      flex:1,
      width:'100%'
   
    },

    logo:{
        width:105,
        height:50,
    },
    view_search:{
        backgroundColor:'#EEF5F4',
        width:'95%',
        height:50,
        borderRadius:20,
        borderLeftColor:'blue',
        alignItems:'center',
        borderWidth:3,
        marginTop:30,
        justifyContent:'center',
        borderRightColor:'red',
        borderTopColor:'yellow',
        borderBottomColor:'yellow',
        flexDirection:'row',
        padding:10,
        marginBottom:0,

    },
    text_search:{

        backgroundColor:'#EEF5F4',
        flex:1,
        height:30,
        justifyContent:'center',

    },

    WRAP:{
      width:WIDTH,
      height:HEIGTH*0.25,
    },
    wrapDot:{
      position:'absolute',
      bottom:0,
      flexDirection:'row',
      alignSelf:'center'
    },

    option:{
      marginLeft:-50,

    },
    view_categorie:{
       marginTop:20,
       marginLeft:6,
       width:400,
       backgroundColor:'#F2F2F2'
    }
    ,
    text_categorie:{
      fontSize:20,
      fontWeight:'bold',
    },
    image:{
      height:75,
      width:75,
      borderRadius:10,
    }
  });