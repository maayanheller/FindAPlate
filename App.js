import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Camera from "./Components/CameraPage";
import TypePlate from "./Components/TypePlate";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Camera Page" options={{title: "Find A Plate"}} component={Camera} />
          <Stack.Screen name="Type Plate" options={{title: "Find A Plate"}} component={TypePlate} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
