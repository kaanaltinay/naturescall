import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen'
import CatalogueScreen from '../screens/CatalogueScreen';
import TipsScreen from '../screens/TipsScreen';

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

const CatalogueStack = createStackNavigator(
  {
    CatalogueScreen: CatalogueScreen,
  },
  config
);

CatalogueStack.navigationOptions = {
  tabBarLabel: 'Catalogue',
  
  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

CatalogueStack.path = '';

const TipsStack = createStackNavigator(
  {
    Tips: TipsScreen,
  },
  config
);

TipsStack.navigationOptions = {
  tabBarLabel: 'Tips',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

TipsStack.path = '';


const tabNavigator = createBottomTabNavigator({
  CatalogueStack,
  HomeStack,
  TipsStack,
});

tabNavigator.path = '';

export default tabNavigator;
