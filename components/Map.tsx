import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, PermissionsAndroid, Platform, Button, Image } from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import * as Location from 'expo-location';
import { LocationSubscriber } from 'expo-location/build/LocationSubscribers';
 

export default function Map() {
    const [pin, setPin] = useState({
        latitude: 1.3143343982013442, longitude: 103.76511536367603
    });

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          console.log(location);

          setPin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        })();
      }, []);

    const origin = {latitude: pin.latitude, longitude: pin.longitude};
    const destination = {latitude: 1.3143343982013442, longitude: 103.76511536367603,};
    return (
        <View style = {styles.container}>
            <View>
            <MapView 
                style = {styles.map}
                initialRegion = {{
                    latitude: (pin.latitude + destination.latitude)/2,
                    longitude: (pin.longitude + destination.longitude)/2,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >      
                <Marker coordinate = {{latitude: destination.latitude, longitude: destination.longitude}} 
                title = "Sushi Express" description = "Value Sushi" pinColor = "gold"></Marker>
                <Marker coordinate = {{latitude: pin.latitude, longitude: pin.longitude}} 
                title = "Your current location"></Marker>               
            </MapView>
            </View>           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
         flex: 1,
         marginVertical: 400,
    },
    map: {
        width: '100%',
        height: '100%',
    }
})