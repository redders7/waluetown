import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import { NavigationContainer, PrivateValueStore, NavigationRouteContext, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {Link} from 'react-scroll';
import { Header } from 'react-native-elements';
import SearchBar from './SearchBar'
import { Formik, FieldArray } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { isPropertySignature } from 'typescript';
import ShopPage from './Shop';


export default function VendorForm ({route, navigation}) {
    const [items, addItems] = useState('');
    const {email} = route.params;
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{name: '', address: '', postalcode: '', items: ['']}}
          onSubmit={ async (values) => {
            console.log(email)
            const { data, error } = await supabase
            .from('users')
            .update([
              { shop_name: values.name, shop_address: values.address, shop_postalcode: values.postalcode}])
            .eq('email',  email)
          }
          }>
          {(formikprops) =>(
            <View>
              <Text style={styles.header}>Shop Name</Text>
              <TextInput
                style={styles.input}
                placeholder = 'Shop Name'
                onChangeText={formikprops.handleChange('Name')}
                value={formikprops.values.name}
                />
                <Text style={styles.header}>Shop Address</Text>
                <TextInput
                multiline
                style={styles.input}
                placeholder = 'Shop Address'
                onChangeText={formikprops.handleChange('Address')}
                value={formikprops.values.address}
                />
                <Text style={styles.header}>Postal Code</Text>
                <TextInput
                style={styles.input}
                placeholder = 'Postal Code'
                onChangeText={formikprops.handleChange('Postal Code')}
                value={formikprops.values.postalcode}
                />
{/*                 
                <FieldArray name='menu'>
                    {({ push }) => (
                        <View>
                            {formikprops.values.items.map((p,index) => {
                                return (
                                    <TextInput
                                    style={styles.input}
                                    placeholder = 'Menu Item'
                                    onChangeText={formikprops.handleChange('items')}
                                    value={formikprops.values.items[index]}
                                    />
                                )
                            })}
                        </View>
                    )}
                </FieldArray> */}
                <Button title='submit' color='blue' onPress={formikprops.handleSubmit} />
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
    button: {
     flex: 0.5,
     marginLeft: 20,
     alignItems: 'center',
     backgroundColor: '#000000',
    },
    header: {
    marginTop: 10,
    fontFamily:  'Roboto',
    }
  });