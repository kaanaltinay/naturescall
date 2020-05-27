import React, { Component } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View, FlatList} from "react-native";

const SpecificList = [
  {
    name: '1',
    title: 'How to make a fire',
    videoSource: require('../assets/videos/fire.mp4'),
    isPlaying: false
  },
];

const GeneralList = [
  {
    id: '1',
    title: 'How to make a fire',
    videoSource: require('../assets/videos/fire.mp4'),
    isPlaying: false
  },
];

export default class CatalogueScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      dataSource: {},
    }
  }

  onPress() {

  }

  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) };
    });
    that.setState({
      dataSource: items,
    });
  }

  render() {
    return (
        <View style={styles.MainContainer}>
          <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                    <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                  </View>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
          />
        </View>
    )
  }
}

CatalogueScreen.navigationOptions = {
  title: 'Catalogue',
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});