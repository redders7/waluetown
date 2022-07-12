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

export default function EditItems({route}) {
        const {itemData} = route.params
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{name:'', price:'', quantity:'', description:'' }}
                onSubmit={ async (values) => {
                    console.log(route.params.email)
                    itemData.push(values)
                    const { data,error } = await supabase
                        .from('shop2')
                        .update({itemData: itemData})
                        .eq('owner_email',  route.params.email)
                    console.log(error);
                }}>

                {(props) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Item Name'
                            onChangeText={props.handleChange('name')}
                            value={props.values.name}
                        />

                        <TextInput
                            multiline
                            style={styles.input}
                            placeholder='Description'
                            onChangeText={props.handleChange('description')}
                            value={props.values.description}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Price'
                            onChangeText={props.handleChange('price')}
                            value={props.values.price}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Quantity'
                            onChangeText={props.handleChange('quantity')}
                            value={props.values.quantity}
                        />

                        <Button title='add item ' color='green' onPress={props.handleSubmit} />
                    </View>

                )}


            </Formik>
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

});