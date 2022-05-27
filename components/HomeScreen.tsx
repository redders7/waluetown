import {Alert, Text, Button, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';

export default function HomeScreen({ navigation }) {
  async function signout(){
    const {error} = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    navigation.navigate("Login");
  }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate("Details")}
        />
        <Button
          title="Sign Out"
          onPress={() => signout()}
        />
      </View>
    );
}