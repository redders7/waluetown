import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
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
import ItemsPage from './ItemList';

// New Vendors Sign up form
const createItem = () => ({
  quantity: 0,
  text: ''
});
export default function DetailsScreen({route,navigation}) {
  const [menuitems, addItems] = useState('');
  const {email} = route.params;

  useEffect(() => {
    console.log(email)
},[]);
  
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{name: '', address: '', postalcode: '', latitude: '', longitude: '', contact: '', items: [''], description: '', price: '', quantity: 0}}
        onSubmit={ async (values) => {
          console.log(values)
          
          const { data: vendor_data, error: vendor_error } = await supabase
          .from('users')
          .update([
            { shop_name: values.name, shop_address: values.address, shop_postalcode: values.postalcode, contact: values.contact, item1: menuitems, item1_quantity: values.quantity}])
          .eq('email',  email)
          
          const { data: shop_data, error: shop_error } = await supabase
          .from('shop2')
          .update([
            { shop_name: values.name, item_name: menuitems, description: values.description, price: values.price, quantity: values.quantity, postalcode: values.postalcode, latitude: values.latitude, longitude: values.longitude}])
          .eq('owner_email',  email)
          Alert.alert("Success", "Shop details updated")
        }}>

        {(formikprops) =>(
          <View>
            <Text style={styles.header}>Shop Name</Text>
            <TextInput
              style={styles.input}
              placeholder = 'Shop Name'
              onChangeText={formikprops.handleChange('name')}
              returnKeyType='next'
              />

              <Text style={styles.header}>Shop Address</Text>
              <TextInput
              multiline
              style={styles.input}
              placeholder = 'Shop Address'
              onChangeText={formikprops.handleChange('address')}
              returnKeyType='next'
              />
              
              <Text style={styles.header}>Postal Code</Text>
              <TextInput
              style={styles.input}
              placeholder = 'Postal Code'
              onChangeText={formikprops.handleChange('postalcode')}
              returnKeyType='next'
              />

              {/* <Text style={styles.header}>Latitude</Text>
              <TextInput
              style={styles.input}
              placeholder = 'Latitude'
              onChangeText={formikprops.handleChange('latitude')}
              returnKeyType='next'
              />

              <Text style={styles.header}>Longitude</Text>
              <TextInput
              style={styles.input}
              placeholder = 'Longitude'
              onChangeText={formikprops.handleChange('longitude')}
              returnKeyType='next'
              /> */}

              <Text style={styles.header}>Contact Number</Text>
              <TextInput
              style={styles.input}
              placeholder = 'Contact Number'
              onChangeText={formikprops.handleChange('contact')}
              />
              

              {/* <Button onPress={() => formikprops.setFieldValue('items', [formikprops.values.items, createItem()])} title="Add Item" /> */} 
              {/* {formikprops.values.items.map( (item, index) => (
                <Text style={styles.word} key={index}>{item}</Text>
              ))}
              <View style={styles.items}>
                <TextInput
                  style={styles.input}
                  placeholder='Item'
                  />
              </View> */}

              <View style={styles.padding} />
              <Button  title='update info' color='maroon' onPress={formikprops.handleSubmit} />
              <View style={{padding:5}} />
              <Button title='edit items' color='green' onPress={() => navigation.navigate("ItemsPage", {email:email})} />
          </View>
        )}
        </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input :{
    flex: 0.15,
    width: 325,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
  },
  container: {
  flex: 1,
  justifyContent: 'center',
   alignItems: 'center',
    backgroundColor: '#f0e9d3',
  },
  padding: {
   padding: 10,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily:  'Roboto',
  },
});
