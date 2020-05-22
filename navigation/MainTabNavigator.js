import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen'
import TipsScreen from '../screens/TipsScreen';
import GuidelinesScreen from '../screens/GuidelinesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  headerStyle:{backgroundColor: '#00FF00'},
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-search${focused ? '' : '-outline'}`
          : 'md-search'
      }
    />
  ),
  
};

HomeStack.path = '';

const TipsStack = createStackNavigator(
  {
    TipsScreen: TipsScreen,
  },
  config
);

TipsStack.navigationOptions = {
  tabBarLabel: 'Tips',
  
  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

TipsStack.path = '';

const GuidelinesStack = createStackNavigator(
  {
    Guidelines: GuidelinesScreen,
  },
  config
);

GuidelinesStack.navigationOptions = {
  tabBarLabel: 'Guidelines',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

GuidelinesStack.path = '';


const tabNavigator = createBottomTabNavigator({
  TipsStack,
  HomeStack,
  GuidelinesStack,
});

tabNavigator.path = '';

export default tabNavigator;
