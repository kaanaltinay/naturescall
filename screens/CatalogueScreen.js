import React, { Component } from 'react'
import {Image, StyleSheet, ImageBackground,Text, TouchableOpacity, View, FlatList, Button, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors"

import * as firebase from 'firebase';
import firebaseConfig from '../FirebaseConfig';
import 'firebase/firestore';




if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const DATA = [
    {
    id: '1',
    src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg?crop=1.00xw:0.669xh;0,0.158xh&resize=980:*',
    name: 'Maine Coon',
    type: 'animal',
    desc: 'Animal description goes here. Animal description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. ',
    },
  {
    id: '2',
    src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg?crop=1.00xw:0.669xh;0,0.158xh&resize=980:*',
    name: 'Cute Dog',
    type: 'animal',
    desc: 'Animal description goes here. Animal description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. ',
  },
  {
    id: '3',
    src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg?crop=1.00xw:0.669xh;0,0.158xh&resize=980:*',
    name: 'Best Dog',
    type: 'animal',
    desc: 'Animal description goes here. Animal description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. ',
  },
  {
    id: '4',
    src:  'https://gearpatrol.com/wp-content/uploads/2019/01/10-Best-Indoor-Plants-Gear-Patrol-umbrella-750x970.jpg',
    name: 'House Plant',
    type: 'plant',
    desc: 'Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. '
  },
  {
    id: '5',
    src: 'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555286811/shape/mentalfloss/fungprimary.png',
    name: 'Mushroom',
    type: 'fungi',
    desc: 'Fungi description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. '
  },
  {
    id: '6',
    src: 'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555286811/shape/mentalfloss/fungprimary.png',
    name: 'Good Mushroom',
    type: 'fungi',
    desc: 'Fungi description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. '
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
    };


  }


  componentDidMount() {
    this.setFlatlistData();
    this.writeUserData();
  }





  setFlatlistData() {
    var items = [];
    for(let i = 0; i < DATA.length; i++){
      if(this.state.animalButtonActive && this.state.plantButtonActive && this.state.mushButtonActive) { //animal plant fungi
        items.push(DATA[i]);
      }
      else if(this.state.animalButtonActive && this.state.plantButtonActive && !this.state.mushButtonActive) { //animal plant
        if(DATA[i].type === 'plant' || DATA[i].type === 'animal') {
          items.push(DATA[i]);
        }
      }
      else if(this.state.animalButtonActive && !this.state.plantButtonActive && this.state.mushButtonActive) { //animal fungi
        if(DATA[i].type === 'animal' || DATA[i].type === 'fungi') {
          items.push(DATA[i]);
        }
      }
      else if(!this.state.animalButtonActive && this.state.plantButtonActive && this.state.mushButtonActive) { //plant fungi
        if(DATA[i].type === 'plant' || DATA[i].type === 'fungi') {
          items.push(DATA[i]);
        }
      }
      else if(this.state.animalButtonActive && !this.state.plantButtonActive && !this.state.mushButtonActive) { //animal
        if(DATA[i].type === 'animal') {
          items.push(DATA[i]);
        }
      }
      else if(!this.state.animalButtonActive && this.state.plantButtonActive && !this.state.mushButtonActive) { //plant
        if(DATA[i].type === 'plant') {
          items.push(DATA[i]);
        }
      }
      else if(!this.state.animalButtonActive && !this.state.plantButtonActive && this.state.mushButtonActive) { //fungi
        if(DATA[i].type === 'fungi') {
          items.push(DATA[i]);
        }
      }
      else {
        items.push(DATA[i]);
      }
    }
    this.setState({
      dataSource: items,
    });
  }

  toggleAnimalButton = () => {
    this.setState({
      animalButtonActive: !this.state.animalButtonActive
    }, () => {
      this.setFlatlistData();
    });
  };

  togglePlantButton = () => {
    this.setState({
      plantButtonActive: !this.state.plantButtonActive
    }, () => {
      this.setFlatlistData();
    });
  };

  toggleMushButton = () => {
    this.setState({
      mushButtonActive: !this.state.mushButtonActive
    }, () => {
      this.setFlatlistData();
    });
  };




  render() {
    return (
        <View style={styles.mainContainer}>
          <ImageBackground source={require('../assets/images/bg-image.jpg')}  style={styles.bgimg}>
          {!this.state.visible ?
              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: '1%'}}>

                <Button
                    style={styles.toggleButton}
                    color={this.state.animalButtonActive? '#81a2c1': '#082949'}
                    onPress={this.toggleAnimalButton}
                    title="Animals"
                />
                <Button

                    color={this.state.plantButtonActive? '#81a2c1': '#082949'}
                    onPress={this.togglePlantButton}
                    title="Plants"
                />
                <Button

                    color={this.state.mushButtonActive? '#81a2c1': '#082949'}
                    onPress={this.toggleMushButton}
                    title="Fungi"
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
                    style={{ color: "#000", fontSize: 40, justifyContent: 'flex-end', alignSelf: 'flex-end', color:'#fff'}}
                />
              </TouchableOpacity>

          }

          {!this.state.visible ?
              <FlatList
                  data={this.state.dataSource}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          style={{maxWidth: '33%', minHeight: 150, flex: 1, flexDirection: 'column', margin: '0.5%', backgroundColor:  '#082949', borderRadius: 5,  }}
                          onPress={()=> this.setState({visible: true, name: item.name, desc: item.desc, src: item.src})}>
                        <Image style={styles.chosenPhoto} source={{ uri: item.src}}/>
                        <Text style={{fontSize: 16, alignSelf: 'center', color:'#fff', fontWeight: 'bold'}}> {item.name}</Text>
                      </TouchableOpacity>
                  )}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
              /> :

              <View
                  style={{ flex: 1, flexDirection: 'column', margin: 1, backgroundColor: '#082949', borderTopColor:'#fff' }}
                  onPress={()=> this.setState({visible: false, name: '', desc: '', src: ''})}>
                <Image style={styles.imageThumbnail} source={{ uri: this.state.src}} />
                <Text style={{fontSize: 30, alignSelf: 'center', color:'#fff', fontWeight:'bold'}}> {this.state.name}</Text>
                <ScrollView>
                  <Text style = {{fontSize: 22, marginRight: '3%', marginLeft: '3%',color:'#fff'}}>
                    {this.state.desc}
                  </Text>
                </ScrollView>
              </View>
          }
          </ImageBackground>
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
  chosenPhoto: {
    borderRadius:15,
    marginTop:5,
    height: 120,
    justifyContent: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    backgroundColor: '#FFFF00'
  },
  bgimg: {
    height:700,
  },
  toggleButton:{
    borderWidth: 4,
    borderColor: "#20232a",
  },  

});