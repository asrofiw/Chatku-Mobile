/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import socket from '../helpers/socket';
import jwtDecode from 'jwt-decode';

// Import action
import messagesAction from '../redux/actions/messages';

const RenderItem = ({dataChats, userLogin}) => {
  const navigation = useNavigation();
  let dataUserFriend = {};
  if (dataChats.User.id !== userLogin.id) {
    dataUserFriend = dataChats.User;
  }
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatRoom', {
            id: dataUserFriend.id,
            name: dataUserFriend.name,
            phone: dataUserFriend.phone,
            avatar: dataUserFriend.avatar,
          })
        }>
        <View style={styles.wrapperChats}>
          <Image
            style={styles.img}
            source={
              dataUserFriend.avatar
                ? {uri: dataUserFriend.avatar}
                : require('../assests/images/default-avatar1.png')
            }
          />
          <View style={styles.content}>
            <View style={styles.topContent}>
              {dataUserFriend.name ? (
                <Text style={styles.name}>{dataUserFriend.name}</Text>
              ) : (
                <Text style={styles.name}>+ {dataUserFriend.phone}</Text>
              )}
              <Text style={styles.date}>
                {moment.utc(dataChats.createdAt).local().calendar({
                  sameDay: 'hh:mm A',
                  lastDay: '[Yesterday]',
                  sameElse: 'DD/MM/YYY',
                })}
              </Text>
            </View>
            <View>
              {dataChats.message.length < 30 && (
                <Text style={styles.message}>{dataChats.message}</Text>
              )}
              {dataChats.message.length > 30 && (
                <Text style={styles.message}>
                  {dataChats.message.substring(0, 30).concat('...')}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const {token} = auth;
  const messages = useSelector((state) => state.messages);
  const {listOfChats} = messages;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messagesAction.getListOfChats(token));
    socket.on(token, () => {
      dispatch(messagesAction.getListOfChats(token));
    });
    return () => {
      socket.close();
    };
  }, []);
  const getData = () => {
    setLoading(true);
    dispatch(messagesAction.getListOfChats(token));
    setLoading(false);
  };
  const navigation = useNavigation();
  return (
    <View style={styles.parent}>
      <FlatList
        refreshing={loading}
        onRefresh={getData}
        showsVerticalScrollIndicator={false}
        data={listOfChats}
        renderItem={({item}) => (
          <RenderItem dataChats={item} userLogin={user.dataProfile} />
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
  wrapperChats: {
    flexDirection: 'row',
    height: 100,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  img: {
    backgroundColor: '#ffffff',
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    marginRight: 10,
  },
  content: {
    height: '100%',
    borderBottomWidth: 0.25,
    flexGrow: 1,
    paddingVertical: 25,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#b4b6b6',
  },
  message: {
    fontSize: 14,
    color: '#9b9b9b',
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
