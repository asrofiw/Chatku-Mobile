import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Pages
import WelcomeScreen from './WelcomeScreen';
import Register from './Register';
import ProfileInfo from './ProfileInfo';
import TopTabs from './TopTabs';
import ChatRoom from './ChatRoom';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const HeaderBackPhoto = (props) => {
  return (
    <View style={styles.parent}>
      <Icon name="arrow-left" size={25} color="#ffffff" />
      <Image style={styles.headerBack} source={{uri: props.img}} />
    </View>
  );
};

const HeaderTitle = (props) => {
  return (
    <TouchableOpacity style={styles.headerTitle}>
      <Text style={styles.title}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const HeaderRight = () => {
  return (
    <View style={styles.headerRightOnRoom}>
      <TouchableOpacity style={styles.rightIcon}>
        <Icon name="video" size={25} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon}>
        <Icon style={styles.iconPhone} name="phone" size={25} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon}>
        <Icon name="dots-vertical" size={25} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

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
        <Stack.Screen
          options={({route}) => ({
            headerBackImage: () => <HeaderBackPhoto img={route.params.image} />,
            headerTitle: () => <HeaderTitle name={route.params.name} />,
            headerRight: () => <HeaderRight />,
            headerTintColor: '#ffffff',
            headerStyle: {backgroundColor: '#21978b', elevation: 0},
          })}
          name="ChatRoom"
          component={ChatRoom}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerBack: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  headerTitle: {
    width: '83%',
    marginHorizontal: 5,
    justifyContent: 'center',
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerRightOnRoom: {
    flexDirection: 'row',
  },
  rightIcon: {
    marginRight: 10,
  },
  iconPhone: {
    transform: [{rotate: '-90deg'}],
  },
});
