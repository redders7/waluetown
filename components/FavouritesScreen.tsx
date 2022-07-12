import {Text, Button, View, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, { useEffect, useState } from "react";
import {getShopData, getUserFav, supabase} from '../lib/supabase'

export default function FavouritesScreen({navigation}) {
  const [userFav, setUserFav] = useState([])
  const [shopData, setShopData] = useState([])

  async function loadAllShopData() {
    const {shop2, error} = await getShopData();
    setShopData(shop2);
  }
  async function loadUserFav() {
    const {favorites, error} = await getUserFav();
    setUserFav(favorites.favorites);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAllShopData();
      loadUserFav();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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

  return (
    <View style = {styles.container}>
    <View style={styles.flatlist}>
    <FlatList numColumns={2} keyExtractor={(item) => item.id} data = {shopData} 
    renderItem={({item}) => (userFav.includes(item.shop_name) && 
    <TouchableOpacity onPress={() => navigation.navigate("Shop", {id: item.id, image: logos[item.id-1].image})}>
      <View style={styles.shop}>
      <View style = {styles.shopimage}><Image style = {{width: 100, height: 100, alignSelf: 'center'}}source = {{uri: logos[item.id-1].image}}/></View>
        <Text style = {{fontSize: 15, marginBottom: 10, justifyContent: "flex-start"}}>{item.shop_name}</Text>
      </View>
    </TouchableOpacity>)}/>
    </View>        
  </View>
    );
}
const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    marginTop: 100, 
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
  container: {
    flex: 1,
    backgroundColor: '#f0e9d3',
    flexDirection: "column",
  },

});