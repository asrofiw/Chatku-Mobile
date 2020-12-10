import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import jwtDecode from 'jwt-decode';

// Import action
import userAction from '../redux/actions/user';

// import Component
import RenderListUser from '../Components/RenderListUser';

const SearchUsers = ({route}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const decode = jwtDecode(auth.token);
  useEffect(() => {
    if (route.params) {
      dispatch(userAction.searchUser(route.params.search)).catch((e) =>
        console.log(e.message),
      );
    }
  }, []);
  return (
    <View style={styles.parent}>
      <FlatList
        data={user.resultSearch}
        renderItem={({item}) => (
          <RenderListUser listUser={item} userLogin={decode.id} />
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
