import {StyleSheet, Text, Button, View} from 'react-native';
import VendorForm from './VendorForm';

export default function DetailsScreen() {
    return (
      <View style={styles.container}>
        <VendorForm />
      </View>
    );
  }

  const styles = StyleSheet.create({
    head: {
      flex: .1,
      paddingBottom: 80,
      alignContent: "center",
      flexDirection: "row",
      paddingTop: 10
    },
    input :{
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      borderRadius: 6,
    },
    container: {
      flex: 1,
      alignContent: 'center',
      backgroundColor: '#f0e9d3',
    },
    second: {
      flex: 1,
      alignItems: 'center',
    },
    button: {
     flex: 0.5,
     marginLeft: 20,
     alignItems: 'center',
     backgroundColor: '#000000',
    },
    favourites: {
      flex: 10,
      paddingLeft: 25,
      alignContent: 'flex-start',
    },
    searchbar: {
      flex: 1,
      alignItems: 'center',
    },
  });