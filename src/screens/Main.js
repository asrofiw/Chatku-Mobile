import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Pages
import WelcomeScreen from './WelcomeScreen';
import Register from './Register';
import ProfileInfo from './ProfileInfo';
import TopTabs from './TopTabs';

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
        <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ProfileInfo"
          component={ProfileInfo}
        />
        <Stack.Screen
          options={{
            headerTitle: 'ChatKu',
            headerTintColor: '#ffffff',
            headerLeft: false,
            headerStyle: {backgroundColor: '#21978b', elevation: 0},
          }}
          name="TopTabs"
          component={TopTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
