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

const DATA = [
 
];

/*
  const data = new FormData();
        data.append('file', pic);      
        fetch('http://192.168.56.1:5000/image', {       
          method: 'POST',       
          body: data,     
        }).then((response) => {       
          response.json().then((body) => {         
            this.setState({ imageURL: `http://192.168.56.1:5000/image/${body.file}` 
          });       
        });     
      });
  */ 
  

/*socket= new WebSocket('ws://192.168.56.1:5000/somesocket');
socket.onopen= function() {
    
    socket.send('hello');
    
};
socket.onmessage= function(s) {
    alert('got reply '+s); 
};*/

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultInfo:'',
      resultName:'',
      resultType:'',
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
    this.fetchData();
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
        var pic2 = {
          uri: result.uri,
          type: 'image/jpg',
          name: 'pic2.jpg',
        };
        var body = new FormData();
        body.append('file', pic2);
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.1.22:5000/image');
    
    
        xhr.send(body);
   
        
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 400) {
              //db den resultname Aratıp result infoyu set State
              this.setState({resultType: xhr.response, resultName:''})
                      //this.fetchData();
            
              let  ID;
              for(ID in  DATA){
                console.log("data type " + DATA[ID].name + " Result  " + this.state.resultType);



                  if(DATA[ID].name === this.state.resultType){
                    this.setState({resultInfo: DATA[ID].desc})
                  }
                }
              } 
            };
      }

    
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
      this.setState({image: photo.uri});
      //socket.send(photo);
      //sendImage(photo);
      
      var pic = {
        uri: photo.uri,
        type: 'image/jpg',
        name: 'pic.jpg',
      };
      var body = new FormData();
      body.append('file', pic);
      
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://192.168.1.22:5000/image');


      xhr.send(body);
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {

            //db den resultname Aratıp result infoyu set State
            this.setState({resultType: xhr.response, resultName:''})
            let  ID;
            for(ID in  DATA){
              console.log("data type " + DATA[ID].name + " Result  " + this.state.resultType);
      
      
      
                if(DATA[ID].name === this.state.resultType){
                  this.setState({resultInfo: DATA[ID].desc})
                }
              }

        } 
      };


  }
};

print = async() => {

};



fetchData = async()=>{
  const response = await fetch('http://192.168.1.22:4545/Animals');
  const animals = await response.json();
  let ID;
  for (ID in animals){

 
    var temp = {
      "ID": animals[ID].ID,
      "type": animals[ID].type,
      "name": animals[ID].name,
      "src": animals[ID].imageUrl,
      "desc": animals[ID].info,
    };
    DATA.push(temp);

  }
  console.log("fetch data lengthh" + DATA.length);
}




  render() {
    let { image } = this.state;
    return (
      this.state.image !== null ?
      <View style={styles.container}>
        <View style ={{flexDirection: 'row', marginTop: '5%', marginLeft: '3%', marginRight: '3%' }}>
          <Text style = {{alignSelf: 'center', fontSize: 20, color:'#fff'}}> Your Result </Text>
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
              <Image source={{ uri: image }}  style={styles.chosenPhoto}/>
              <Text style = {{fontSize: 20, color: '#fff'}}> See Details : {this.state.resultName} ({this.state.resultType})</Text>
              
              

            </View>
          </TouchableOpacity>
          <SlidingUpPanel ref={c => (this._panel = c)} draggableRange={{top: deviceHeight - 160, bottom:0}}>
            {dragHandler => (
                <View style={styles.containerSlide}>
                  <View style={styles.dragHandler} {...dragHandler}>
                    {image && <Image source={{ uri: image }} style={styles.dragImage} />}
                  </View>
                  <ScrollView>
                    <Text style = {{fontSize: 25, color: '#fff' , marginLeft: '2%'}}>{this.state.resultName} ({this.state.resultType})</Text>
                    

                    

  
                    <Text style = {{fontSize: 25, color: '#fff' , marginLeft: '2%'}}>{this.state.resultInfo} </Text>



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
    height: '86%',
    width: '86%',
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
