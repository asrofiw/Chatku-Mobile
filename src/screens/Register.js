import React, {useState} from 'react';
import {Button, Input, Item, Label, Text, View} from 'native-base';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const [country, setCountry] = useState('Indonesia');
  const [codeCountry, setcodeCountry] = useState('62');
  const onCountryChange = (value) => {
    setCountry(value);
    onCodeCountry(value);
  };

  const onCodeCountry = (value) => {
    switch (value) {
      case 'Indonesia':
        setcodeCountry('62');
        break;
      case 'Malaysia':
        setcodeCountry('60');
        break;
      case 'Philippines':
        setcodeCountry('63');
        break;
      case 'Singapore':
        setcodeCountry('65');
        break;
      case 'Thailand':
        setcodeCountry('66');
        break;
      default:
        setcodeCountry(codeCountry);
    }
  };

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.parent}>
        <View>
          <Text style={styles.title}>Register your phone number</Text>
          <Text style={styles.txt}>
            Enter your country code and phone number to register
          </Text>
          <View style={styles.pickerCountry}>
            <Picker
              mode="dropdown"
              selectedValue={country}
              onValueChange={onCountryChange}>
              <Picker.Item label="Indonesia" value="Indonesia" />
              <Picker.Item label="Malaysia" value="Malaysia" />
              <Picker.Item label="Philippines" value="Philippines" />
              <Picker.Item label="Singapore" value="Singapore" />
              <Picker.Item label="Thailand" value="Thailand" />
            </Picker>
          </View>
          <View style={styles.inputNumber}>
            <Item style={styles.itemInputCode}>
              <Label>+</Label>
              <Input
                style={styles.inputCode}
                keyboardType="phone-pad"
                placeholderTextColor="#b4b6b6"
                value={codeCountry}
                disabled
              />
            </Item>
            <Item style={styles.itemInput}>
              <Input
                keyboardType="phone-pad"
                placeholder="phone number"
                placeholderTextColor="#b4b6b6"
              />
            </Item>
          </View>
        </View>
        <Button
          full
          style={styles.btnNext}
          onPress={() => navigation.navigate('ProfileInfo')}>
          <Text>Next</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
    marginBottom: 10,
  },
  pickerCountry: {
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#21978b',
  },
  inputNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInputCode: {
    width: '23%',
    borderBottomWidth: 2,
    borderBottomColor: '#21978b',
    paddingHorizontal: 10,
  },
  inputCode: {
    textAlign: 'right',
  },
  itemInput: {
    width: '73%',
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
