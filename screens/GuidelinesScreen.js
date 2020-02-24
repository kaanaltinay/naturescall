import React, { Component } from 'react'
import { ExpoConfigView } from '@expo/samples';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class GuidelinesScreen extends Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  constructor(props) {
    super(props);
    this.state = { count: 0 }
  }

  onPress() {

  }
  render() {
    return (
        <View style={styles.container}>

        </View>
    )
  }
}

GuidelinesScreen.navigationOptions = {
  title: 'Guidelines',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#808996'
  },
});
