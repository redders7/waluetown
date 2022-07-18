import 'react-native-url-polyfill/auto'
import { useState, useEffect} from 'react'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { supabase } from '../../lib/supabase'
import Account from '../Account'
import FavouritesScreen from '../FavouritesScreen'
import RewardsScreen from '../RewardsScreen'
import SettingsScreen from '../SettingsScreen'
import CustomDrawer from '../CustomDrawer'
import HomeStack from './HomeStack'

import Ionicons from 'react-native-vector-icons/Ionicons';

import { View, Text, Button, BackHandler } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function App({route}) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  return (
    <Drawer.Navigator 
    drawerContent={props=> <CustomDrawer {...props}/>}
    screenOptions={{drawerLabelStyle: {marginLeft: -15, fontFamily: 'sans-serif-medium'},  drawerActiveBackgroundColor: '#f0e9d3', drawerActiveTintColor: '#000'}}>
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{
          title: 'Home', headerTransparent: true, drawerIcon: ({color}) => (<Ionicons name = "home-outline" size = {22} color ={color}/>)
        }} />
        {/* <Drawer.Screen name="Account" component = {Account} options={{
          drawerIcon: ({color}) => (<Ionicons name = "person-outline" size = {22} color ={color}/>)
        }}/> */}
        <Drawer.Screen name = "Favourites" component = {FavouritesScreen} options={{ headerTransparent: true,
          drawerIcon: ({color}) => (<Ionicons name = "heart-outline" size = {22} color ={color}/>)
        }}/>
        {/* <Drawer.Screen name = "Rewards" component = {RewardsScreen} options={{
          drawerIcon: ({color}) => (<Ionicons name = "gift-outline" size = {22} color ={color}/>)
        }}/> */}
        {/* <Drawer.Screen name = "Settings" component = {SettingsScreen} options={{
          drawerIcon: ({color}) => (<Ionicons name = "settings-outline" size = {22} color ={color}/>)
        }}/> */}
    </Drawer.Navigator> 
  );
}   

export default App;