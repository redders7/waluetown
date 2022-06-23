import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  async function checkEmailExistence(){
    let { data, error, status} = await supabase
    .from("users")
    .select("email")
    .eq("email",email)
    .single();

    if (error && status !== 406) {
        throw error;
    }
    if (data) {
      return true;
    } else {
      return false;
    }
  }


  async function signUpWithEmailasUser() {
    setLoading(true)
    if (await checkEmailExistence()) {
      Alert.alert ("Email is already used!", "Please sign in")
    }
    else {
      const { user, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        
      })
      if (error) Alert.alert(error.message) 
      else Alert.alert("Thank you for signing up", "Please check your email for authentication")
    }
  }

  async function signUpWithEmailasVendor() {
    setLoading(true)
    if (await checkEmailExistence()) {
      Alert.alert ("Email is already used!", "Please sign in")
    }
    else {
      const { user, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        
      })
      if (error) Alert.alert(error.message) 
      else Alert.alert("Thank you for signing up", "Please check your email for authentication")
    }
    const { data, error} = await supabase
    .from("users")
    .update({vendor: true})
    .eq("email",email)
    .single();

    setLoading(false)
  }

  return (
    <View style = {styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View> 
      <View style = {{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => signUpWithEmailasUser()} style = {styles.signup_button}>
          <Text> Create an account as User</Text>
        </TouchableOpacity>
      </View>
      <View style = {{alignItems: 'center', marginTop: 60}}>
        <TouchableOpacity onPress={() => signUpWithEmailasVendor()} style = {styles.signupvendor_button}>
          <Text> Create an account as Vendor</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    padding: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  signup_button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 50,
    marginBottom: -150,
    marginHorizontal: 110,
    backgroundColor: "#EEE1B1",
    width: 200,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1
},
signupvendor_button: {
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
  marginTop: 50,
  marginBottom: -150,
  marginHorizontal: 110,
  backgroundColor: "#CAB69D",
  width: 250,
  borderRadius: 20,
  borderColor: 'black',
  borderWidth: 1
}
})