import React from "react";
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const WelcomeScreen = ({navigation}) => (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/android/drawable-xxxhdpi/splashscreen.png")} resizeMode="cover" style={styles.image}>
        <View style = {{marginTop: 50}}>
            <TouchableOpacity onPress={() => navigation.navigate("UserLogin")} style={styles.signin_button}>
                <Text style = {{color: "white"}}> Sign in as User </Text> 
            </TouchableOpacity>
        </View>
        <View style = {{marginTop:20}}>
            <TouchableOpacity onPress={() => navigation.navigate("VendorLogin")} style={styles.signinvendor_button}>
                <Text style = {{color: "white"}}> Sign in as Vendor </Text> 
            </TouchableOpacity>
        </View>
        <View style = {{marginTop: 20}}>
            <TouchableOpacity onPress={() => navigation.navigate("Sign up")} style = {styles.signup_button}>
                <Text> Create an account </Text> 
            </TouchableOpacity>
        </View>
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
    signin_button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 150,
        marginBottom: -150,
        marginHorizontal: 110,
        backgroundColor: "#432616",
        width: 200,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1
    },
    signinvendor_button: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      marginTop: 150,
      marginBottom: -150,
      marginHorizontal: 110,
      backgroundColor: "#65350F",
      width: 200,
      borderRadius: 20,
      borderColor: "black",
      borderWidth: 1
  },
    signup_button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 150,
        marginBottom: -150,
        marginHorizontal: 110,
        backgroundColor: "#EEE1B1",
        width: 200,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1
    }


  });
  
  export default WelcomeScreen;

