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
import { isPropertySignature } from 'typescript';
import ShopPage from './Shop';

// New Vendors Sign up form

export default function DetailsScreen({route}) {
  const [menuitems, addItems] = useState('');
  const {email} = route.params;
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{name: '', address: '', postalcode: '', contact: '', closing:'', items: ['']}}
        onSubmit={ async (values) => {
          console.log(values)
          const { data, error } = await supabase
          .from('users')
          .update([
            { shop_name: values.name, shop_address: values.address, shop_postalcode: values.postalcode, contact: values.contact}])
          .eq('email',  email)
        }
        }>
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
  marginTop: 15,
  fontFamily:  'Roboto',
  }
});
