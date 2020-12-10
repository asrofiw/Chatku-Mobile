import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import storage from '@react-native-async-storage/async-storage';

// Import action
import userAction from '../redux/actions/user';
import authAction from '../redux/actions/auth';

const SettingScreen = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const {token} = auth;
  const {dataProfile} = user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAction.getUser(token));
    dispatch(userAction.clearMessage());
  }, []);
  const navigation = useNavigation();
  const userLogout = () => {
    storage.removeItem('persist:chatku');
    dispatch(authAction.logout());
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.parent}>
      <TouchableOpacity
        style={styles.top}
        onPress={() => navigation.navigate('DetailUser')}>
        <Image
          style={styles.img}
          source={
            dataProfile.avatar
              ? {uri: `${API_URL}${dataProfile.avatar}`}
              : require('../../assets/images/default-avatar1.png')
          }
        />
        <View>
          <Text style={styles.name}>{dataProfile.name}</Text>
          <Text style={styles.status}>
            {dataProfile.about ? dataProfile.about : 'About'}
          </Text>
        </View>
        <Icon style={styles.iconQR} name="qrcode" size={30} color="#128C7E90" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Icon
          style={styles.iconKey}
          name="key-variant"
          size={30}
          color="#128C7E90"
        />
        <View>
          <Text>Account</Text>
          <Text style={styles.subTitle}>Privacy, security, change number</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Icon
          style={styles.icon}
          name="android-messages"
          size={30}
          color="#128C7E90"
        />
        <View>
          <Text>Chats</Text>
          <Text style={styles.subTitle}>Theme, wallpaper, chat history</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Icon style={styles.icon} name="bell" size={30} color="#128C7E90" />
        <View>
          <Text>Notifications</Text>
          <Text style={styles.subTitle}>Messages, group & call tones</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Icon
          style={styles.icon}
          name="chart-donut"
          size={30}
          color="#128C7E90"
        />
        <View>
          <Text>Storage and data</Text>
          <Text style={styles.subTitle}>Network usage, auto-download</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLast}>
        <Icon
          style={styles.icon}
          name="help-circle-outline"
          size={30}
          color="#128C7E90"
        />
        <View style={styles.viewLast}>
          <Text>Help</Text>
          <Text style={styles.subTitle}>FAQ, contact us, privacy policy</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Icon
          style={styles.icon}
          name="account-multiple"
          size={30}
          color="#128C7E90"
        />
        <View>
          <Text>Invite friends</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={userLogout}>
        <Icon style={styles.icon} name="logout" size={30} color="#128C7E90" />
        <View>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  top: {
    flexDirection: 'row',
    height: 120,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomColor: '#9b9b9b',
    borderBottomWidth: 0.2,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: '#9b9b9b',
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  status: {
    color: '#9b9b9b',
  },
  iconQR: {
    flexGrow: 1,
    textAlign: 'right',
  },
  btn: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  iconKey: {
    transform: [{rotate: '45deg'}],
    marginRight: 20,
  },
  subTitle: {
    fontSize: 12,
  },
  btnLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  viewLast: {
    flexGrow: 1,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#9b9b9b',
  },
  icon: {
    marginRight: 20,
  },
});
