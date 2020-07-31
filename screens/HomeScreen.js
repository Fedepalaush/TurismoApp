import React from 'react';
import { Text, View, StyleSheet,ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import hoteles from '../src/components/images/hotel.jpg'
import restaurantes from '../src/components/images/restaurantes.jpg'
import favorito from '../src/components/images/favoritos.png'

const HomeScreen = ({navigation}) => {
  return(
    <ScrollView> 

      <TouchableOpacity onPress={()=>navigation.navigate ("Restaurantes")}>
          <Image style={styles.image} source={restaurantes} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate ("Alojamientos")}>
          <Image style={styles.image} marginLeft source={hoteles} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate ("Favoritos")}>
          <Image style={styles.image} marginLeft source={favorito} />
      </TouchableOpacity>


    </ScrollView>
);
};

var styles = StyleSheet.create({
container: {
flex: 0.5,
backgroundColor: '#F5FCFF',
marginTop: 10,
marginHorizontal: 10,
},
image: {
  marginTop:"1%", width: 400, height: 240, marginLeft:10
},

});
  export default HomeScreen;



