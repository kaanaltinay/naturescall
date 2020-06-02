import React, { Component } from 'react'
import {Image, StyleSheet, ImageBackground,Text, TouchableOpacity, View, FlatList, Button, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";


const DATA = [
  /*
  {
    /*
    ID: '1',
    src: 'https://d1941uuft27pfg.cloudfront.net/breed-uploads/2019/10/akbash-482x260.jpg?bust=1570807051&width=630',
    name: 'Akbash',
    type: 'animal',
    desc: 'A unique combination of Mastiff and gazehound features, the Akbash Dog’s characteristics enable him to perform as a livestock guardian. This all-white, lean, leggy, muscular dog has an alert, regal appearance conveying power, strength and courage with the speed and agility necessary to challenge and chase predators. His wedge-shaped head is adorned with pendant ears and long tail is curled over his back when moving or excited. Like other gazehounds, the Akbash Dog is characterized by his long legs, deep chest and tucked flank; the breed’s Mastiff influence is found in his height, weight, broad head and powerful appearance.',
  },
  {
    ID: '2',
    src: 'https://d1941uuft27pfg.cloudfront.net/breed-uploads/2018/08/american-foxhound-detail.jpg?bust=1535565072&width=630',
    name: 'American Foxhound',
    type: 'animal',
    desc: 'The American Foxhound is slighter of bone and higher on leg that the English Foxhound, with more rear angulation and arch over the loin. These attributes allow greater speed and agility over rough terrain. The American Foxhound has a melodious voice when on the trail. The coat is hard and of medium length. The expression is gentle and pleading.',
  },

  {
    ID: '3',
    src: 'https://d1941uuft27pfg.cloudfront.net/breed-uploads/2018/08/turkish-van-detail.jpg?bust=1535567230&width=630',
    name: 'American Staffordshire Terrier',
    type: 'animal',
    desc: 'American Staffordshire Terriers are muscular, giving the impression not only of great strength for their size but also of grace and agility. Their gait is springy. Their low center of gravity help them to easily stay on their feet, however they are also quite nimble. The coat is short, close, and glossy.',
  
  
  {
    ID: '4',
    src: 'https://d1941uuft27pfg.cloudfront.net/breed-uploads/2018/08/beagle-detail.jpg?bust=1535565158&width=630',
    name: 'Beagle (English Beagle)',
    type: 'animal',
    desc: 'The Beagle should look like a miniature Foxhound, and is solid for the size. The Beagle’s moderate size enables the ability to follow on foot. Beagles can also be carried, and they can scurry around in thick underbrush. Their close hard coat protects them from underbrush. Their moderate build enables them to nimbly traverse rough terrain. The Beagle’s amiable personality allows this breed to get along with other dogs and to be a wonderful pet. Beagles are noted for their melodious bay. The deep muzzle allows more room for olfactory receptors, aiding the Beagle’s uncanny sense of smell.',
  },
  {
    ID: '5',
    src: 'https://d1941uuft27pfg.cloudfront.net/breed-uploads/2018/08/belgian-shepherd-sheepdog-detail.jpg?bust=1535565212&width=630',
    name: 'Belgian Shepherd / Sheepdog (Groenendael)',
    type: 'animal',
    desc: 'The Belgian Sheepdog is an elegant, square-proportioned dog that is alert and agile with proud carriage. This breed’s bone is moderately heavy. For dogs expected to herd for long hours, their gait is smooth, tireless, and effortless rather than driving. They have a tendency to move in a circle rather than a straight line. They have an extremely dense undercoat along with an outer coat of abundant guard hairs that are long, well-fitting, and straight. The texture should be medium-harsh, not silky, for protection. The undercoat is extremely dense in cold weather for insulation. The opening of the ear is protected by tufts of hair. The Belgian Sheepdog’s expression is intelligent and questioning, and the black coloration is striking.',
  },
  {
    ID: '6',
    src: 'https://d1941uuft27pfg.cloudfront.net/breed-uploads/2018/08/bloodhound-detail.jpg?bust=1535565270&width=630',
    name: 'Belgian Shepherd / Sheepdog (Groenendael)',
    type: 'animal',
    desc: 'The Bloodhound is a steadfast trailer, built for endurance rather than speed. The skin is thin and loose, falling in wrinkles around the head and throat. This breed’s long ears are supposed to stir up scents as the ears rake along the ground, and its profuse wrinkles are said to trap the odors around the face, although neither of these assertions has ever been scientifically verified. The dense short coat provides protection from being caught in brambles. The Bloodhound’s docile temperament makes this dog nonthreatening to humans. The gait is elastic and free, with the tail held high. The expression is noble and dignified.',
  },
    {
    ID: '7',
    src: 'https://www.petcim.com/pictures_turler/mini_cec2b822d8043b4fba48109717f96f44.jpg',
    name: 'Golden Retriever',
    type: 'animal',
    desc: 'The Golden Retriever is a sturdy, muscular dog of medium size, famous for the dense, lustrous coat of gold that gives the breed its name. The broad head, with its friendly and intelligent eyes, short ears, and straight muzzle, is a breed hallmark. In motion, Goldens move with a smooth, powerful gait, and the feathery tail is carried, as breed fanciers say, with a “merry action.”',
    },
  {
    ID: '8',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Black-Magic-Big-Boy.jpg/220px-Black-Magic-Big-Boy.jpg',
    name: 'Siberian Husky',
    type: 'animal',
    desc: 'The Siberian Husky is a beautiful dog breed with a thick coat that comes in a multitude of colors and markings. Their blue or multi-colored eyes and striking facial masks only add to the appeal of this breed, which originated in Siberia.',
  },
 
  {
    ID: '9',
    src:  'https://gearpatrol.com/wp-content/uploads/2019/01/10-Best-Indoor-Plants-Gear-Patrol-umbrella-750x970.jpg',
    name: 'House Plant',
    type: 'plant',
    desc: 'Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. '
  },
  {
    ID: '10',
    src: 'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555286811/shape/mentalfloss/fungprimary.png',
    name: 'Mushroom',
    type: 'fungi',
    desc: 'Fungi description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. '
  },
  {
    ID: '11',
    src: 'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555286811/shape/mentalfloss/fungprimary.png',
    name: 'Good Mushroom',
    type: 'fungi',
    desc: 'Fungi description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. Plant description goes here. '
  }, */
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
    this.fetchData();
    this.setFlatlistData();
  }
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