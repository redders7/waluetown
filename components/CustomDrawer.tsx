import React from 'react'
import {View, Text, Alert} from 'react-native'
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import { supabase } from '../lib/supabase';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomDrawer(props) {
    async function signout(){
        const {error} = await supabase.auth.signOut();
        if (error) Alert.alert(error.message);
        props.navigation.navigate("Welcome");
    }

    return (
        <View style = {{flex: 1}}>
            <DrawerContentScrollView 
            {...props}
            contentContainerStyle={{backgroundColor: "#d2b48c"}}>
                <View>
                    <Text style = {{fontSize: 18, fontFamily: 'sans-serif-medium',marginLeft: 10, marginTop: 50, marginBottom: -10}}>Hello</Text>
                </View>
                <View style = {{flex: 1, backgroundColor: '#ffffff', marginTop: 20}}>
                    <DrawerItemList {...props}/>
                </View>    
            </DrawerContentScrollView>
            <View style = {{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={()=> signout()}> 
                <View style ={{flexDirection: "row", alignItems: "center"}}>
                    <Ionicons name ="exit-outline" size = {22} color = '#777'/>
                    <Text style ={{fontFamily: 'sans-serif-medium', marginLeft: 5, color: '#777'}}> Sign Out</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    );
  }