import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({ navigation }) {
  console.log("nav");
  console.log(navigation);
  return (
    <View>
      <Text>Home Page</Text>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
     </View>
  );
}
