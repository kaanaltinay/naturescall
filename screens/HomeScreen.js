import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }
  }

  onPress = () => {
    this.setState({
      count: 1
    })
  };

  render() {
    return (
        this.state.count === 0 ?
        <View style={styles.container}>
          <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
          >
            <Image source={require('../assets/images/no-bg.png')}  style={styles.img}/>
          </TouchableOpacity >
          <View style={[styles.countContainer]}>
            <Text style={[styles.countText]}>
              { this.state.count !== 0 ? this.state.count: null}
            </Text>
          </View>
        </View> :
        null
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Home',
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#808996'
  },
  button: {

    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2727',

  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  },
  img: {
height:120,
    width: 120,
  }

})