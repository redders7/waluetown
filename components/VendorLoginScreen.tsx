import React, { useState } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { NavigationRouteContext } from '@react-navigation/native'

export default function UserLoginScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function notaVendor() {
    let {data, error} = await supabase
    .from("users")
    .select("vendor")
    .eq("email", email)
    .single();

    if (data.vendor == false) {
      return true;
    }
    else {
      return false;
    }
  }  

  async function signInWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    else if (await notaVendor()) Alert.alert("Not a vendor")
    else navigation.navigate("VendorPage");
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
        <TouchableOpacity onPress={() => signInWithEmail()} style = {styles.signin_button}>
          <Text style = {{color: "white"}}> Sign in</Text>
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
  signin_button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 50,
    marginBottom: -150,
    backgroundColor: "#432616",
    width: 200,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1
  },
})