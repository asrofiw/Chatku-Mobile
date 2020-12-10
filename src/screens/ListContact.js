/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

// Import action
import friendsAction from '../redux/actions/friends';

const RenderItem = ({dataContact}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatRoom', {
          id: dataContact.id,
          avatar: dataContact.avatar,
          name: dataContact.name,
          phone: dataContact.phone,
        })
      }>
      <View style={styles.wrapperChats}>
        <Image
          style={styles.img}
          source={
            dataContact.avatar
              ? {uri: dataContact.avatar}
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

const ListContact = () => {
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const {token} = auth;
  useEffect(() => {
    dispatch(friendsAction.getFriends(token)).catch((e) =>
      console.log(e.message),
    );
    if (friends.isSuccess) {
      dispatch(friendsAction.clearMessage());
    }
  }, []);
  const {dataFriends} = friends;
  return (
    <View style={styles.parent}>
      <TouchableOpacity onPress={() => navigation.navigate('SearchUsers')}>
        <View style={styles.wrapperChats}>
          <View style={styles.wrapperIcon}>
            <Icon name="magnify" size={30} color="#ffffff" />
          </View>
          <View style={styles.content}>
            <Text style={styles.name}>Search</Text>
          </View>
        </View>
      </TouchableOpacity>
      {dataFriends && dataFriends.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataFriends}
          renderItem={({item}) => <RenderItem dataContact={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default ListContact;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapperChats: {
    flexDirection: 'row',
    height: 100,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  wrapperIcon: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    marginRight: 10,
    backgroundColor: '#25D366',
    justifyContent: 'center',
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
