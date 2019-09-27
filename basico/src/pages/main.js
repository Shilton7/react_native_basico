import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Shilton',
  };
  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}