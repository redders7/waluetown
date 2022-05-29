import 'react-native-url-polyfill/auto'
import { useState, useEffect} from 'react'
import * as React from 'react';
import { NavigationContainer, useRoute, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import HomeScreen from './components/HomeScreen'
import DetailsScreen from './components/DetailsScreen'
import FirstScreen from './components/FirstScreen'
import Signup from './components/Signup'
import Shop from './components/Shop'
import { View, Text, Button, BackHandler } from 'react-native'
import { Session } from '@supabase/supabase-js'

const Stack = createNativeStackNavigator();

function App() {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component = {Auth} />
        <Stack.Screen name="Account" component = {Account} />
        <Stack.Screen name="Welcome" component = {FirstScreen} />
        <Stack.Screen name="Sign up" component = {Signup} />
        <Stack.Screen name = "Shop" component = {Shop} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}   

export default App;