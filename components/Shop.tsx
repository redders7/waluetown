import {Alert, Text, Button, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import { Icon } from 'react-native-elements';

export default function Shop({ navigation }) {
    return (
      <View style={styles.container}>
        
        <Text style={styles.header}>
            Sushi Express</Text>
        <View>
            <Image source = {require('../assets/sushiexpress.png')} style = {{width: 200, height: 200, marginTop: 50, alignSelf: 'center' }} />
        </View>
        <View>
            <TouchableOpacity onPress={() => {Alert.alert("Eh don't worry", "Google maps will appear here to guide you")}}>
            <Text style = {{alignSelf: 'center', marginVertical: 20, fontFamily : 'sans-serif-condensed', textDecorationLine: 'underline'}}>
                How do I get here?
            </Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => {Alert.alert("Hurry!", "Quantity = 15")}}>
                <Image source = {require('../assets/salmonsushi.png')} style = {{width: 150, height: 150, marginTop: 30, marginHorizontal: 40 }} />
            </TouchableOpacity>
        </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: "sans-serif-condensed",
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})