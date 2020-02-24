import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native'
import Colors from "../constants/Colors"
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraOpened: false,
      hasPermission: null,
      type: Camera.Constants.Type.back,
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

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
    }
  };

  render() {
    return (
        this.state.cameraOpened === false ?
        <View style={styles.container}>
          <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
          >
            <Image source={require('../assets/images/no-bg.png')}  style={styles.img}/>
          </TouchableOpacity >
        </View> :
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
                onPress={()=>this.handleCameraType()}>
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
    backgroundColor: Colors.bgColor,
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
  }

})
