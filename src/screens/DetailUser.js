import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import ImagePicker from 'react-native-image-picker';
import {Input, Item, Toast} from 'native-base';

// Import action
import userAction from '../redux/actions/user';

const DetailUser = () => {
  const [nameTemp, setNameTemp] = useState();
  const [avatarTemp, setAvatarTemp] = useState();
  const [aboutTemp, setAboutTemp] = useState();
  const [modalName, setModalName] = useState(false);
  const [modalAbout, setModalAbout] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const {token} = auth;
  const {dataProfile} = user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.getUser(token));
    onSetAll();
    setTimeout(() => {
      if (user.isSuccess) {
        dispatch(userAction.clearMessage());
      }
    }, 1000);
  }, []);

  const onSetAll = () => {
    setNameTemp(user.dataProfile.name);
    setAboutTemp(user.dataProfile.about);
  };

  const onUpdateAvatar = () => {
    const form = new FormData();
    const fileFilter = ['image/jpg', 'image/jpeg', 'image/png'];
    if (avatarTemp.fileSize > 2000000) {
      Toast.show({
        text: 'Limit file size 2mb',
        buttonText: 'Ok',
      });
    } else if (!fileFilter.includes(avatarTemp.type)) {
      Toast.show({
        text: 'File must an image',
        buttonText: 'Ok',
      });
    } else {
      form.append('avatar', {
        uri: avatarTemp.uri,
        type: avatarTemp.type,
        name: avatarTemp.fileName,
      });
      dispatch(userAction.updateUser(token, form));
      setAvatarTemp();
    }
    setTimeout(() => {
      onRefresh();
    });
  };

  const onRefresh = () => {
    const {isSuccess, isError, alertMsg} = user;
    if (isError) {
      Toast.show({
        text: alertMsg,
        buttonText: 'Ok',
      });
    } else if (isSuccess) {
      dispatch(userAction.getUser(token));
      onSetAll();
      setTimeout(() => {
        dispatch(userAction.clearMessage());
        setModalAbout(false);
        setModalName(false);
      });
    }
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
        setAvatarTemp(res);
        setTimeout(() => {
          onUpdateAvatar();
        }, 1000);
      }
    });
  };

  const onOpenModalName = () => {
    setModalName(true);
  };

  const onOpenModalAbout = () => {
    setModalAbout(true);
  };

  const ModalEditName = () => {
    const [changeName, setChangeName] = useState('');
    const onChangeName = (value) => {
      setChangeName(value);
    };

    const onUpdateName = () => {
      const form = new FormData();
      form.append('name', changeName);
      dispatch(userAction.updateUser(token, form));
      setTimeout(() => {
        onRefresh();
      });
    };
    return (
      <View style={styles.wrapperViewModal}>
        <Text style={styles.label}>Edit Name</Text>
        <Item style={styles.itemInput}>
          <Input
            placeholder="Name"
            style={styles.input}
            maxLength={25}
            value={changeName}
            onChangeText={onChangeName}
          />
          <Text style={styles.txtCount}>{25 - changeName.length}</Text>
        </Item>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity
            style={styles.btnEditorModalName}
            onPress={() => setModalName(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnEditorModalName}
            onPress={onUpdateName}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ModalEditAbout = () => {
    const [changeAbout, setChangeAbout] = useState('');
    const onChangeAbout = (value) => {
      setChangeAbout(value);
    };

    const onUpdateAbout = () => {
      const form = new FormData();
      form.append('about', changeAbout);
      dispatch(userAction.updateUser(token, form));
      setModalAbout(false);
      onRefresh();
    };
    return (
      <View style={styles.wrapperViewModal}>
        <Text style={styles.label}>Edit About</Text>
        <Item style={styles.itemInput}>
          <Input
            placeholder="About"
            style={styles.input}
            multiline={true}
            maxLength={100}
            value={changeAbout}
            onChangeText={onChangeAbout}
          />
          <Text style={styles.txtCount}>{100 - changeAbout.length}</Text>
        </Item>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity
            style={styles.btnEditorModalName}
            onPress={() => setModalAbout(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnEditorModalName}
            onPress={onUpdateAbout}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.parent}>
      <View style={styles.wrapperImg}>
        <TouchableOpacity>
          <Image
            style={styles.img}
            source={
              dataProfile.avatar
                ? {uri: `${API_URL}${dataProfile.avatar}`}
                : require('../assests/images/default-avatar1.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon} onPress={chooseAvatar}>
          <Icon name="camera" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onOpenModalName}>
        <Icon style={styles.icon} name="account" size={30} color="#128C7E90" />
        <View style={styles.wrapperViewTxt}>
          <View style={styles.viewTxt}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.subTitle}>{nameTemp}</Text>
            <Text style={styles.txtMsg}>
              This is not your username or pin. This name will be visible to
              your ChatKu contacts.
            </Text>
          </View>
          <Icon name="pencil" size={30} color="#9b9b9b" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSecond} onPress={onOpenModalAbout}>
        <Icon
          style={styles.iconSecond}
          name="information-outline"
          size={30}
          color="#128C7E90"
        />
        <View style={styles.wrapperViewScd}>
          <View style={styles.viewTxt}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.subTitle}>
              {aboutTemp ? aboutTemp : 'Status'}
            </Text>
          </View>
          <Icon
            style={styles.iconPencil}
            name="pencil"
            size={30}
            color="#9b9b9b"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.btnLast}>
        <Icon
          style={styles.iconLast}
          name="phone"
          size={30}
          color="#128C7E90"
        />
        <View>
          <Text style={styles.title}>Phone</Text>
          <Text style={styles.subTitle}>+ {dataProfile.phone}</Text>
        </View>
      </View>
      <Modal visible={modalName} transparent={true}>
        <View style={styles.modalView}>
          <ModalEditName />
        </View>
      </Modal>
      <Modal visible={modalAbout} transparent={true}>
        <View style={styles.modalView}>
          <ModalEditAbout />
        </View>
      </Modal>
    </View>
  );
};

export default DetailUser;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapperImg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
  },
  img: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    backgroundColor: 'green',
  },
  btnIcon: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
    right: '30%',
  },
  btn: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  wrapperViewTxt: {
    flexDirection: 'row',
    width: '87%',
    paddingRight: 50,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  icon: {
    marginRight: 20,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 14,
    color: '#9b9b9b',
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  txtMsg: {
    fontSize: 12,
    color: '#9b9b9b',
  },
  btnSecond: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  iconSecond: {
    marginRight: 20,
  },
  wrapperViewScd: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    paddingRight: 70,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  viewTxt: {
    flexGrow: 1,
  },
  btnLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  iconLast: {
    marginRight: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000050',
  },
  wrapperViewModal: {
    backgroundColor: '#ffffff',
    paddingTop: 10,
  },
  wrapperBtn: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  itemInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#21978b',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    paddingHorizontal: 10,
    height: 50,
    width: '80%',
    color: '#000000',
    fontSize: 14,
  },
  txtCount: {
    color: '#9b9b9b',
    fontSize: 12,
    alignSelf: 'flex-end',
    paddingBottom: 15,
  },
  btnEditorModalName: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
});
