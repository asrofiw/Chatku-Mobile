/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Input, Item, Text, Toast} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import socket from '../helpers/socket';

// Import action
import messagesAction from '../redux/actions/messages';

const RenderChat = ({chat, idFriend}) => {
  return (
    <View>
      {chat.belongsToId === idFriend.id ? (
        <View style={styles.theirChat}>
          <Text>{chat.message}</Text>
          <Text style={styles.date}>
            {moment.utc(chat.createdAt).local().format('hh:mm A')}
          </Text>
        </View>
      ) : (
        <View style={styles.myChat}>
          <Text>{chat.message}</Text>
          <Text style={styles.date}>
            {moment.utc(chat.createdAt).local().format('hh:mm A')}
          </Text>
        </View>
      )}
    </View>
  );
};

const ChatRoom = ({route}) => {
  const auth = useSelector((state) => state.auth);
  const messages = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(false);
  const {token} = auth;
  const {detailChats} = messages;
  const {id} = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messagesAction.getDetailChats(token, id));
    dispatch(messagesAction.clearMessage());
    socket.on(token, () => {
      dispatch(messagesAction.getDetailChats(token, id));
      dispatch(messagesAction.clearMessage());
    });
    return () => {
      socket.close();
    };
  }, []);
  const [message, setMessage] = useState('');
  const isTyping = (value) => {
    setMessage(value);
  };

  const decode = jwtDecode(token);

  const onPostMessage = () => {
    const data = {
      message,
    };
    dispatch(messagesAction.postMessage(token, id, data));
    setMessage('');
    setTimeout(() => {
      onRefresh();
    });
  };

  const onRefresh = () => {
    const {isSuccess, isError, alertMsg} = messages;
    if (isError) {
      Toast.show({
        text: alertMsg,
        buttonText: 'Ok',
      });
    } else if (isSuccess) {
      dispatch(messagesAction.getDetailChats(token, id));
      dispatch(messagesAction.clearMessage());
    }
  };

  const onNextPage = () => {
    const {pathNext} = messages.pageInfo;
    if (pathNext) {
      dispatch(messagesAction.getDataNextPage(token, pathNext));
    }
  };

  const getData = () => {
    setLoading(true);
    dispatch(messagesAction.getDetailChats(token, id));
    dispatch(messagesAction.clearMessage());
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.parent}>
        <FlatList
          inverted={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerStyle}
          onEndReached={onNextPage}
          onEndReachedThreshold={0.5}
          refreshing={loading}
          onRefresh={getData}
          data={detailChats}
          renderItem={({item}) => <RenderChat chat={item} idFriend={decode} />}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.bottom}>
          <Item style={styles.itemInput}>
            <Icon name="emoticon-outline" size={25} color="#b4b6b6" />
            <Input
              multiline
              placeholder="Type a message"
              style={styles.input}
              value={message}
              onChangeText={isTyping}
            />
            {message.length > 0 && (
              <Icon
                style={styles.iconClip}
                name="paperclip"
                size={25}
                color="#b4b6b6"
              />
            )}
            {!message.length && (
              <View style={styles.rightInput}>
                <Icon
                  style={styles.iconClip}
                  name="paperclip"
                  size={25}
                  color="#b4b6b6"
                />
                <Icon
                  style={styles.iconCamera}
                  name="camera"
                  size={25}
                  color="#b4b6b6"
                />
              </View>
            )}
          </Item>
          {message.length > 0 && (
            <Button rounded style={styles.btnMic} onPress={onPostMessage}>
              <IconFontAwesome name="send" size={25} color="#ffffff" />
            </Button>
          )}
          {!message.length && (
            <Button rounded style={styles.btnMic}>
              <Icon name="microphone" size={25} color="#ffffff" />
            </Button>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  imgBg: {
    width: '100%',
    height: '100%',
  },
  myChat: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    // minWidth: '30%',
    marginLeft: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#ffffff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  theirChat: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    // minWidth: '30%',
    marginRight: 20,
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#ffffff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  date: {
    fontSize: 10,
    alignSelf: 'flex-end',
    color: '#9b9b9b',
  },
  bottom: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  itemInput: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  input: {
    maxHeight: 80,
  },
  rightInput: {
    flexDirection: 'row',
  },
  btnMic: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#128C7E',
  },
  iconClip: {
    transform: [{rotate: '-45deg'}],
    marginRight: 5,
  },
  iconCamera: {
    marginLeft: 5,
    marginRight: 5,
  },
});
