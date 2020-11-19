import {Button, Input, Item} from 'native-base';
import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const isTyping = (value) => {
    setMessage(value);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.parent}>
        <Image
          source={{uri: 'https://wallpaperset.com/w/full/3/8/e/460814.jpg'}}
          style={styles.imgBg}
        />
        <View style={styles.bottom}>
          <Item style={styles.itemInput}>
            <Icon name="emoticon-outline" size={30} color="#b4b6b6" />
            <Input
              multiline
              numberOfLines={3}
              placeholder="Type a message"
              style={styles.input}
              value={message}
              onChangeText={isTyping}
            />
            {message.length > 0 && (
              <Icon
                style={styles.iconClip}
                name="paperclip"
                size={30}
                color="#b4b6b6"
              />
            )}
            {!message.length && (
              <View style={styles.rightInput}>
                <Icon
                  style={styles.iconClip}
                  name="paperclip"
                  size={30}
                  color="#b4b6b6"
                />
                <Icon
                  style={styles.iconCamera}
                  name="camera"
                  size={30}
                  color="#b4b6b6"
                />
              </View>
            )}
          </Item>
          <Button rounded style={styles.btnMic}>
            {message.length > 0 && (
              <IconFontAwesome name="send" size={30} color="#ffffff" />
            )}
            {!message.length && (
              <Icon name="microphone" size={30} color="#ffffff" />
            )}
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#9b9b9b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBg: {
    width: '100%',
    height: '100%',
  },
  bottom: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  itemInput: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    maxHeight: 80,
  },
  rightInput: {
    flexDirection: 'row',
  },
  btnMic: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21978b',
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
