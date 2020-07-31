import React, { Component, useState } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  onPress,
  Dimensions,
  AsyncStorage,

} from 'react-native'
import Button from './Button.js'
import { useNavigation } from '@react-navigation/native';

import noImage from './images/noimage.jpg'
import { Icon } from 'react-native-elements';
const widthScreen = Math.round(Dimensions.get('window').width);
const heightScreen = Math.round(Dimensions.get('window').height);


export default function Hotel(props) {
  const [estrella, setEstrella] = useState(props.estrella);
  const [colorEstrella, setColorEstrella] = useState(props.colorEstrella);
  const navigation = useNavigation();





  const onpressStar = async () => {

    const arrayData = [];
    if (!estrella) {
      setColorEstrella('gold')
      setEstrella(true)

      const data = {
        id: props.id,
        nombre: props.nombre,
        localidad: props.localidad,
        domicilio: props.domicilio,
        foto: props.foto,
        estrella: props.estrella,
        gastronomico: false,
        colorEstrella: props.colorEstrella,
        lat: props.lat,
        lng: props.lng,
        categoria: props.categoria,
        fotosFav: []


      }



      AsyncStorage.getItem('hotelFav').then((value) => {

        if (value !== null) {
          const d = JSON.parse(value);

          d.push(data)

          AsyncStorage.setItem('hotelFav', JSON.stringify(d))
        }

        else {
          arrayData.push(data)
          AsyncStorage.setItem('hotelFav', JSON.stringify(arrayData))
        }

      }
      )
    }
    else {
      AsyncStorage.getItem('hotelFav').then((value) => {
        const d = JSON.parse(value);
        console.log(props.id + "  es el valor de props")
        d.splice(d.findIndex(item => item.id === props.id), 1)
        AsyncStorage.setItem('hotelFav', JSON.stringify(d))
      }
      )
      setColorEstrella('black')
      setEstrella(false)

    }



    const resulta = await AsyncStorage.getItem('hotelFav')
    console.log(resulta)


  }




  const myloop = [];
  let cont = 0;
  cont = props.categoria ? props.categoria["valor"] : null

  for (let i = 0; i < cont; i++) {
    myloop.push(
      <View key={i}>
        <Icon
          name="star" color='black'

        />
      </View>
    );
  }

  return (

    <View style={{ flexDirection: 'row', fontSize: 25, flex: 0.4 }}>
      <View>

        <TouchableOpacity onPress={() => navigation.navigate('FullHotel', { item: props })} >
          <Image source={{ uri: props.foto }} style={styles.image} />
        </TouchableOpacity>
      </View>


      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Text style={{ marginTop: 10, marginLeft: widthScreen * 0.01, fontFamily: 'sans-serif' }}>{props.nombre}</Text>
        <Text style={{ marginTop: 55, marginLeft: widthScreen * -0.23, fontFamily: 'sans-serif' }}>{props.localidad ? props.localidad["nombre"] : null}</Text>
        </View>
        <View style={{flex:0.9,  flexDirection: 'row', marginLeft: -110, marginTop:100, alignContent:'center'}}>
          {myloop}
        </View>  
        
    

      <View style={{ flexDirection: 'row', flex: 0.1 }}>
        <View style={styles.star}>
          <TouchableOpacity
            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
          >
            <Icon
              name="star" color={colorEstrella}
              onPress={() => onpressStar()}
            />
          </TouchableOpacity >
        </View>



      </View>
    </View>

  )
}
var styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#F5FCFF',
    marginTop: 10,
    marginHorizontal: 10,
  },
  image: {
    marginTop: "8%", width: 220, height: 140, borderRadius: 50, marginLeft: 8
  },
  line: {

    marginTop: 30,
    borderBottomColor: '#920747',
    borderBottomWidth: 10,

  },
  icono: {
    marginLeft: -120,
    marginTop: 130

  },
  star: {
    marginTop: 135,
    marginLeft: -25
  },
});


