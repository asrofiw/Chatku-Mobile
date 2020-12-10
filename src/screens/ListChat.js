/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import socket from '../helpers/socket';

// Import action
import messagesAction from '../redux/actions/messages';
import jwtDecode from 'jwt-decode';

// import component render
import RenderListofChats from '../Components/RenderListofChats';

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
    socket.on(decode.id, () => {
      dispatch(messagesAction.getListOfChats(token));
    });
    // return () => {
    //   socket.disconnect();
    // };
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
