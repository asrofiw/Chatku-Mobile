import {Button} from 'native-base';
import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DATA = [
  {
    id: 1,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 2,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 3,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 4,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 5,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 6,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 7,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 8,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 9,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
  {
    id: 10,
    image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    name: 'Asrofi',
    chatPlaceholder: 'Hows your day?',
    date: '3:10 PM',
  },
];

const RenderItem = ({dataChats}) => {
  console.log(dataChats.image);
  return (
    <View>
      <View style={styles.wrapperChats}>
        <Image style={styles.img} source={{uri: dataChats.image}} />
        <View style={styles.content}>
          <View style={styles.topContent}>
            <Text style={styles.name}>{dataChats.name}</Text>
            <Text style={styles.date}>{dataChats.date}</Text>
          </View>
          <View>
            <Text style={styles.message}>{dataChats.chatPlaceholder}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Chat = () => {
  return (
    <View style={styles.parent}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <RenderItem dataChats={item} />}
      />
      <Button rounded style={styles.btnContact}>
        <Icon name="chat" size={30} color="#ffffff" />
      </Button>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapperChats: {
    flexDirection: 'row',
    height: 100,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  img: {
    backgroundColor: '#ffffff',
    height: 70,
    width: 70,
    marginRight: 10,
  },
  content: {
    height: '100%',
    borderBottomWidth: 0.25,
    flexGrow: 1,
    paddingVertical: 25,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#b4b6b6',
  },
  message: {
    fontSize: 14,
    color: '#9b9b9b',
  },
  btnContact: {
    width: 60,
    height: 60,
    backgroundColor: '#26d366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#26d366',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 10,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
  },
});
