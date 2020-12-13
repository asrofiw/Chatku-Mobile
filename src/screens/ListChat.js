/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import jwtDecode from 'jwt-decode';
import PushNotification from 'react-native-push-notification';

// Import action
import messagesAction from '../redux/actions/messages';

// import component render
import RenderListofChats from '../Components/RenderListofChats';

// configure remote notifications
PushNotification.configure({
  onRegister: function (token) {
    console.log(`Token: ${JSON.stringify(token)}`);
  },

  onNotification: function (notif) {
    console.log(`Notif: ${JSON.stringify(notif)}`);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
});

// create Channel notifications
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

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {token} = auth;
  const {listOfChats} = messages;
  const decode = jwtDecode(token);
  useEffect(() => {
    dispatch(messagesAction.getListOfChats(token)).catch((e) =>
      console.log(e.message),
    );
  }, []);
  const getData = () => {
    setLoading(true);
    dispatch(messagesAction.getListOfChats(token)).catch((e) =>
      console.log(e.message),
    );
    setLoading(false);
  };
  return (
    <View style={styles.parent}>
      <FlatList
        refreshing={loading}
        onRefresh={getData}
        showsVerticalScrollIndicator={false}
        data={listOfChats}
        renderItem={({item}) => (
          <RenderListofChats dataChats={item} userIdLogin={decode.id} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        rounded
        style={styles.btnContact}
        onPress={() => navigation.navigate('ListContact')}>
        <Icon name="chat" size={30} color="#ffffff" />
      </Button>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  btnContact: {
    width: 60,
    height: 60,
    backgroundColor: '#26d366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#26d366',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 10,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
  },
});
