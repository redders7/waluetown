import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView, FlatList} from 'react-native';
import { NavigationContainer, PrivateValueStore, NavigationRouteContext, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {Link} from 'react-scroll';
import { Header } from 'react-native-elements';
import SearchBar from './SearchBar'
import { Formik, FieldArray, Form, Field } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { idText, isPropertySignature } from 'typescript';
import ShopPage from './Shop';
import EditItems from './VendorItems';
import Feather, { XCircle } from 'react-native-feather';

export default function ItemsPage({route,navigation}) {
    const [items, setItems] = useState([])
    const {email} = route.params

    async function getAllItems() {
        let { data, error } = await supabase.from('shop2').select('itemData').eq('owner_email', email).single()
        setItems(data.itemData)
      }

    useEffect(() => {
        getAllItems();
    },[]);

    async function deleteItem(index) {
        setItems([
            ...items.slice(0, index),
            ...items.slice(index + 1, items.length)
          ]);
          const { data,error } = await supabase
          .from('shop2')
          .update({itemData: items})
          .eq('owner_email', email)
    } 

    return (
        <View style={styles.container}>
            <View style = {{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
            <FlatList numColumns={1} keyExtractor={(item) => item.id} data = {items} 
                renderItem={({item,index}) => (
                    <TouchableOpacity onPress={() => {Alert.alert("Item Information", "Price: $" +item.price + "\n" + "Quantity left: " + item.quantity + "\n" + "Description: " + item.description,
                    [
                        {
                          text: "Delete",
                          onPress: () => deleteItem(index),
                          style: "cancel",
                        },
                      ],
                      {
                        cancelable: true,
                      })} }>
                        <Text style={styles.header}>Item {index+1}</Text>
                        <Text style={styles.itemList}>{item.name} </Text>
                    </TouchableOpacity>
                    )}/>
            </View>
            
        <TouchableOpacity onPress={() => {navigation.navigate("EditItems", {email:email, itemData: items})}}>
        <View style={styles.padding}>

        </View>
            <Text style = {{fontSize: 20, color: 'white' ,fontWeight: 'bold', textAlign: "auto",borderWidth:1, padding:5, borderColor: 'green', backgroundColor: 'green'}}>
                 Add Item 
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0e9d3',
    },
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input :{
        flex: 0.12,
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        fontSize: 14,
      },
      padding: {
        padding: 10,
       },
    itemList: {
        fontSize: 14,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily:  'Roboto',
    },

});