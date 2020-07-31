import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Image } from 'react-native-elements'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';


export default function FullGastronomicoScreen({ route }) {
  const { item } = route.params;
  console.log(item)

  const renderEspecialidades =(item) => {
    return item.especialidad.map((item, index) => <Text key={index}>{item}, </Text>);
  }

  const renderActividades =(item) => {
    return item.actividad.map((item, index) => <Text key={index}>{item}, </Text>);
  }

  return (

    <View >
   {console.log(item)}
      <Image
        source={{ uri: item.foto }} defaultSource={require('../src/components/images/noimage.jpg')}
        style={{ width: 430, height: 300 }}
      />

      <View style={styles.container} >
        <Text style={styles.titleText}>{item.nombre}</Text>
      </View>

      <View style={{ marginTop: 80, marginLeft: 15 }}>
        <View>
          <Text>{item.domicilio}</Text>
        </View >
        <View style= {{marginTop:20}}>
          
          <Text >ESPECIALIDAD: {renderEspecialidades(item)}</Text>
        </View>
        <View style= {{marginTop:20}}>
          <Text >ACTIVIDAD: {renderActividades(item)}</Text>
        </View>
      </View>

      <View style={styles.map}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: item.lat,
            longitude: item.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: item.lat,
              longitude: item.lng
            }}>

          </Marker>

        </MapView>
      </View>
    </View>
  )
};


const styles = StyleSheet.create({



  container: {
    flex: 1,
    alignItems: 'center',
  },



  titleText: {
    fontSize: 20,
    fontWeight: "bold",


  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 290,
    width: 300,
    height: 140,
    flex: 1,
    marginLeft: 27,
    borderBottomColor: 'black'

  },

});
