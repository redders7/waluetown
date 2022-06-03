import 'react-native-url-polyfill/auto'
import { useState, useEffect} from 'react'
import React from 'react';
import { NavigationContainer, useRoute, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../../lib/supabase'
import LoginScreen from '../LoginScreen'
import Account from '../Account'
import HomeScreen from '../HomeScreen'
import DetailsScreen from '../DetailsScreen'
import WelcomeScreen from '../WelcomeScreen'
import SignupScreen from '../SignupScreen'
import Shop from '../Shop'
import { View, Text, Button, BackHandler } from 'react-native'
import { Session } from '@supabase/supabase-js'
import DrawerStack from './DrawerStack'

const Stack = createNativeStackNavigator();

function Auth() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  /* trying to figure out how to disable back button*/
  // const route = useRoute(); 

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       if (route.name=="Home") {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, [route]),
  // );

  return (
    <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Login" component = {LoginScreen} />
    <Stack.Screen name="Welcome" component = {WelcomeScreen} />
    <Stack.Screen name="Sign up" component = {SignupScreen} />
    <Stack.Screen name = "App" component = {DrawerStack} options = {{headerShown: false}} />
    </Stack.Navigator> 
  );
}   

export default Auth;