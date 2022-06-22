import 'react-native-url-polyfill/auto'
import { useState, useEffect} from 'react'
import React from 'react';
import { NavigationContainer, useRoute, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../../lib/supabase'
import UserLoginScreen from '../UserLoginScreen'
import VendorLoginScreen from '../VendorLoginScreen'
import WelcomeScreen from '../WelcomeScreen'
import SignupScreen from '../SignupScreen'
import Shop from '../Shop'
import { View, Text, Button, BackHandler } from 'react-native'
import { Session } from '@supabase/supabase-js'
import DrawerStack from './DrawerStack'
import VendorPage from '../VendorPage'

const Stack = createNativeStackNavigator();

function Auth() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="UserLogin" component = {UserLoginScreen} />
    <Stack.Screen name="VendorLogin" component = {VendorLoginScreen} />
    <Stack.Screen name="Welcome" component = {WelcomeScreen} />
    <Stack.Screen name="Sign up" component = {SignupScreen} />
    <Stack.Screen name = "App" component = {DrawerStack} options = {{headerShown: false}} />
    <Stack.Screen name = "VendorPage" component = {VendorPage} />
    </Stack.Navigator> 
  );
}   

export default Auth;