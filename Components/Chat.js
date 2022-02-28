import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

// Firebase Code
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store username given from Start screen
      yourName: this.props.route.params.yourName,
      // Store user's selected color from Start Screen
      color: this.props.route.params.color,
      // Initialize empty messages list
      messages: [],
      uid: '',
      internet: '',
    };


    // Firebase Code
    const firebaseConfig = {
      apiKey: "AIzaSyCwsV4XYpPlRXz2g4-1T6w0TbUaJivI5_g",
      authDomain: "chat-app-1-6dcdc.firebaseapp.com",
      projectId: "chat-app-1-6dcdc",
      storageBucket: "chat-app-1-6dcdc.appspot.com",
      messagingSenderId: "190541137213"
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");

  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveuid() {
    try {
      await AsyncStorage.setItem('uid', this.state.uid)
    } catch (error) {
      console.log(error.message)
    }
  }

  async getuid() {
    let uid = '';
    try {
      uid = await AsyncStorage.getItem('uid') || '';
      this.setState({
        uid: uid
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  async componentDidMount() {
    await NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({
          internet: 'online'
        });
      } else {
        this.setState({
          internet: 'offline'
        });
      }
    });

    console.log(this.state);
    if (this.state.internet == 'offline') {
      this.getuid()
      this.getMessages()
    }

    else if (this.state.internet == 'online') {
      // Firebase Code
      // Populates messages from DB
      this.referenceChatMessages = firebase.firestore().collection('messages');
      if (this.referenceChatMessages) {
        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)
      }

      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          messages: [],
        });
        this.saveuid();
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
      });
    }
  }

  componentWillUnmount() {
    if (this.state.internet == 'online') {
      // Firebase Code
      this.authUnsubscribe();
      this.unsubscribe();
    }
  }


  // Firebase Code
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document in collection 'messages'
    querySnapshot.forEach((message) => {
      // get the QueryDocumentSnapshot's data
      let data = message.data();
      // console.log(message)
      // console.log(data)
      messages.push({
        key: message.id,
        _id: message.id,
        // user: data.user,
        // avatar: data.avatar,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  // Called whenever a user clicks send on their message
  onSend(messages = []) {
    if (this.state.internet == 'online') {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.saveMessages();
      })

      // Firebase Code
      this.addMessage(messages)
    }
  }

  // Called as part of onSend() whenever a user clicks send on their message
  addMessage(message) {

    // Firebase Code
    this.referenceChatMessages.add({
      createdAt: new Date(),
      text: message[0].text,
      user: {
        _id: this.state.uid,
        name: this.state.yourName,
        // Currently there is no way for a user to define a profile picture so I am leaving this line out for now.
        // avatar: data.user.avatar,
      }
    })
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          // Changes the background color of bubbles on the right of chat (i.e. user)
          right: {
            backgroundColor: '#000',
          },
          // left: {

          // }
        }}
      />
    )
  }

  renderInputToolbar(props) {
    if (this.state.internet == 'offline') {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.AllContainer}>
        <GiftedChat
          // Prop to change bubble colors
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          // Prop to give messages state which holds our current messages.
          // Messages here is the full list of displayed messages.
          messages={this.state.messages}
          // Called when user hits send button
          // Adds the typed out message to the messages state, here from user with _id = 1
          onSend={message => this.onSend(message)}
          user={{
            _id: this.state.uid,
          }}
        />
        {/* When using an android device prevent keyboard from overtaking the input field by rendering the keyboardAvoidingView component */}
        {Platform.OS === 'android'
          ? <KeyboardAvoidingView behavior="height" />
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AllContainer: {
    flex: 1,
    // width: '88%',
    // height: '88%'
  },
  ChatInsideContainer: {
    flex: 1,
    width: '88%',
    height: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '6%',
    marginBottom: '6%'
  },
  NamePlateContainer: {
    flex: .1,
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 2,
    borderBottomWidth: 0
  },
  NamePlate: {
    fontSize: 32,
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#000'
  },
  ChatContainer: {
    flex: .5,
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
    borderWidth: 2,
    borderBottomWidth: 0
  },
  ChatWindow: {

  },
  InputContainer: {
    flex: .4,
    borderColor: '#000',
    borderWidth: 2
  },
  Input: {
    flex: 1
  }
});