import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'native-base';

// Import action
import userAction from '../redux/actions/user';
import friendsAction from '../redux/actions/friends';

// import Component
import RenderListUser from '../Components/RenderListUser';

const SearchUsers = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const friends = useSelector((state) => state.friends);
  const decode = jwtDecode(auth.token);

  const onAddFriend = (phone) => {
    const data = {
      phone: phone,
    };
    dispatch(friendsAction.addFriends(auth.token, data)).catch((e) =>
      console.log(e.message),
    );
  };

  useEffect(() => {
    if (route.params && route.params.search !== null) {
      dispatch(userAction.searchUser(route.params.search)).catch((e) =>
        console.log(e.message),
      );
      navigation.setParams({search: null});
    }

    if (user.isSuccessSearch) {
      dispatch(userAction.clearMessage());
    }

    if (friends.isSuccessAdd) {
      Toast.show({
        text: friends.alertMsg,
        buttonText: 'Ok',
      });
      dispatch(userAction.searchUser(route.params.search)).catch((e) =>
        console.log(e.message),
      );
      dispatch(friendsAction.getFriends(auth.token)).catch((e) =>
        console.log(e.message),
      );
      dispatch(friendsAction.clearMessage());
    }
    if (friends.isErrorAdd) {
      Toast.show({
        text: friends.alertMsg,
        buttonText: 'Ok',
      });
      dispatch(friendsAction.clearMessage());
    }
  });
  return (
    <View style={styles.parent}>
      {user.isErrorSearch ? (
        <View style={styles.wrapperNotFound}>
          <Text>User not found</Text>
        </View>
      ) : (
        <FlatList
          data={user.resultSearch}
          renderItem={({item}) => (
            <RenderListUser
              listUser={item}
              userLogin={decode.id}
              dataFriends={friends ? friends.dataFriends : ''}
              onPressAddFriend={() => onAddFriend(item.phone)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default SearchUsers;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapperNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
