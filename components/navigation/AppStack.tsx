import 'react-native-url-polyfill/auto'
import { useState, useEffect} from 'react'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { supabase } from '../../lib/supabase'
import LoginScreen from '../LoginScreen'
import Account from '../Account'
import HomeScreen from '../HomeScreen'
import DetailsScreen from '../DetailsScreen'
import WelcomeScreen from '../WelcomeScreen'
import SignupScreen from '../SignupScreen'
import FavouritesScreen from '../FavouritesScreen'
import RewardsScreen from '../RewardsScreen'
import SettingsScreen from '../SettingsScreen'
import CustomDrawer from '../CustomDrawer'
import Shop from '../Shop'

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { View, Text, Button, BackHandler } from 'react-native'
import { Session } from '@supabase/supabase-js'

const Drawer = createDrawerNavigator();

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
    <Drawer.Navigator 
    drawerContent={props=> <CustomDrawer {...props}/>}
    screenOptions={{drawerLabelStyle: {marginLeft: -15, fontFamily: 'sans-serif-medium'},  drawerActiveBackgroundColor: '#f0e9d3', drawerActiveTintColor: '#000'}}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{
          drawerIcon: ({color}) => (<Ionicons name = "home-outline" size = {22} color ={color}/>)
        }} />
        {/* <Drawer.Screen name = "Shop" component = {Shop} /> */}
        <Drawer.Screen name="Account" component = {Account} options={{
          drawerIcon: ({color}) => (<Ionicons name = "person-outline" size = {22} color ={color}/>)
        }}/>
        <Drawer.Screen name = "Favourites" component = {FavouritesScreen} options={{
          drawerIcon: ({color}) => (<Ionicons name = "heart-outline" size = {22} color ={color}/>)
        }}/>
        <Drawer.Screen name = "Rewards" component = {RewardsScreen} options={{
          drawerIcon: ({color}) => (<Ionicons name = "gift-outline" size = {22} color ={color}/>)
        }}/>
        <Drawer.Screen name = "Settings" component = {SettingsScreen} options={{
          drawerIcon: ({color}) => (<Ionicons name = "settings-outline" size = {22} color ={color}/>)
        }}/>
    </Drawer.Navigator> 
  );
}   

export default App;