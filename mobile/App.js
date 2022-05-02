import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './screens/Home';

import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#F7F7F7',
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;