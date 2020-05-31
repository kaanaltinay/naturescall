import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native'
import Colors from "../constants/Colors"
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

import * as Permissions from 'expo-permissions';
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { Assets } from 'react-navigation-stack';



const image = { uri: "https://reactjs.org/logo-og.png" };

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      cameraOpened: false,
      hasPermission: null,
      type: Camera.Constants.Type.back,
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
    this.getPermissionAsync();
  }
 

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  onPress = () => {
    this.setState((prevState) => ({
      cameraOpened: !prevState.cameraOpened
    }));
  };

  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
          cameraType === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
    })
  };

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo);
      this.setState({image: photo.uri});
      
      
    }
  };

  render() {
    let { image } = this.state;
    return (
      this.state.image !== null ?
      <View style={styles.container}>
        <View style ={{flexDirection: 'row', marginTop: '5%', marginLeft: '3%', marginRight: '3%' }}>
          <Text style = {{alignSelf: 'center', fontSize: 20, color:'#fff'}}> Your Result</Text>
          <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
                flex: 1,
              }}
              onPress={()=>this.setState({image: null})}>
            <Ionicons
                name= 'ios-close-circle-outline'
                style={{ color: "#000", fontSize: 40, justifyContent: 'flex-end', alignSelf: 'flex-end', color:'#fff'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerSlide}>
          <TouchableOpacity onPress={() => this._panel.show()}>
            <View style = {{flexDirection: 'column', alignItems: 'center'}}>
              <Image source={require('../assets/images/mainecoon.jpg')}  style={styles.chosenPhoto}/>
              <Text style = {{fontSize: 20, color: '#fff' }}>See Details : Maine Coon</Text>

            </View>
          </TouchableOpacity>
          <SlidingUpPanel ref={c => (this._panel = c)} draggableRange={{top: deviceHeight - 160, bottom:0}}>
            {dragHandler => (
                <View style={styles.containerSlide}>
                  <View style={styles.dragHandler} {...dragHandler}>
                    {image && <Image source={{ uri: image }} style={styles.dragImage} />}
                  </View>
                  <ScrollView>
                    <Text style = {{fontSize: 25, marginRight: '3%', marginLeft: '3%', color : '#fff'}}>
                      The Maine Coon is the largest domesticated cat breed. It has a distinctive physical appearance and valuable hunting skills. It is one of the oldest natural breeds in North America, specifically native to the US state of Maine,[3] where it is the official state cat.

                      No records of the Maine Coon's exact origins and date of introduction to the United States exist, so several competing hypotheses have been suggested, the most credible suggestion being that it is closely related to the Norwegian Forest cat and the Siberian. The breed was popular in cat shows in the late 19th century, but its existence became threatened when long-haired breeds from overseas were introduced in the early 20th century. The Maine Coon has since made a comeback and is now one of the most popular cat breeds in the United States.

                      The Maine Coon is a large and sociable cat, hence its nickname, "the gentle giant". It is characterized by a prominent ruff along its chest, robust bone structure, rectangular body shape, an uneven two-layered coat with longer guard hairs over a silky satin undercoat, and a long, bushy tail. The breed's colors vary widely, with only lilac and chocolate disallowed for pedigree. Reputed for its intelligence and playful, gentle personality, the Maine Coon is often cited as having "dog-like" characteristics.[4][5] Professionals notice certain health problems recurring in the breed, including feline hypertrophic cardiomyopathy and hip dysplasia, but reputable breeders use modern screening methods to minimize the frequency of these problems.
                    </Text>



                  </ScrollView>
                </View>
            )}
          </SlidingUpPanel>
        </View>
    </View> :
        (this.state.cameraOpened === false && this.state.image === null) ?
        <View style={styles.container}>
          <ImageBackground source={require('../assets/images/bg-image.jpg')}  style={styles.bgimg}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
            >

            <Image source={require('../assets/images/no-bg.png')}  style={styles.img}/>
          </TouchableOpacity >

          </ImageBackground>
        </View> 
        :

        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
            
            <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                onPress={()=>this._pickImage()}>
                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
                <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.takePicture()}>
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.onPress()}>
                <Ionicons
                    name= 'ios-close-circle-outline'
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Home',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor :'#014b6b',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05182b',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  img: {
    height:120,
    width: 120,
  },
  chosenPhoto: {
    height: '88%',
    width: '88%',
    aspectRatio: 1,
    backgroundColor: '#FFFF00',
    borderRadius: 15,
  },
  bgimg: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height:700,
    width: 500,
  },

  bgimg2: {

    height:700,
 
  },
  containerSlide: {
    flex: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#014b6b',
    borderWidth: 1,
    borderRadius: 15,
    borderColor:'#fff'
  },
  dragHandler: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
  },
  dragImage: {
    height:150,
    width: 150,
    borderRadius: 40,
  },


});
