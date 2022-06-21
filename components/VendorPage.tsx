import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import { NavigationContainer, PrivateValueStore, NavigationRouteContext, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {Link} from 'react-scroll';
import { Header } from 'react-native-elements';
import SearchBar from './SearchBar'
import { Formik, FieldArray, Form, Field } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { idText, isPropertySignature } from 'typescript';
import ShopPage from './Shop';

// New Vendors Sign up form
const createItem = () => ({
  quantity: 0,
  text: ''
});
export default function DetailsScreen({route}) {
  const [menuitems, addItems] = useState('');
  const [quantity, addQuantity] = useState('');
  const {email} = route.params;
  
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{name: '', address: '', postalcode: '', contact: '', items: ['']}}
        onSubmit={ async (values) => {
          console.log(values)
          console.log(menuitems)
          const { data, error } = await supabase
          .from('users')
          .update([
            { shop_name: values.name, shop_address: values.address, shop_postalcode: values.postalcode, contact: values.contact, item1: menuitems, item1_quantity: quantity}])
          .eq('email',  email)

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

              <Text style={styles.header}>Contact Number</Text>
              <TextInput
              style={styles.input}
              placeholder = 'Contact Number'
              onChangeText={formikprops.handleChange('contact')}
              />

              <Text style={styles.header}>Item 1</Text>
                  <TextInput
                  style={styles.input}
                      placeholder='Item'
                      onChangeText={addItems}
                      value={menuitems}
                  />
                  
              <Text style={styles.header}>Item 1 Quantity</Text>
                  <TextInput
                  style={styles.input}
                      placeholder='Quantity'
                      onChangeText={addQuantity}
                      value={quantity}
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
              <Button  title='submit' color='maroon' onPress={formikprops.handleSubmit} />

          </View>
        )}
        </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input :{
    flex: 0.15,
    width: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10   ,
    borderRadius: 6,
  },
  container: {
  flex: 1,
  justifyContent: 'center',
   alignItems: 'center',
    backgroundColor: '#f0e9d3',
  },
  padding: {
   marginTop: 30,
  },
  header: {
    fontFamily:  'Roboto',
  },
});
