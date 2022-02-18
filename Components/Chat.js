import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

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
    };
  }

  componentDidMount() {
    this.setState({
      // Populate messages state with test messages
      // Temporary only, eventually pull from DB
      messages: [
        {
          _id: 8,
          text: "I'm sorry Dave. I'm afraid I can't do that.",
          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'React Native',
            avatar: 'https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg',
          },
        },
        {
          _id: 7,
          text: "Open the pod bay doors, Space Hal.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://m.media-amazon.com/images/M/MV5BZGJiOGEyYWQtNWYyMC00MWRiLWIzMzMtNTMxNjVlMGEwZWM3XkEyXkFqcGdeQXRodW1ibmFpbC1pbml0aWFsaXplcg@@._V1_.jpg',
          },
        },
        {
          _id: 6,
          text: "Affirmative Dave, I read you.",
          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'React Native',
            avatar: 'https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg',
          },
        },
        {
          _id: 5,
          text: "Do you read me, Hal?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://m.media-amazon.com/images/M/MV5BZGJiOGEyYWQtNWYyMC00MWRiLWIzMzMtNTMxNjVlMGEwZWM3XkEyXkFqcGdeQXRodW1ibmFpbC1pbml0aWFsaXplcg@@._V1_.jpg',
          },
        },
        {
          _id: 4,
          text: "Hello? Hal, do you read me?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://m.media-amazon.com/images/M/MV5BZGJiOGEyYWQtNWYyMC00MWRiLWIzMzMtNTMxNjVlMGEwZWM3XkEyXkFqcGdeQXRodW1ibmFpbC1pbml0aWFsaXplcg@@._V1_.jpg',
          },
        },
        {
          _id: 3,
          text: "OPEN the pod bay doors, Space Hal!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-superJumbo.jpg',
          },
        },
        {
          _id: 2,
          text: "Open the pod bay doors, Space Hal.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://m.media-amazon.com/images/M/MV5BZGJiOGEyYWQtNWYyMC00MWRiLWIzMzMtNTMxNjVlMGEwZWM3XkEyXkFqcGdeQXRodW1ibmFpbC1pbml0aWFsaXplcg@@._V1_.jpg',
          },
        },
        {
          _id: 1,
          text: `${this.state.yourName} has entered the chat.`,
          createdAt: new Date(),
          system: true,
        },
      ],
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

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      // <View style={[styles.AllContainer, { backgroundColor: this.state.color }]}>
      //   <View style={styles.ChatInsideContainer}>
      //     <View style={styles.NamePlateContainer}>
      //       <Text style={styles.NamePlate}>{this.props.route.params.yourName}</Text>
      //     </View>
      //     <View style={styles.ChatContainer}>
      //       <Text>
      //         CHAT MESSAGES GO HERE
      //       </Text>
      //     </View>
      //     <View style={styles.InputContainer}>
      //       <TextInput style={styles.Input}></TextInput>
      //     </View>
      //   </View>
      // </View>
      <View style={styles.AllContainer}>
        <GiftedChat
          // Prop to change bubble colors
          renderBubble={this.renderBubble.bind(this)}
          // Prop to give messages state which holds our current messages.
          // Messages here is the full list of displayed messages.
          messages={this.state.messages}
          // Called when user hits send button
          // Adds the typed out message to the messages state, here from user with _id = 1
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
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