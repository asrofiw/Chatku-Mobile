import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailUser = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.wrapperImg}>
        <TouchableOpacity>
          <Image style={styles.img} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Icon name="camera" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Icon style={styles.icon} name="account" size={30} color="#128C7E90" />
        <View style={styles.wrapperViewTxt}>
          <View style={styles.viewTxt}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.subTitle}>Ahmad Asrofi</Text>
            <Text style={styles.txtMsg}>
              This is not your username or pin. This name will be visible to
              your ChatKu contacts.
            </Text>
          </View>
          <Icon name="pencil" size={30} color="#9b9b9b" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSecond}>
        <Icon
          style={styles.iconSecond}
          name="information-outline"
          size={30}
          color="#128C7E90"
        />
        <View style={styles.wrapperViewScd}>
          <View style={styles.viewTxt}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.subTitle}>Status</Text>
          </View>
          <Icon
            style={styles.iconPencil}
            name="pencil"
            size={30}
            color="#9b9b9b"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLast}>
        <Icon
          style={styles.iconLast}
          name="phone"
          size={30}
          color="#128C7E90"
        />
        <View>
          <Text style={styles.title}>Phone</Text>
          <Text style={styles.subTitle}>+62 822-2068-3981</Text>
        </View>
      </TouchableOpacity>
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
});
