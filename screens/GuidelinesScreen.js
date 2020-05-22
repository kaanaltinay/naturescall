import React, { Component } from 'react'
import {FlatList, ImageBackground,Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Constants from "expo-constants";
import TextStylePropTypes from "react-native-web/dist/exports/Text/TextStylePropTypes";
import { Video } from 'expo-av';
import Colors from "../constants/Colors"

const DATA = [
  {
    id: '1',
    title: 'How to make a fire',
    videoSource: require('../assets/videos/fire.mp4')
  },
  {
    id: '2',
    title: 'How to prepare a tent',
    videoSource: require('../assets/videos/tent.mp4')
  },
  {
    id: '3',
    title: 'Roasting Marshmallows',
    videoSource: require('../assets/videos/roast.mp4')
  },
  {
    id: '4',
    title: 'Roasting Marshmallows',
    videoSource: require('../assets/videos/roast.mp4')
  },
];

function Item({ title, videoSource, mute, play, handleVolume, handlePlay }) {
  return (
      <View style={styles.item}>
        <View style = {styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{title}</Text>
        </View>
        <View style = {styles.videoContainer}>
          <TouchableOpacity
              onPress={handlePlay}
          >
          <Video
              source = {videoSource}
              rate={1.0}
              volume={1.0}
              isMuted={mute}
              resizeMode="contain"
              shouldPlay={play}
              style={{ width: 150, height: 100 }}
          />
          </TouchableOpacity>
        </View>
      </View>
  );
}

export default class GuidelinesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mute: true,
      shouldPlay: false,
    }
  }

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay
    }));
  }

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,
    }));
  }

  render() {
    return (
          <SafeAreaView style={styles.mainContainer}>
            <ImageBackground source={require('../assets/images/bg-image.jpg')}  style={styles.bgimg}>
            <FlatList
                data={DATA}
                renderItem={({ item, videoSource }) =>
                    <Item
                        title={item.title}
                        videoSource={item.videoSource}
                        mute={this.state.mute}
                        play={this.state.shouldPlay}
                        handleVolume={this.handleVolume}
                        handlePlay={this.handlePlayAndPause}
                    />}
                keyExtractor={item => item.id}
            />
              </ImageBackground>

          </SafeAreaView>
    )
  }
}

GuidelinesScreen.navigationOptions = {
  title: 'Guidelines',
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.bgColor,
    flex: 2,
    flexDirection: 'column'
  },
  item: {
    backgroundColor: Colors.listItemBackgroundColor,
    flex: 2,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  videoContainer: {
    backgroundColor: Colors.listItemBackgroundColor,
    flex: 1,
    alignItems: 'flex-end'
  },
  innerContainer: {
    backgroundColor: Colors.listItemBackgroundColor,
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: Colors.listTitleColor,
  },
  desc: {
    fontSize: 15,
    color: Colors.listSubtitleColor,
  },
  bgimg: {
    flex: 2,
    flexDirection: 'column'
  }
});