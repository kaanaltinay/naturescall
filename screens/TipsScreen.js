import React, { Component } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class TipsScreen extends Component {

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

TipsScreen.navigationOptions = {
  title: 'Tips',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#808996'
  },
});
