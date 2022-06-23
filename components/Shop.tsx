import {Alert, Text, Button, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { Icon } from 'react-native-elements';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { isJSDocNamepathType, isTemplateExpression, parseJsonText } from 'typescript';

export default function ShopPage({route, navigation}) {
    const [name, setName] = useState([])
    const {id, image} = route.params
    async function getAllQuantity() {
        let { data, error } = await supabase.from('shop2').select('*').eq('id', id)
        setName(data)
      }

    useEffect(() => {
        getAllQuantity();
    },[]);

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
            {!!name && name.length>0 && name[0].shop_name}
        </Text>
        <View>
            <Image source = {{uri: image}} style = {{width: 200, height: 200, marginTop: 50, alignSelf: 'center' }} />
        </View> 
        <View>
            <TouchableOpacity onPress={() => {navigation.navigate("Map")}}>
            <Text style = {{alignSelf: 'center', marginVertical: 20, fontFamily : 'sans-serif-condensed', textDecorationLine: 'underline'}}>
                How do I get here?
            </Text>
            </TouchableOpacity>
        </View>
        <View style = {{alignItems: 'center'}}>
            <View style = {{borderWidth: 1, width: 300}}>
            <TouchableOpacity onPress={() => {Alert.alert("Hurry!", name[0].description + "\n" + "Quantity left: " + name[0].quantity)}}>
                <Text style = {{fontSize: 25, textAlign: 'center'}}>
                    {!!name && name.length>0 && name[0].item_name}
                </Text>
                <Text style = {{marginTop: 10, fontSize: 20, textAlign: 'center'}}>
                    ${!!name && name.length>0 && name[0].price}
                </Text>
                {/* <Image source = {require('../assets/salmonsushi.png')} style = {{width: 150, height: 150, marginTop: 30, marginHorizontal: 40 }} /> */}
            </TouchableOpacity>
            </View>
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

