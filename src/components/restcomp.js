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
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Button from './Button.js'
import Favoritos from '../../screens/FavoritosScreen.js'

const widthScreen = Math.round(Dimensions.get('window').width);
const heightScreen = Math.round(Dimensions.get('window').height);


export default function Restaurante(props) {


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
        foto: props.foto,
        actividad: props.actividad,
        especialidad: props.especialidad,
        gastronomico: true,
        colorEstrella: 'gold',
        lat: props.lat,
        lng: props.lng,
        fotosFav: []

      }
      AsyncStorage.getItem('restauranteFav').then((value) => {

        if (value !== null) {
          const d = JSON.parse(value);

          d.push(data)

          AsyncStorage.setItem('restauranteFav', JSON.stringify(d))
        }

        else {
          arrayData.push(data)
          AsyncStorage.setItem('restauranteFav', JSON.stringify(arrayData))
        }

      }
      )
    }
    else {
      AsyncStorage.getItem('restauranteFav').then((value) => {
        const d = JSON.parse(value);
     
        d.splice(d.findIndex(item => item.id === props.id), 1)
        AsyncStorage.setItem('restauranteFav', JSON.stringify(d))
      }
      )
      setColorEstrella('black')
      setEstrella(false)

    }



    const resulta = await AsyncStorage.getItem('restauranteFav')
 



  }


  return (


    <View style={{ flexDirection: 'row', fontSize: 25, flex: 0.4 }}>

      <View>
       
        <TouchableOpacity onPress={() => navigation.navigate('FullGastronomico', { item: props })} >
          <Image source={{ uri: props.foto }} style={styles.image} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 0.9 }}>
        <Text style={{ marginTop: 10, marginLeft: widthScreen * 0.01, fontFamily: 'sans-serif' }}>{props.nombre}</Text>
        <Text style={{ marginTop: 35, marginLeft: widthScreen * 0.05, fontFamily: 'sans-serif' }}>{props.localidad}</Text>
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
    marginTop: "8%", width: 220, height: 140, borderRadius: 50, marginLeft: 10
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


