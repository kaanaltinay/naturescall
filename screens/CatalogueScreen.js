import React, { Component } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Button, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";

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
      visible: false,
      dataSource: {},
      name: '',
      desc: '',
      src: '',
      animalButtonActive: false,
      plantButtonActive: false,
      mushButtonActive: false
    }
  }

  componentDidMount() {
    var that = this;
    var items = [];
    if(this.state.animalButtonActive) {
      items = Array.apply(null, Array(60)).map((v, i) => {
        return {
          id: i,
          src: 'http://placehold.it/200x200?text=' + (i + 1),
          name: 'Plant',
          desc: 'Plant description goes here'
        };
      });
    }
    else if(this.state.plantButtonActive) {
      items = Array.apply(null, Array(60)).map((v, i) => {
        return {
          id: i,
          src: 'http://placehold.it/200x200?text=' + (i + 2),
          name: 'Plant',
          desc: 'Plant description goes here'
        };
      });
    }
    else {
      items = Array.apply(null, Array(60)).map((v, i) => {
        return {
          id: i,
          src: 'http://placehold.it/200x200?text=' + (i + 1),
          name: 'Plant',
          desc: 'Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. '
        };
      });
    }
    that.setState({
      dataSource: items,
    });
  }

  toggleAnimalButton = () => {
    this.setState((prevState) => ({
      animalButtonActive: !prevState.animalButtonActive
    }));
  };

  togglePlantButton = () => {
    this.setState((prevState) => ({
      plantButtonActive: !prevState.plantButtonActive,
    }));
  };

  toggleMushButton = () => {
    this.setState((prevState) => ({
      mushButtonActive: !prevState.mushButtonActive,
    }));
  };


  render() {
    return (
        <View style={styles.mainContainer}>
          {!this.state.visible ?
              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: '1%'}}>
                <Button
                    onPress={this.toggleAnimalButton}
                    title="Animals"
                    color={this.state.animalButtonActive? '#927582': '#819273'}
                />
                <Button
                    onPress={this.togglePlantButton}
                    title="Plants"
                    color={this.state.plantButtonActive? '#927582': '#819273'}
                />
                <Button
                    onPress={this.toggleMushButton}
                    title="Fungi"
                    color={this.state.mushButtonActive? '#927582': '#819273'}
                />
              </View>
          :
              <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                  onPress={()=>this.setState({visible: false})}>
                <Ionicons
                    name= 'ios-close-circle-outline'
                    style={{ color: "#000", fontSize: 40, justifyContent: 'flex-end', alignSelf: 'flex-end'}}
                />
              </TouchableOpacity>

          }

          {!this.state.visible ?
              <FlatList
                  data={this.state.dataSource}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          style={{ flex: 1, flexDirection: 'column', margin: '0.5%', backgroundColor: '#927582', borderRadius: 5,  }}
                          onPress={()=> this.setState({visible: true, name: item.name, desc: item.desc, src: item.src})}>
                        <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                        <Text style={{fontSize: 16, alignSelf: 'center'}}> {item.name}</Text>
                      </TouchableOpacity>
                  )}
                  //Setting the number of column
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
              /> :

              <View
                  style={{ flex: 1, flexDirection: 'column', margin: 1, backgroundColor: 'gray' }}
                  onPress={()=> this.setState({visible: false, name: '', desc: '', src: ''})}>
                <Image style={styles.imageThumbnail} source={{ uri: this.state.src}} />
                <Text style={{fontSize: 20, alignSelf: 'center'}}> {this.state.name}</Text>
                <ScrollView>
                  <Text style = {{fontSize: 30, marginRight: '3%', marginLeft: '3%'}}>
                    {this.state.desc}
                  </Text>
                </ScrollView>
              </View>
          }
        </View>
    )
  }
}

CatalogueScreen.navigationOptions = {
  title: 'Catalogue',
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});