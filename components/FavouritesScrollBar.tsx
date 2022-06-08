import {View, Text, Image} from "react-native"
import React, {Component} from "react"


export default function FavouritesScrollBar(props) {
    return (
        <View style={{height: 150, width: 150, borderWidth: 1, borderColor: '#dddddd', marginLeft: 20}}>
            <Image source = {props.imageUri} style = {{flex: 1, width: null, height: 200, resizeMode: 'contain', marginTop: 0}}/>
            <View style = {{paddingLeft: 10, marginTop: 20}}>
                <Text style = {{ fontSize: 15, fontWeight: '500'}}>{props.shop}</Text>
            </View>
        </View>
    );
}