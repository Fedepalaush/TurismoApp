import { View, Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Image } from 'react-native-elements'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Icon } from 'react-native-elements';

export default function FullHotelScreen({ route }) {
  const { item } = route.params;
  const myloop = [];
  let cont = 0;
  cont = item.categoria ? item.categoria["valor"] : null

  for (let i = 0; i < cont; i++) {
    myloop.push(
      <View key={i}>
        <Icon
          name="star" color='gold'
        />
      </View>
    );
  }

  return (
    <View >
      <Image
        source={{ uri: item.foto }} defaultSource={require('../src/components/images/noimage.jpg')}
        style={{ width: 430, height: 400 }}
      />
      <View style={styles.container} >
        <Text style={styles.titleText}>{item.nombre}</Text>
      </View>
      <View style={styles.container2}>
        <Text>{item.domicilio}</Text>
        <View style={{ marginTop: -70, flexDirection: 'row', marginLeft: 130, alignContent: 'center' }}>
          {myloop}
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
  container2: {
    marginTop: 90,
    marginLeft: 15
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




