import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  View,
} from 'react-native'
import Colors from "../constants/Colors"
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { Assets } from 'react-navigation-stack';
const image = { uri: "https://reactjs.org/logo-og.png" };
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
      this.setState({image: photo});
      
    }
  };

  render() {
    let { image } = this.state;
    return (
      this.state.image !== null ?
      <View style={styles.container}>
      <SlidingUpPanel 
        visible
        showBackdrop={false}
        ref={c => this._panel = c}>
        
        <View style={styles.container}>
          <Text>Here is the content inside panel</Text>
          <Button title='Hide' onPress={() => this._panel.hide()} />
        </View>
      </SlidingUpPanel>
    </View> :
        (this.state.cameraOpened === false && this.state.image == null) ?
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: Colors.bgColor,
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.textColor,

  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  img: {
    height:120,
    width: 120,
  },

  bgimg: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height:700,
    width: 500,
  }

})
