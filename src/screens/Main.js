/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, View, Root, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderBackButton} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import socket from '../helpers/socket';
import jwtDecode from 'jwt-decode';
import PushNotification from 'react-native-push-notification';

// import action
import messagesAction from '../redux/actions/messages';
import userAction from '../redux/actions/user';

// Import Pages
import WelcomeScreen from './WelcomeScreen';
import Register from './Register';
import ProfileInfo from './ProfileInfo';
import TopTabs from './TopTabs';
import ChatRoom from './ChatRoom';
import DetailFriends from './DetailFriends';
import SettingScreen from './SettingScreen';
import DetailUser from './DetailUser';
import ListContact from './ListContact';
import SearchUsers from './SearchUsers';

const Stack = createStackNavigator();

const HeaderBackPhoto = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onBack = () => {
    dispatch(messagesAction.getListOfChats(props.token));
    setTimeout(() => {
      navigation.goBack();
    });
  };
  return (
    <TouchableOpacity style={styles.parent} onPress={onBack}>
      <Icon name="arrow-left" size={27} color="#ffffff" />
      <Image
        style={styles.headerBack}
        source={
          props.img
            ? {uri: props.img}
            : require('../../assets/images/default-avatar1.png')
        }
      />
    </TouchableOpacity>
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
      <TouchableOpacity>
        <Icon name="video" size={27} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="phone" size={27} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="dots-vertical" size={27} color="#ffffff" />
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
        <Icon name="dots-vertical" size={27} color="#ffffff" />
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

const HeaderRightMain = () => {
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(false);

  const showOptions = () => {
    setIsShow(!isShow);
  };

  const navigateTo = () => {
    navigation.navigate('SettingScreen');
    setIsShow(false);
  };

  return (
    <View style={styles.headerRightMain}>
      <TouchableOpacity>
        <Icon name="magnify" size={27} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={showOptions}>
        <Icon name="dots-vertical" size={27} color="#ffffff" />
      </TouchableOpacity>
      <Modal animationType="none" transparent={true} visible={isShow}>
        <View style={styles.modalOptions}>
          <TouchableOpacity style={styles.btnOptionsFriends}>
            <Text>New Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOptionsFriends}>
            <Text>New Broadcast</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOptionsFriends}>
            <Text>Starred messages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateTo}
            style={styles.btnOptionsFriends}>
            <Text>Settings</Text>
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

const HeaderSearch = (props) => {
  return (
    <View style={styles.headerSearch}>
      <TouchableOpacity onPress={props.onPressMagnify}>
        <Icon name="magnify" size={27} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

// create channel
PushNotification.createChannel(
  {
    channelId: 'income-message', // (required)
    channelName: 'Message', // (required)
    channelDescription: 'This channel for income message', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const Main = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [inputSearch, setInputSearch] = useState(false);
  const [search, setSearch] = useState('');
  const setValueSearch = (value) => {
    setSearch(value);
  };

  let decode = {};
  if (auth.token.length > 0) {
    decode = jwtDecode(auth.token);
  }
  let name = '';
  if (user.dataProfile) {
    name = user.dataProfile.name;
  }
  useEffect(() => {
    SplashScreen.hide();
    if (auth.token.length > 0) {
      socket.on(decode.id, () => {
        dispatch(messagesAction.getListOfChats(auth.token)).catch((e) =>
          console.log(e.message),
        );
        PushNotification.localNotification({
          channelId: 'income-message',
          title: `Hi ${name},`,
          message: 'You have a new message',
        });
      });
    }
  }, []);

  return (
    <Root>
      <NavigationContainer>
        <StatusBar backgroundColor="#075E54" barStyle="light-content" />
        {!auth.isLogin ? (
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
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerTitle: 'ChatKu',
                headerTintColor: '#ffffff',
                headerLeft: false,
                headerStyle: {backgroundColor: '#21978b', elevation: 0},
                headerRight: () => <HeaderRightMain />,
              }}
              name="TopTabs"
              component={TopTabs}
            />
            <Stack.Screen
              options={() => ({
                title: 'Contacts',
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#21978b', elevation: 0},
              })}
              name="ListContact"
              component={ListContact}
            />
            <Stack.Screen
              options={({navigation}) =>
                inputSearch
                  ? {
                      headerLeft: () => (
                        <HeaderBackButton
                          onPress={() => (setInputSearch(false), setSearch(''))}
                          tintColor="#21978b"
                        />
                      ),
                      headerTitle: () => (
                        <View>
                          <Item regular style={styles.itemInputSearch}>
                            <Input
                              placeholder="Search..."
                              value={search}
                              onChangeText={setValueSearch}
                              onSubmitEditing={() =>
                                navigation.setParams({search: search})
                              }
                            />
                          </Item>
                        </View>
                      ),
                    }
                  : {
                      title: 'Search Users',
                      headerTintColor: '#ffffff',
                      headerStyle: {backgroundColor: '#21978b', elevation: 0},
                      headerRight: () => (
                        <HeaderSearch
                          onPressMagnify={() => setInputSearch(true)}
                        />
                      ),
                      headerLeft: () => (
                        <HeaderBackButton
                          onPress={() => (
                            navigation.goBack(),
                            dispatch(userAction.clearResultSearch())
                          )}
                          tintColor="#ffffff"
                        />
                      ),
                    }
              }
              name="SearchUsers"
              component={SearchUsers}
            />
            <Stack.Screen
              options={({navigation, route}) => ({
                headerBackImage: () => (
                  <HeaderBackPhoto
                    img={route.params.avatar}
                    token={auth.token}
                  />
                ),
                headerTitle: () => (
                  <TouchableOpacity
                    style={styles.headerTitle}
                    onPress={() =>
                      navigation.navigate('DetailFriends', {
                        id: route.params.id,
                        name: route.params.name,
                        avatar: route.params.avatar,
                        phone: route.params.phone,
                      })
                    }>
                    <HeaderTitle
                      name={
                        route.params.name
                          ? route.params.name
                          : `+ ${route.params.phone}`
                      }
                    />
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
                headerTitle: route.params.name
                  ? route.params.name
                  : `+ ${route.params.phone}`,
                headerRight: () => <HeaderRightProfileFriends />,
                headerRightContainerStyle: {marginRight: 10},
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#21978b', elevation: 0},
              })}
              name="DetailFriends"
              component={DetailFriends}
            />
            <Stack.Screen
              options={() => ({
                title: 'Settings',
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#21978b', elevation: 0},
              })}
              name="SettingScreen"
              component={SettingScreen}
            />
            <Stack.Screen
              options={() => ({
                title: 'Profile',
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#21978b', elevation: 0},
              })}
              name="DetailUser"
              component={DetailUser}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Root>
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
    marginHorizontal: 10,
    width: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerRightMain: {
    flexDirection: 'row',
    marginHorizontal: 10,
    width: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSearch: {
    marginRight: 20,
  },
  itemInputSearch: {
    borderColor: '#ffffff',
  },
});
