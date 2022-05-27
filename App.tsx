import 'react-native-url-polyfill/auto'
import { useState, useEffect} from 'react'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import HomeScreen from './components/HomeScreen'
import DetailsScreen from './components/DetailsScreen'
import { View, Text, Button } from 'react-native'
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

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component = {Auth} />
        <Stack.Screen name="Account" component = {Account} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

export default App;

{/* // export default function App() {
//   const [session, setSession] = useState<Session | null>(null)

//   useEffect(() => {
//     setSession(supabase.auth.session())

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   return (
//     <NavigationContainer>
//       <View>
//         {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
//       </View>
//     </NavigationContainer>
//   )
// } */}