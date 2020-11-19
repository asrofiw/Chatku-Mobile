import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chat from './Chat';
import Status from './Status';

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: '#21978b'},
        activeTintColor: '#ffffff',
        indicatorStyle: {backgroundColor: '#ffffff'},
        labelStyle: {fontWeight: 'bold'},
      }}>
      <Tab.Screen name="Chats" component={Chat} />
      <Tab.Screen name="Status" component={Status} />
    </Tab.Navigator>
  );
};

export default TopTabs;

const styles = StyleSheet.create({});
