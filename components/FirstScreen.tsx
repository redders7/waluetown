import React from "react";
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = ({navigation}) => (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/android/drawable-xxxhdpi/splashscreen.png")} resizeMode="cover" style={styles.image}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
            <Text> Sign in </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Sign up")} style = {styles.button}>
            <Text> Sign up </Text> 
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 150,
        marginBottom: -150,
        marginHorizontal: 110,
        backgroundColor: "#DDDDDD",
        width: 200
    }

  });
  
  export default App;

