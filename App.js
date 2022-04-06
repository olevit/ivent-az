import React from "react";
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import HomeScreen from './screens/HomeScreen';
import AllEvents from './screens/AllEvents';
import EventDetails from './screens/EventDetails';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

const Stack = createNativeStackNavigator();

export default function App() {
    const [loaded] = useFonts({
                    'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
                    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
                    'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
                    'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
                    'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
                    'poppins-extra-bold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
                });
    if (!loaded) {
      return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animation:'slide_from_right' }}>
              <Stack.Screen  name="Home" component={HomeScreen} />
              <Stack.Screen  name="Search" component={AllEvents} />
              <Stack.Screen  name="EventDetails" component={EventDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();






