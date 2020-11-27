import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailFriends = ({route}) => {
  console.log(route);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.parent}>
      <View style={styles.wrapperImage}>
        <Image
          style={styles.img}
          source={
            route.params.avatar
              ? {uri: route.params.avatar}
              : require('../assests/images/default-avatar1.png')
          }
        />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.topMedia}>
          <Text style={styles.titlePhone}>Media, link, and docs</Text>
          <View style={styles.rightMedia}>
            <Text>2,213</Text>
            <Icon name="chevron-right" size={20} color="#128C7E" />
          </View>
        </TouchableOpacity>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.thumbnailLast}>
            <Icon name="chevron-right" size={40} color="#9b9b9b" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text>Mute notifications</Text>
          <Switch
            trackColor={{false: '#767577', true: '#128C7E50'}}
            thumbColor={isEnabled ? '#128C7E' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text>Custom notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text>Media visibility</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapperLast}>
          <Text>Starred messages</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.btnWrapper}>
          <View>
            <Text>Disappearing messages</Text>
            <Text style={styles.subText}>Off</Text>
          </View>
          <Ionicons
            style={styles.icon}
            name="md-timer"
            size={25}
            color="#128C7E"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapperLast}>
          <View>
            <Text>Encryption</Text>
            <Text style={styles.subText}>
              Messages and calls are end-to-end encrypted. Tap to verify
            </Text>
          </View>
          <Icon style={styles.icon} name="lock" size={25} color="#128C7E" />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperPhone}>
        <Text style={styles.titlePhone}>Phone number</Text>
        <View style={styles.wrapperInfo}>
          <TouchableOpacity style={styles.btnPhone}>
            <View style={styles.wrapperInfoLeft}>
              <Text>{`+ ${route.params.phone}`}</Text>
              <Text style={styles.subText}>Mobile</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.wrapperIcon}>
            <TouchableOpacity style={styles.btnIcon}>
              <Icon name="android-messages" size={25} color="#128C7E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon}>
              <Icon name="phone" size={25} color="#128C7E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon}>
              <Icon name="video" size={25} color="#128C7E" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.wrapperAction}>
        <TouchableOpacity style={styles.btnWrapperAction}>
          <Icon
            style={styles.iconAction}
            name="block-helper"
            size={25}
            color="red"
          />
          <Text>Block</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperAction}>
        <TouchableOpacity style={styles.btnWrapperAction}>
          <Icon
            style={styles.iconAction}
            name="thumb-down"
            size={25}
            color="red"
          />
          <Text>Report Contact</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailFriends;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  wrapperImage: {
    height: 300,
    backgroundColor: '#9b9b9b50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 200,
    width: 200,
  },
  topMedia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rightMedia: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 70,
    height: 70,
    backgroundColor: 'green',
    marginBottom: 10,
    marginRight: 10,
  },
  thumbnailLast: {
    width: 70,
    height: 70,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    marginRight: 5,
  },
  wrapper: {
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#9b9b9b',
  },
  btnWrapperLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  subText: {
    fontSize: 12,
    color: '#9b9b9b',
  },
  icon: {
    marginRight: 10,
  },
  wrapperPhone: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  titlePhone: {
    color: '#128C7E',
    marginBottom: 10,
  },
  wrapperInfo: {
    flexDirection: 'row',
  },
  wrapperInfoLeft: {
    justifyContent: 'center',
    height: 35,
    width: 250,
  },
  wrapperIcon: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 5,
  },
  wrapperAction: {
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  btnWrapperAction: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  iconAction: {
    marginRight: 10,
  },
});
