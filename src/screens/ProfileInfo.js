import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input, Item, Toast, View} from 'native-base';
import {
  Text,
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as yup from 'yup';

// Import Action
import userAction from '../redux/actions/user';
import authAction from '../redux/actions/auth';

const nameSchema = yup.object({
  name: yup.string().max(25).required(),
});

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [modalOption, setModalOption] = useState(false);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        Object.values(granted).every(() => PermissionsAndroid.RESULTS.GRANTED)
      ) {
        console.log('Permissions granted');
      } else {
        console.log('Permissions denied');
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const chooseAvatar = () => {
    const option = {
      noData: true,
      saveToPhotos: true,
      mediaType: 'photo',
    };
    ImagePicker.launchImageLibrary(option, (res) => {
      if (
        res.didCancel ||
        res.error ||
        res.customButton ||
        res.errorMessage ||
        res.errorCode
      ) {
        console.log(res);
      } else {
        setAvatar(res);
      }
    });
  };

  const openCamera = () => {
    const option = {
      noData: true,
      saveToPhotos: true,
      mediaType: 'photo',
    };
    ImagePicker.launchCamera(option, (res) => {
      if (
        res.didCancel ||
        res.error ||
        res.customButton ||
        res.errorMessage ||
        res.errorCode
      ) {
        console.log(res);
      } else {
        setAvatar(res);
      }
    });
  };

  useEffect(() => {
    const {isSuccessUpdate, isError, alertMsg} = user;
    if (isSuccessUpdate) {
      dispatch(authAction.login());
      dispatch(userAction.clearMessage());
      Keyboard.dismiss();
    } else if (isError) {
      Toast.show({
        text: alertMsg,
        buttonText: 'Ok',
      });
      dispatch(userAction.clearMessage());
      Keyboard.dismiss();
    }
  });

  const onOpenModalOption = () => {
    setModalOption(true);
  };

  const ModalOption = () => {
    return (
      <View style={styles.wrapperViewModal}>
        <Text style={styles.label}>Select an options</Text>
        <Button full style={styles.btnOptions} onPress={openCamera}>
          <Text>Open camera...</Text>
        </Button>
        <Button full style={styles.btnOptions} onPress={chooseAvatar}>
          <Text>Choose image from gallery...</Text>
        </Button>
        <Button style={styles.btnCancel} onPress={() => setModalOption(false)}>
          <Text style={styles.txtCancel}>Cancel</Text>
        </Button>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.parent}>
        <Formik
          initialValues={{name: ''}}
          validationSchema={nameSchema}
          onSubmit={(values) => {
            const {token} = auth;
            const form = new FormData();
            form.append('name', values.name);
            if (avatar) {
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
            dispatch(userAction.updateUser(token, form)).catch((e) =>
              console.log(e.message),
            );
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.wrapper}>
              <View>
                <Text style={styles.title}>Profile info</Text>
                <Text style={styles.txt}>
                  Please provide your name and an optional profile photo
                </Text>
                <View style={styles.wrapperProvide}>
                  <TouchableOpacity onPress={onOpenModalOption}>
                    {avatar ? (
                      <View style={styles.wrapperImg}>
                        <Image style={styles.img} source={{uri: avatar.uri}} />
                      </View>
                    ) : (
                      <View style={styles.wrapperImg}>
                        <Icon name="camera" size={30} color="white" />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={styles.wrapperItemInput}>
                    <Item style={styles.itemInput}>
                      <Input
                        placeholder="name"
                        placeholderTextColor="#b4b6b6"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        maxLength={25}
                      />
                      <Text style={styles.counterTextLength}>
                        {25 - values.name.length}
                      </Text>
                    </Item>
                    {touched.name && errors.name && (
                      <Text style={styles.txtError}>{errors.name}</Text>
                    )}
                  </View>
                  <Icon name="emoticon-outline" size={25} color="#b4b6b6" />
                </View>
              </View>
              <Button full style={styles.btnNext} onPress={handleSubmit}>
                <Text style={styles.txtNext}>Next</Text>
              </Button>
            </View>
          )}
        </Formik>

        <Modal
          animationType="fade"
          visible={modalOption}
          transparent={true}
          onRequestClose={() => setModalOption(false)}>
          <View style={styles.modalView}>
            <ModalOption />
          </View>
        </Modal>
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
  },
  wrapper: {
    flex: 1,
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
  wrapperItemInput: {
    height: 30,
    width: '70%',
  },
  itemInput: {
    height: 30,
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
  txtNext: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  btnOptions: {
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    elevation: 0,
    paddingHorizontal: 10,
  },
  btnCancel: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    elevation: 0,
    backgroundColor: '#ffffff',
  },
  txtCancel: {
    color: '#21978b',
  },
  txtError: {
    color: 'red',
    fontSize: 12,
  },
});
