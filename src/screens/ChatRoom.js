/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Input, Item, Toast} from 'native-base';
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
import jwtDecode from 'jwt-decode';
import socket from '../helpers/socket';
import PushNotification from 'react-native-push-notification';

// Import action
import messagesAction from '../redux/actions/messages';

// Import Component render
import RenderChatRoom from '../Components/RenderChatRoom';

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

const ChatRoom = ({route}) => {
  const auth = useSelector((state) => state.auth);
  const messages = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {token} = auth;
  const {detailChats} = messages;
  const {id} = route.params;
  const decode = jwtDecode(token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(messagesAction.getDetailChats(token, id)).catch((e) =>
      console.log(e.message),
    );
    socket.on(decode.id, () => {
      dispatch(messagesAction.getDetailChats(token, id)).catch((e) =>
        console.log(e.message),
      );
      dispatch(messagesAction.getListOfChats(token)).catch((e) =>
        console.log(e.message),
      );
    });
  }, []);

  const isTyping = (value) => {
    setMessage(value);
  };

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
      dispatch(messagesAction.clearMessage());
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
          renderItem={({item}) => (
            <RenderChatRoom chat={item} userIdLogin={decode.id} />
          )}
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
