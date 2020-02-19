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

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

  render() {
    return (
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
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'

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


  }

})
