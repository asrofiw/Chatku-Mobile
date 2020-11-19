import React from 'react';
import {Button, Input, Item, Text, View} from 'native-base';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileInfo = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.parent}>
        <View>
          <Text style={styles.title}>Profile info</Text>
          <Text style={styles.txt}>
            Please provide your name and an optional profile photo
          </Text>
          <View style={styles.wrapperProvide}>
            <TouchableWithoutFeedback onPress={() => console.log('OK')}>
              <View style={styles.wrapperImg}>
                <Icon name="camera" size={30} color="white" />
              </View>
            </TouchableWithoutFeedback>
            <Item style={styles.itemInput}>
              <Input placeholder="name" placeholderTextColor="#b4b6b6" />
            </Item>
            <Icon name="emoticon-outline" size={25} color="#b4b6b6" />
          </View>
        </View>
        <Button full style={styles.btnNext}>
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
  itemInput: {
    height: 30,
    width: '70%',
    borderBottomWidth: 2,
    borderBottomColor: '#21978b',
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
