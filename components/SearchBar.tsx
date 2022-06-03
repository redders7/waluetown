import {Alert, Text, Button, View, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView, TextInput} from 'react-native';
import React, { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Searchbar({value, updateSearch}) {
    const [query, setQuery] = useState()
    const [placeholder, setPlaceholder] = useState("Search...")
    
    const clickSearchBar = (placeholder) => {
        setPlaceholder("")
    }

    return (
        <View style = {styles.container}>
            <View>
                <Image source={require('../assets/search.png')} style = {styles.searchicon} resizeMode="contain"/>
            </View>
            <TextInput 
            placeholder = {placeholder}
            value = {query}
            style = {styles.textInput}
            onPressIn = {clickSearchBar}
            onChangeText = {(text) => {
                // updateSearch(text)
            }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '90%',
      height: 40,
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',

    },
    searchicon: {
        width: Dimensions.get("window").width * 0.08,
        height: Dimensions.get("window").width * 0.08,
    },
    textInput: {
        flex: 1,
    }
  
  });