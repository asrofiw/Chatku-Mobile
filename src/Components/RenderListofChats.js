import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const RenderListofChats = ({dataChats, userIdLogin}) => {
  const navigation = useNavigation();
  return (
    <View>
      {dataChats.senderId === userIdLogin ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ChatRoom', {
              id: dataChats.recepientDetail.id,
              name: dataChats.recepientDetail.name,
              phone: dataChats.recepientDetail.phone,
              avatar: dataChats.recepientDetail.avatar,
            })
          }>
          <View style={styles.wrapperChats}>
            <Image
              style={styles.img}
              source={
                dataChats.recepientDetail.avatar
                  ? {uri: dataChats.recepientDetail.avatar}
                  : require('../assests/images/default-avatar1.png')
              }
            />
            <View style={styles.content}>
              <View style={styles.topContent}>
                {dataChats.friendDetail && dataChats.friendDetail.name && (
                  <Text style={styles.name}>{dataChats.friendDetail.name}</Text>
                )}
                {dataChats.recepientDetail.name ? (
                  <Text style={styles.name}>
                    {dataChats.recepientDetail.name}
                  </Text>
                ) : (
                  <Text style={styles.name}>
                    + {dataChats.recepientDetail.phone}
                  </Text>
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
      ) : (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ChatRoom', {
              id: dataChats.senderDetail.id,
              name: dataChats.senderDetail.name,
              phone: dataChats.senderDetail.phone,
              avatar: dataChats.senderDetail.avatar,
            })
          }>
          <View style={styles.wrapperChats}>
            <Image
              style={styles.img}
              source={
                dataChats.senderDetail.avatar
                  ? {uri: dataChats.senderDetail.avatar}
                  : require('../assests/images/default-avatar1.png')
              }
            />
            <View style={styles.content}>
              <View style={styles.topContent}>
                {dataChats.senderDetail.name ? (
                  <Text style={styles.name}>{dataChats.senderDetail.name}</Text>
                ) : (
                  <Text style={styles.name}>
                    + {dataChats.senderDetail.phone}
                  </Text>
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
      )}
    </View>
  );
};

export default RenderListofChats;

const styles = StyleSheet.create({
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
});
