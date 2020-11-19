import React from 'react';
import {Button, Text, View} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.parent}>
      <Text style={styles.title}>Welcome to ChatKu</Text>
      <Image style={styles.img} />
      <View>
        <Text style={styles.txtToS}>
          Read our Privacy Policy. Tap "Agree and Continue" to accept the Terms
          of Service.
        </Text>
        <Button
          full
          style={styles.btn}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.txtBtn}>Agree and Continue</Text>
        </Button>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  title: {
    color: '#21978b',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  img: {
    alignSelf: 'center',
    backgroundColor: '#26d366',
    height: 300,
    width: 300,
    borderRadius: 300 / 2,
  },
  txtToS: {
    fontSize: 13,
    color: '#b4b6b6',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#26d366',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#26d366',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  txtBtn: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
