import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {API_URL} from '@env';
import {useDispatch} from 'react-redux';

// import action
import messageAction from '../redux/actions/messages';

const RenderListofChats = ({dataChats, userIdLogin, token}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressRecepient = () => {
    dispatch(
      messageAction.updateReadMessage(token, dataChats.recepientDetail.id),
    ).catch((e) => console.log(e.message));
    navigation.navigate('ChatRoom', {
      id: dataChats.recepientDetail.id,
      name: dataChats.recepientDetail.name,
      phone: dataChats.recepientDetail.phone,
      avatar: `${API_URL}${dataChats.recepientDetail.avatar}`,
    });
  };

  const onPressSender = () => {
    dispatch(
      messageAction.updateReadMessage(token, dataChats.senderDetail.id),
    ).catch((e) => console.log(e.message));
    navigation.navigate('ChatRoom', {
      id: dataChats.senderDetail.id,
      name: dataChats.senderDetail.name,
      phone: dataChats.senderDetail.phone,
      avatar: `${API_URL}${dataChats.senderDetail.avatar}`,
    });
  };

  return (
    <View>
      {dataChats.senderId === userIdLogin ? (
        <TouchableOpacity onPress={onPressRecepient}>
          <View style={styles.wrapperChats}>
            <Image
              style={styles.img}
              source={
                dataChats.recepientDetail.avatar
                  ? {uri: `${API_URL}${dataChats.recepientDetail.avatar}`}
                  : require('../../assets/images/default-avatar1.png')
              }
            />
            <View style={styles.content}>
              <View style={styles.topContent}>
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
                    sameElse: 'DD/MM/YYYY',
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
        <TouchableOpacity onPress={onPressSender}>
          <View style={styles.wrapperChats}>
            <Image
              style={styles.img}
              source={
                dataChats.senderDetail.avatar
                  ? {uri: `${API_URL}${dataChats.senderDetail.avatar}`}
                  : require('../../assets/images/default-avatar1.png')
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
                <Text style={dataChats.isRead ? styles.date : styles.dateRead}>
                  {moment.utc(dataChats.createdAt).local().calendar({
                    sameDay: 'hh:mm A',
                    lastDay: '[Yesterday]',
                    sameElse: 'DD/MM/YYYY',
                  })}
                </Text>
              </View>
              <View style={styles.bottomContent}>
                {dataChats.message.length < 30 && (
                  <Text style={styles.message}>{dataChats.message}</Text>
                )}
                {dataChats.message.length > 30 && (
                  <Text style={styles.message}>
                    {dataChats.message.substring(0, 30).concat('...')}
                  </Text>
                )}
                {!dataChats.isRead && <View style={styles.badge} />}
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
    flexGrow: 1,
  },
  bottomContent: {
    flexDirection: 'row',
  },
  dateRead: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#26d366',
  },
  badge: {
    backgroundColor: '#26d366',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
});
