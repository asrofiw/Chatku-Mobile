/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import jwtDecode from 'jwt-decode';

// Import action
import userAction from '../redux/actions/user';
import friendsAction from '../redux/actions/friends';

// import Component
import RenderListUser from '../Components/RenderListUser';
import {Toast} from 'native-base';

const SearchUsers = ({route}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const friends = useSelector((state) => state.friends);
  const decode = jwtDecode(auth.token);
  useEffect(() => {
    if (route.params) {
      dispatch(userAction.searchUser(route.params.search)).catch((e) =>
        console.log(e.message),
      );
    }
  }, []);

  const onAddFriend = (phone) => {
    const data = {
      phone: phone,
    };
    dispatch(friendsAction.addFriends(auth.token, data)).catch((e) =>
      console.log(e.message),
    );
  };

  useEffect(() => {
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
    </View>
  );
};

export default SearchUsers;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
