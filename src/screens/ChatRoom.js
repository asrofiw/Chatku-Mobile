import {Button, Input, Item, Text} from 'native-base';
import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const Chat = [
  {
    id: 1,
    myChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    theirChat: '',
    date: '',
  },
  {
    id: 2,
    myChat: '',
    theirChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    date: '',
  },
  {
    id: 3,
    myChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    theirChat: '',
    date: '',
  },
  {
    id: 4,
    myChat: '',
    theirChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    date: '',
  },
  {
    id: 5,
    myChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    theirChat: '',
    date: '',
  },
  {
    id: 6,
    myChat: '',
    theirChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    date: '',
  },
  {
    id: 7,
    myChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    theirChat: '',
    date: '',
  },
  {
    id: 8,
    myChat: '',
    theirChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    date: '',
  },
  {
    id: 9,
    myChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    theirChat: '',
    date: '',
  },
  {
    id: 10,
    myChat: '',
    theirChat: 'abababasdadnfkjnvjnvjnfvnrfdnlkjnlniuhiuhngvhhcs',
    date: '',
  },
];

const ChatRoom = ({route}) => {
  const [message, setMessage] = useState('');
  const isTyping = (value) => {
    setMessage(value);
  };
  console.log(route.params);

  const RenderChat = ({chat}) => {
    return (
      <View>
        {chat.myChat.length > 0 && (
          <View style={styles.myChat}>
            <Text>{chat.myChat}</Text>
            <Text style={styles.date}>3:10 PM</Text>
          </View>
        )}
        {chat.theirChat.length > 0 && (
          <View style={styles.theirChat}>
            <Text>{chat.theirChat}</Text>
            <Text style={styles.date}>3:10 PM</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.parent}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerStyle}
          data={Chat}
          renderItem={({item}) => <RenderChat chat={item} />}
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
          <Button rounded style={styles.btnMic}>
            {message.length > 0 && (
              <IconFontAwesome name="send" size={25} color="#ffffff" />
            )}
            {!message.length && (
              <Icon name="microphone" size={25} color="#ffffff" />
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
    backgroundColor: '#ECE5DD',
  },
  imgBg: {
    width: '100%',
    height: '100%',
  },
  myChat: {
    alignSelf: 'flex-start',
    width: '80%',
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
    width: '80%',
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
    bottom: '15%',
    right: '5%',
    position: 'absolute',
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
