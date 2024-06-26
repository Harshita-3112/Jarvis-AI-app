import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/screens/Welcome/Welcome';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import { apiCall } from './src/api/openAI';

const Stack = createStackNavigator();
const App = () => {

  useEffect(() => {
    // apiCall('Create an image of dog playing with cat ')
  }, [])

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#f2f2f2'} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name={'Login'} component={Login} /> */}
        <Stack.Screen name={'Welcome'} component={Welcome} />
        <Stack.Screen name={'Home'} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
