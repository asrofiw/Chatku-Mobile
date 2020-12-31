import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

const RenderChatRoom = ({chat, userIdLogin}) => {
  return (
    <View>
      {chat.senderId === userIdLogin ? (
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

export default RenderChatRoom;

const styles = StyleSheet.create({
  myChat: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
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
});
