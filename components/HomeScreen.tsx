import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, BackHandler, FlatList} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import logo from '../assets/logo.png';
import cart from '../assets/cart.png';
import fav from '../assets/Categories.png'
import sushi from '../assets/sushi.png'
import {Link} from 'react-scroll';
import { Header } from 'react-native-elements';
import SearchBar from './SearchBar'
import Favourites from './FavouritesScrollBar'
import {getShopData} from '../lib/supabase'
import { FlipInEasyX } from 'react-native-reanimated';

export default function HomeScreen({ navigation }) {
  const [value, setValue] = useState()
  const [shopData, setShopData] = useState([])
  function updateSearch(value) {}  

  async function loadAllShopData() {
    const {shop2, error} = await getShopData();
    setShopData(shop2);
  }

  useEffect(() => {
    loadAllShopData();
    }, []);

  const { publicURL, error } = supabase
  .storage
  .from('shop-logos')
  .getPublicUrl('sushiexpress.png')  
  
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
        <TouchableOpacity> 
          <Image source={cart} resizeMode="contain" style={{
            width: Dimensions.get("window").width * 0.15,
            height: Dimensions.get("window").width * 0.15,
            paddingLeft: 400,
            resizeMode: "contain",
          }} />
        </TouchableOpacity>
      </View>

      <View style= {styles.searchbar}>
        <SearchBar value = {value} updateSearch = {updateSearch}/>
      </View>

      <View style={styles.favourites}>
        {/* <ScrollView scrollEventThrottle={16}>
          <View>
            <Text style = {{fontSize: 24, fontWeight: '700', paddingHorizontal: -20, }}>
              Your Favourites
            </Text>
            <View style={{height: 200, marginTop: 20, marginLeft: -20}}> 
              <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
                <Favourites imageUri = {require('../assets/sushiexpress.png')} shop = {shopData[0].shop_name}/>
                <Favourites imageUri = {require('../assets/sushiexpress.png')} data = {shopData}/>  
                <Favourites imageUri = {require('../assets/sushiexpress.png')} data = {shopData}/>
              </ScrollView>
            </View>
          </View>
        </ScrollView> */}
        <Text style = {{fontSize: 24, fontWeight: '700', }}> Nearby Stores</Text>
        <View style={styles.flatlist}>
        <FlatList numColumns={2} keyExtractor={(item) => item.id} data = {shopData} 
        renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate("Shop", {id: item.id})}>
          <View style={styles.shop}>
          <View style = {styles.shopimage}><Image style = {{width: 100, height: 100, alignSelf: 'center'}}source = {{uri: publicURL}}/></View>
            <Text>{item.shop_name}</Text>
            </View>
            </TouchableOpacity>)}/>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
          <Image source={sushi} resizeMode="contain" style={{
            paddingBottom: 50,
              width: Dimensions.get("window").width * 0.85,
          }} />
        </TouchableOpacity> */}

{/* <View style={{height: 150, width: 150, borderWidth: 1, borderColor: '#dddddd', marginLeft: 20}}>
            <Image source = {props.imageUri} style = {{flex: 1, width: null, height: 200, resizeMode: 'contain', marginTop: 0}}/>
            <View style = {{paddingLeft: 10, marginTop: 20}}>
                <Text style = {{ fontSize: 15, fontWeight: '500'}}>{props.shop}</Text>
            </View>
        </View>  */}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    paddingHorizontal: 20,
  },
  shopimage:{ 
    flex: 1,
  },
  head: {
    flex: .1,
    paddingBottom: 80,
    alignContent: "center",
    flexDirection: "row",
    paddingTop: 80
  },
  container: {
    flex: 1,
    backgroundColor: '#f0e9d3',
    flexDirection: "column",
  },
  button: {
    width: 300,
    alignContent: "center",
    paddingBottom: 250,
    paddingLeft: 100,
  },
  favourites: {
    flex: 10,
    paddingLeft: 25,
    alignContent: 'flex-start',
  },
  searchbar: {
    flex: 1,
    alignItems: 'center',
  },
});