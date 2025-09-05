import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Payment from './screens/Payment';
import Rate from './screens/Rate';
import MapShortlist from './screens/MapShortlist';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Rate" component={Rate} />
        <Stack.Screen name="MapShortlist" component={MapShortlist} options={{ title: 'Nearby Workers' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
