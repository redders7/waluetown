import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, BackHandler, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import React, { useEffect, useState } from "react";
import logo from '../assets/logo.png';
import {getShopData, getUserFav, updateUserFav} from '../lib/supabase'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import {getDistance} from 'geolib';

export default function HomeScreen({ navigation }) {
  const [value, setValue] = useState()
  const [shopData, setShopData] = useState([])
  const [userFav, setUserFav] = useState([])
  const [updating, setUpdating] = useState(false);
  const [pin, setPin] = useState({
    latitude: 0, longitude: 0
  });
  const[newData, setNewData] = useState([]);

  function updateSearch(value) {}  

  async function loadAllShopData() {
    const {shop2, error} = await getShopData();
    setShopData(shop2);
  }

  async function loadUserFav() {
    const {favorites, error} = await getUserFav();
    setUserFav(favorites.favorites);
  }

  async function changeHeart(shopName) {
    //await loadUserFav();
    const index = userFav.indexOf(shopName);
    if (index > -1) { // only splice array when item is found
      userFav.splice(index, 1); // 2nd parameter means remove one item only
    }
    else {
      userFav.push(shopName);
    }
    await updateUserFav(userFav);
    setUserFav(userFav);
    setUpdating(!updating);
  }

  function searchName(input) {
    let data = shopData;
    let searchData = data.filter((item) => {
      return item.shop_name.toLowerCase().includes(input.toLowerCase());
    })
    setNewData(searchData)
  }
  

useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    loadAllShopData();
    loadUserFav();
  }, []);

  const { publicURL:sushiexpress, error:sushierror } = supabase
  .storage
  .from('shop-logos')
  .getPublicUrl('Sushi Express')

  const { publicURL:fourleaves, error:fourleaveserror } = supabase
  .storage
  .from('shop-logos')
  .getPublicUrl('Four Leaves')

  const { publicURL:breadtalk, error:breadtalkerror } = supabase
  .storage
  .from('shop-logos')
  .getPublicUrl('BreadTalk')

  const { publicURL:beechenghiang, error:beechenghiangerror } = supabase
  .storage
  .from('shop-logos')
  .getPublicUrl('BeeChengHiang')

  const [logos, setLogos] = useState([
    {image: sushiexpress, id: '1'},
    {image: breadtalk, id: '2'},
    {image: fourleaves, id: '3'},
    {image: beechenghiang, id: '4'},
  ])

  //To disable back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={styles.container}>    
      <View style={styles.head}>
        <TouchableOpacity> 
          <Image source={logo} resizeMode='contain' style={{
            width: Dimensions.get("window").width * 0.4,
            height: Dimensions.get("window").width * 0.2,
            resizeMode: "contain",
          }} />
        </TouchableOpacity>
      </View>

      <View style= {styles.searchbar}>
        <View>
          <Image source={require('../assets/search.png')} style = {styles.searchicon} resizeMode="contain"/>
        </View>
        <TextInput 
          placeholder = "Search..."
          onChangeText = {(input) => {searchName(input)}}/>
      </View>

      <View style = {styles.favourites}>
          <View style = {{marginTop: 10}}>
            <Text style = {{fontSize: 24, fontWeight: '700'}}>
              Your Favourites
            </Text>
            <View style={{height: 180, marginTop: 10}}> 
              <FlatList showsHorizontalScrollIndicator = {false} horizontal={true} keyExtractor={(item) => item.id} data = {shopData} 
                renderItem={({item}) => (userFav.includes(item.shop_name) && 
                <TouchableOpacity onPress={() => navigation.navigate("Shop", {id: item.id, image: logos[item.id-1].image})}>
                <View style={styles.shop}>
                <View style = {styles.shopimage}>
                <Image style = {{width: 100, height: 100, alignSelf: 'center'}}source = {{uri: logos[item.id-1].image}}/></View>
                <Text style = {{fontSize: 15, marginBottom: 10}}>{item.shop_name}</Text>
              </View>
              </TouchableOpacity>)}/>
            </View>
          </View>
        </View>

        <View style = {styles.nearby}>
        <Text style = {{fontSize: 24, fontWeight: '700', }}> Nearby Stores</Text>
        <View style={styles.flatlist}>
        <FlatList numColumns={2} keyExtractor={(item) => item.id} data = {(newData.length ? newData : shopData).sort((a, b) => 
        getDistance({ latitude: pin.latitude, longitude: pin.longitude }, { latitude: a.latitude, longitude: a.longitude }) - 
        getDistance({ latitude: pin.latitude, longitude: pin.longitude }, { latitude: b.latitude, longitude: b.longitude })
  )} extraData={updating}
        renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate("Shop", {id: item.id, image: logos[item.id-1].image})}>
          <View style={styles.shop}>
          <View style = {styles.shopimage}><Image style = {{width: 100, height: 100, alignSelf: 'center'}}source = {{uri: logos[item.id-1].image}}/></View>
            <Text style = {{fontSize: 15, marginBottom: 10, justifyContent: "flex-start"}}>{item.shop_name}</Text>
            <TouchableOpacity onPress = {() => changeHeart(item.shop_name)}>
              <Ionicons name={userFav.includes(item.shop_name) ? 'heart' : 'heart-outline'} size={20} color = {userFav.includes(item.shop_name) ? 'red' : 'black'}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>)}/>
        </View>        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nearby: {
    flex: 0.45,
    paddingLeft: 20,
    justifyContent:'center',
    alignItems: 'flex-start'
  },
  flatlist: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
  },
  shop:{
    height: 150, 
    width: 150,
    borderWidth: 1, 
    borderColor: '#dddddd', 
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  shopimage:{ 
    flex: 1,
  },
  head: {
    flex: .1,
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: 'center',
    paddingTop: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0e9d3',
    flexDirection: "column",
    alignItems: 'center'
  },
  button: {
    width: 300,
    alignContent: "center",
    paddingBottom: 250,
    paddingLeft: 100,
  },
  favourites: {
    flex: 0.3,
    paddingLeft: 20,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  searchbar: {
    backgroundColor: 'white',
      width: '90%',
      height: 40,
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
  },
  searchicon: {
    width: Dimensions.get("window").width * 0.08,
    height: Dimensions.get("window").width * 0.08,
},
});