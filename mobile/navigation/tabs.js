import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';

import {Home, Search} from '../components/icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopWidth: 0,
          borderTopColor: 'transparent',

          elevation: 0,
          shadowColor: '#5bc4ff',
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.text,
                focused ? styles.textFocused : styles.textNotFocused,
              ]}>
              Anasayfa
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Home stroke={focused ? '#002AE7' : '#D8DBE9'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 12},
  textFocused: {
    color: '#002AE7',
  },
  textNotFocused: {
    color: '#D8DBE9',
  },
});

export default Tabs;
