import 'react-native-gesture-handler'
import 'react-native-url-polyfill/auto'
import { useState, useEffect} from 'react'
import React from 'react';
import { NavigationContainer, useRoute, useFocusEffect, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './lib/supabase'
import AuthStack from './components/navigation/AuthStack'
import DrawerStack from './components/navigation/DrawerStack'
import { View, Text, Button, BackHandler } from 'react-native'
import { Session } from '@supabase/supabase-js'

const Stack = createNativeStackNavigator()

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = 'Auth' component={AuthStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}   

export default App;