import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {API_URL} from '@env';

const RenderListContacts = ({dataContact}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatRoom', {
          id: dataContact.id,
          avatar: `${API_URL}${dataContact.avatar}`,
          name: dataContact.name,
          phone: dataContact.phone,
        })
      }>
      <View style={styles.wrapperChats}>
        <Image
          style={styles.img}
          source={
            dataContact.avatar
              ? {uri: `${API_URL}${dataContact.avatar}`}
              : require('../../assets/images/default-avatar1.png')
          }
        />
        <View style={styles.content}>
          {dataContact.name ? (
            <Text style={styles.name}>{dataContact.name}</Text>
          ) : (
            <Text style={styles.name}>+ {dataContact.phone}</Text>
          )}
          {dataContact.about && (
            <View>
              <Text style={styles.message}>{dataContact.about}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderListContacts;

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
    flexGrow: 1,
    paddingVertical: 25,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 5,
    fontSize: 14,
    color: '#9b9b9b',
  },
});
