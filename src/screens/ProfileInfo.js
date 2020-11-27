import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input, Item, Text, Toast, View} from 'native-base';
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

// Import Action
import userAction from '../redux/actions/user';
import authAction from '../redux/actions/auth';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState({});
  const onChangeName = (value) => {
    setName(value);
  };

  const chooseAvatar = () => {
    const option = {
      noData: true,
      saveToPhotos: true,
      mediaType: 'photo',
    };
    ImagePicker.showImagePicker(option, (res) => {
      if (res.didCancel || res.error || res.customButton) {
        console.log(res);
      } else {
        setAvatar(res);
      }
    });
  };

  const onUpdate = () => {
    const {token} = auth;
    const form = new FormData();
    form.append('name', name);
    if (Object.values(avatar).length > 0) {
      const fileFilter = ['image/jpg', 'image/jpeg', 'image/png'];
      if (avatar.fileSize > 2000000) {
        Toast.show({
          text: 'Limit file size 2mb',
          buttonText: 'Ok',
        });
      } else if (!fileFilter.includes(avatar.type)) {
        Toast.show({
          text: 'File must an image',
          buttonText: 'Ok',
        });
      } else {
        form.append('avatar', {
          uri: avatar.uri,
          type: avatar.type,
          name: avatar.fileName,
        });
      }
    }
    dispatch(userAction.updateUser(token, form));
  };

  useEffect(() => {
    const {isSuccess, isError, alertMsg} = user;
    if (isSuccess) {
      dispatch(authAction.login());
      dispatch(userAction.clearMessage());
    } else if (isError) {
      Toast.show({
        text: alertMsg,
        buttonText: 'Ok',
      });
      dispatch(userAction.clearMessage());
    }
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.parent}>
        <View>
          <Text style={styles.title}>Profile info</Text>
          <Text style={styles.txt}>
            Please provide your name and an optional profile photo
          </Text>
          <View style={styles.wrapperProvide}>
            <TouchableWithoutFeedback onPress={chooseAvatar}>
              {Object.values(avatar).length > 0 ? (
                <View style={styles.wrapperImg}>
                  <Image style={styles.img} source={{uri: avatar.uri}} />
                </View>
              ) : (
                <View style={styles.wrapperImg}>
                  <Icon name="camera" size={30} color="white" />
                </View>
              )}
            </TouchableWithoutFeedback>
            <Item style={styles.itemInput}>
              <Input
                placeholder="name"
                placeholderTextColor="#b4b6b6"
                value={name}
                onChangeText={onChangeName}
                maxLength={25}
              />
              <Text style={styles.counterTextLength}>{25 - name.length}</Text>
            </Item>
            <Icon name="emoticon-outline" size={25} color="#b4b6b6" />
          </View>
        </View>
        <Button full style={styles.btnNext} onPress={onUpdate}>
          <Text>Next</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: '#21978b',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  txt: {
    textAlign: 'center',
    fontSize: 14,
    color: '#b4b6b6',
    marginBottom: 30,
  },
  wrapperProvide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  wrapperImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#b4b6b6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  itemInput: {
    height: 30,
    width: '70%',
    borderBottomWidth: 2,
    borderBottomColor: '#21978b',
  },
  counterTextLength: {
    marginRight: 5,
    fontSize: 12,
    color: '#9b9b9b',
  },
  btnNext: {
    backgroundColor: '#26d366',
    alignSelf: 'center',
    width: '30%',
    borderRadius: 5,
    shadowColor: '#26d366',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
});
