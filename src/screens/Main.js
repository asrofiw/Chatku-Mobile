import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Pages
import WelcomeScreen from './WelcomeScreen';
import Register from './Register';
import ProfileInfo from './ProfileInfo';
import TopTabs from './TopTabs';
import ChatRoom from './ChatRoom';
import {Image, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailFriends from './DetailFriends';

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
    <View>
      <Text style={styles.title}>{props.name}</Text>
    </View>
  );
};

const HeaderRight = () => {
  return (
    <View style={styles.headerRightOnRoom}>
      <TouchableOpacity style={styles.rightIcon}>
        <Icon name="video" size={25} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon}>
        <Icon name="phone" size={25} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon}>
        <Icon name="dots-vertical" size={25} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const HeaderRightProfileFriends = () => {
  const [isShow, setIsShow] = useState(false);

  const showOptions = () => {
    setIsShow(!isShow);
  };
  return (
    <View>
      <TouchableOpacity onPress={showOptions}>
        <Icon name="dots-vertical" size={25} color="#ffffff" />
      </TouchableOpacity>
      <Modal animationType="none" transparent={true} visible={isShow}>
        <View style={styles.modalOptions}>
          <TouchableOpacity style={styles.btnOptionsFriends}>
            <Text>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOptionsFriends}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOptionsFriends}>
            <Text>View in address book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOptionsFriends}>
            <Text>Verify security code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showOptions}
            style={styles.btnOptionsFriends}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
          options={({navigation, route}) => ({
            headerBackImage: () => <HeaderBackPhoto img={route.params.image} />,
            headerTitle: () => (
              <TouchableOpacity
                style={styles.headerTitle}
                onPress={() =>
                  navigation.navigate('DetailFriends', {
                    id: route.params.id,
                    name: route.params.name,
                    image: route.params.image,
                  })
                }>
                <HeaderTitle name={route.params.name} />
              </TouchableOpacity>
            ),
            headerRight: () => <HeaderRight />,
            headerTintColor: '#ffffff',
            headerStyle: {backgroundColor: '#21978b', elevation: 0},
          })}
          name="ChatRoom"
          component={ChatRoom}
        />
        <Stack.Screen
          options={({route}) => ({
            headerTitle: route.params.name,
            headerRight: () => <HeaderRightProfileFriends />,
            headerRightContainerStyle: {marginRight: 10},
            headerTransparent: true,
            headerTintColor: '#ffffff',
            headerStyle: {backgroundColor: '#21978b', elevation: 0},
          })}
          name="DetailFriends"
          component={DetailFriends}
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
    width: '75%',
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
    marginRight: 15,
  },
  btnOptionsFriends: {
    width: 180,
    height: 50,
    justifyContent: 'center',
  },
  modalOptions: {
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 10,
    width: '60%',
    position: 'absolute',
    right: 0,
  },
});
