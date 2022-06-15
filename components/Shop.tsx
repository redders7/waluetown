import {Alert, Text, Button, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { Icon } from 'react-native-elements';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { parseJsonText } from 'typescript';


export default function ShopPage({navigation}) {
    const [name, setName] = useState({shop: "", stock: 0})
    const getAllQuantity = async () => {
        let { data, error } = await supabase.from('shop2').select('*').eq('shop_id','1')
        var foo = Number.parseInt(data[0].quantity)
        setName({shop: data[0].shop_name, stock: foo})
      }
    const { publicURL, error } = supabase
        .storage
        .from('shop-logos')
        .getPublicUrl('sushiexpress.png')
        
    useEffect(() => {
        getAllQuantity();
    },[]);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
            {name.shop}
        </Text>
        <View>
            <Image source = {{uri: publicURL}} style = {{width: 200, height: 200, marginTop: 50, alignSelf: 'center' }} />
        </View> 
        <View>
            <TouchableOpacity onPress={() => {navigation.navigate("Map")}}>
            <Text style = {{alignSelf: 'center', marginVertical: 20, fontFamily : 'sans-serif-condensed', textDecorationLine: 'underline'}}>
                How do I get here?
            </Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => {Alert.alert("Hurry!", "Quantity left: " + name.stock)}}>
                <Image source = {require('../assets/salmonsushi.png')} style = {{width: 150, height: 150, marginTop: 30, marginHorizontal: 40 }} />
            </TouchableOpacity>
        </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0e9d3',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: "sans-serif-condensed",
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 80
    }
})

