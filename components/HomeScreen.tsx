import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import logo from '../assets/logo.png';
import cart from '../assets/cart.png';
import fav from '../assets/Categories.png'
import sushi from '../assets/sushi.png'
import {Link} from 'react-scroll';
import { Header } from 'react-native-elements';
import SearchBar from './SearchBar';
import VendorForm from './VendorForm';


export default function HomeScreen({ navigation }) {
  const [value, setValue] = useState()
  function updateSearch(value) {}
  
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
        <Text>Your Favourites</Text>
        <Image source={fav} resizeMode="contain" style={{
          paddingBottom: 50,
            width: Dimensions.get("window").width * 0.8,
          }} />
        <Text> Nearby Restaurants</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
          <Image source={sushi} resizeMode="contain" style={{
            paddingBottom: 50,
              width: Dimensions.get("window").width * 0.85,
          }} />
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flex: .1,
    paddingBottom: 80,
    alignContent: "center",
    flexDirection: "row",
    paddingTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#f0e9d3',
    flexDirection: "column",
  },
  second: {
    flex: 1,
    alignItems: 'center',
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