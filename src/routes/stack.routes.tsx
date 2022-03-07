import React, { ReactElement, } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './app.routes';

const Stack = createNativeStackNavigator();

export default function AppRoutes(): ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeTabs} />
    </Stack.Navigator>
  );
}