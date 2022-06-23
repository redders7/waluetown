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
        <SearchBar value = {value} updateSearch = {updateSearch}/>
      </View>

      <View style = {styles.favourites}>
          <View>
            <Text style = {{fontSize: 24, fontWeight: '700', paddingHorizontal: -20, }}>
              Your Favourites
            </Text>
            <View style={{height: 180, marginTop: 10}}> 
              <FlatList horizontal={true} keyExtractor={(item) => item.id} data = {shopData} 
                renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate("Shop", {id: item.id, image: logos[item.id-1].image})}>
                <View style={styles.shop}>
                <View style = {styles.shopimage}><Image style = {{width: 100, height: 100, alignSelf: 'center'}}source = {{uri: logos[item.id-1].image}}/></View>
                <Text style = {{fontSize: 15, marginBottom: 10}}>{item.shop_name}</Text>
              </View>
              </TouchableOpacity>)}/>
            </View>
          </View>
        </View>

        <View style = {styles.nearby}>
        <Text style = {{fontSize: 24, fontWeight: '700', }}> Nearby Stores</Text>
        <View style={styles.flatlist}>
        <FlatList numColumns={2} keyExtractor={(item) => item.id} data = {shopData} 
        renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate("Shop", {id: item.id, image: logos[item.id-1].image})}>
          <View style={styles.shop}>
          <View style = {styles.shopimage}><Image style = {{width: 100, height: 100, alignSelf: 'center'}}source = {{uri: logos[item.id-1].image}}/></View>
            <Text style = {{fontSize: 15, marginBottom: 10}}>{item.shop_name}</Text>
            </View>
            </TouchableOpacity>)}/>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
          <Image source={sushi} resizeMode="contain" style={{
            paddingBottom: 50,
              width: Dimensions.get("window").width * 0.85,
          }} />
        </TouchableOpacity> */}

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nearby: {
    flex: 0.45,
    paddingLeft: 20,
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
    flex: 0.1,
    alignItems: 'center',
  },
});