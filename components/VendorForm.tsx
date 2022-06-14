import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import { NavigationContainer, PrivateValueStore } from '@react-navigation/native';
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

const createItem = () => ({
  text: ''
});
export default function VendorForm () {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [items, addItems] = useState('');
  
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{name: '', address: '', items: ['']}}
          onSubmit={(values) => {
                console.log(values)    
          }}>
          {(formikprops) =>(
            <View>
              <Text style={styles.header}>Shop Name</Text>
              <TextInput
                style={styles.input}
                placeholder = 'Shop Name'
                onChangeText={formikprops.handleChange('name')}
                value={formikprops.values.name}
                />
                <Text style={styles.header}>Shop Address</Text>
                <TextInput
                multiline
                style={styles.input}
                placeholder = 'Shop Address'
                onChangeText={formikprops.handleChange('address')}
                value={formikprops.values.address}
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