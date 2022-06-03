import 'react-native-url-polyfill/auto'
import { useState, useEffect} from 'react'
import React from 'react';
import { supabase } from '../../lib/supabase'
import HomeScreen from '../HomeScreen'
import Shop from '../Shop'
import { NavigationContainer, useRoute, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component = {HomeScreen} />
    <Stack.Screen name = "Shop" component = {Shop} />
    </Stack.Navigator>
  );
}   

export default App;