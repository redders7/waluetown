import {Alert, Text, Button, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase} from '../lib/supabase';
import { Icon } from 'react-native-elements';
import { setupURLPolyfill } from 'react-native-url-polyfill';


export default function ShopPage() {
    const [salmon, setSalmon] = useState(0)
    var quant;
    const getAllQuantity = async () => {
        let { data, error } = await supabase.from('Shop').select('quantity').eq('shop_id','1')
        setSalmon(Number.parseInt(data[0].quantity))
      }
    useEffect(() => {
        getAllQuantity();
    },[]);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
            Sushi Express</Text>
        <View>
            <Image source = {require('../assets/sushiexpress.png')} style = {{width: 200, height: 200, marginTop: 50, alignSelf: 'center' }} />
        </View>
        <View>
            <TouchableOpacity onPress={() => {Alert.alert("Eh don't worry", "Google maps will appear here to guide you")}}>
            <Text style = {{alignSelf: 'center', marginVertical: 20, fontFamily : 'sans-serif-condensed', textDecorationLine: 'underline'}}>
                How do I get here?
            </Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => {Alert.alert("Hurry!", "Quantity left: " + salmon)}}>
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
    }
})

