import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Pages
import WelcomeScreen from './WelcomeScreen';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="WelcomeScreen"
          component={WelcomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
