import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL} from '@env';

const RenderListUser = ({
  listUser,
  userLogin,
  dataFriends,
  onPressAddFriend,
}) => {
  const navigation = useNavigation();
  let friendId = [];
  // console.log(dataFriends);
  if (Object.keys(dataFriends).length > 0) {
    friendId = dataFriends.map((e) => e.user_id_friends);
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatRoom', {
          id: listUser.id,
          avatar: `${API_URL}${listUser.avatar}`,
          name: listUser.name,
          phone: listUser.phone,
        })
      }>
      {listUser.id !== userLogin && (
        <View style={styles.wrapper}>
          <Image
            style={styles.img}
            source={
              listUser.avatar
                ? {uri: `${API_URL}${listUser.avatar}`}
                : require('../../assets/images/default-avatar1.png')
            }
          />
          <View style={styles.content}>
            {listUser.name ? (
              <Text style={styles.name}>{listUser.name}</Text>
            ) : (
              <Text style={styles.name}>+ {listUser.phone}</Text>
            )}
            {listUser.about && (
              <View>
                <Text style={styles.about}>{listUser.about}</Text>
              </View>
            )}
          </View>
          {!friendId.includes(listUser.id) && (
            <TouchableOpacity onPress={onPressAddFriend}>
              <Icon name="account-plus" color="#21978b" size={30} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RenderListUser;

const styles = StyleSheet.create({
  wrapper: {
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
  about: {
    marginTop: 5,
    fontSize: 14,
    color: '#9b9b9b',
  },
});
