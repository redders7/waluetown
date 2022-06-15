import {Text, Button, View} from 'react-native';

export default function DetailsScreen({route}) {
    const {email} = route.params;
    console.log(email);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{JSON.stringify(email)}</Text>
      </View>
    );
  }