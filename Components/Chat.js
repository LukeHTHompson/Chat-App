import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable } from 'react-native';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourName: this.props.route.params.yourName,
      color: this.props.route.params.color
    };
  }

  render() {
    return (
      <View style={[styles.AllContainer, { backgroundColor: this.state.color }]}>
        <View style={styles.ChatInsideContainer}>
          <View style={styles.NamePlateContainer}>
            <Text style={styles.NamePlate}>{this.state.yourName}</Text>
          </View>
          <View style={styles.ChatContainer}>
            <Text>
              CHAT MESSAGES GO HERE
            </Text>
          </View>
          <View style={styles.InputContainer}>
            <TextInput style={styles.Input}></TextInput>
          </View>
        </View>
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
    margin: 'auto'
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