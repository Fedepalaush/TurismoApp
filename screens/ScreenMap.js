import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Button, SafeAreaView, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { gql } from 'apollo-boost'; // graphql-tag
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { graphql } from 'graphql';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 720,
    width: 410,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 30,
    right: 0,
    bottom: 0,
    left: 0,
  
  },
});

const initialPosition = {
  latitude: -54.7999968,
  longitude: -68.2999988,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const GASTRONOMICOS = gql`
query myquery{
  gastronomicos {
    id,
    nombre,
    foto, 
    lat,
    lng,
    domicilio,
    localidad_id,
    localidade {
        nombre
    }
    especialidades {
      especialidade {
        id
        nombre
      }
    }
    actividades {
      actividade {
        id
        nombre
      }
    }
  }
}`;


export default function MapScreen() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [gastronomicos, setGastronomicos] = useState([]);
  const [alojamientosFiltrados, setAlojamientosFiltrados] = useState([]);
  const [gastronomicosFiltados, setGastronomicosFiltrados] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeMarkerGastro, setActiveMarkerGastro] = useState(null);
  const [activeMarkerAlojamiento, setActiveMarkerAlojamiento] = useState(null);
  const [url, setUrl] = useState('http://192.168.0.4:3000/alojamientos?select=id,nombre,domicilio,lat,lng,foto,clasificacion:clasificaciones(id,nombre),categoria:categorias(id,estrellas,valor),localidad:localidades(id,nombre)',);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [item, setItem] = useState(null);
  const navigation = useNavigation();
  /* const [buscar, onChangeBuscar] = useState(''); */
  const [datos, setDatos] = useState ([])
  const [filtroActivo, setFiltroActivo] = useState (false)
  

  const graphqlGastro = useQuery(GASTRONOMICOS, {
    pollInterval: 5000,
  });

  const ConseguirActividades = (item) => {
    const act = item.actividades.map((actividad) => actividad.actividade.nombre);
    return act
  }
  const ConseguirEspecialidades = (item) => {
    const esp = item.especialidades.map((especialidad) => especialidad.especialidade.nombre);
    return esp
  }

  const EsHotel = (item) => {
    if (item.categoria){
      return true
    }
  }

  const filtrar = (word) => {
    setFiltroActivo (true)
    setGastronomicos(graphqlGastro.data.gastronomicos.filter(i => i.nombre.toLowerCase().includes(word.toLowerCase())))
    setAlojamientos(alojamientos.filter(i => i.nombre.toLowerCase().includes(word.toLowerCase())))
  }

  const fetchAlojamientos = async () => {
    const { data } = await axios(url);
    setAlojamientos(data);
  };


  useEffect(() => {
    setIsLoading(true);
    
    fetchAlojamientos();
    if (graphqlGastro.data) {
      setGastronomicos(graphqlGastro.data.gastronomicos)
    }
    
    Geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords;
      setCurrentPosition({
        ...currentPosition,
        latitude,
        longitude,
      })
    },
      error => alert(error.message),
      { timeout: 15000, maximumAge: 10000 }
    );

    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
      ) : (<View style={styles.map}>
        <View style={{marginTop:-20}}>
        <TextInput 
          placeholder="Ingrese el nombre a buscar" 
          onChangeText={(value) => filtrar(value)}>
        </TextInput>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation
            initialRegion={currentPosition}
            onPress={() => { setActiveMarker(false) }}
          >
            {alojamientos.map(item => (
                EsHotel(item),
              <Marker
                coordinate={{
                  latitude: item.lat,
                  longitude: item.lng
                }}
                onPress={(event) => {
                  event.stopPropagation()
                  setActiveMarkerAlojamiento(true)
                  setItem(item)
                }}
                icon="marker"
              >
                <View style={{ backgroundColor: '#40E9A4', padding: 5, borderRadius: 10, elevation: 3, shadowRadius: 2, shadowColor: 'black', shadowOffset: { width: 10, height: 10 } }}>
                  <Icon name="hotel" size={20} color="white" />
                </View>
              </Marker>
            )
            )}
            {gastronomicos && gastronomicos.map(item => (
                item.actividad=ConseguirActividades(item),
                item.especialidad= ConseguirEspecialidades(item),
              <Marker
                coordinate={{
                  latitude: item.lat,
                  longitude: item.lng
                }}
                onPress={(event) => {
                  event.stopPropagation()
                  setActiveMarkerGastro(true)
                  setItem(item)
                }}
                icon="marker"
              >
                <View style={{ backgroundColor: '#40E9A4', padding: 5, borderRadius: 10, elevation: 3, shadowRadius: 2, shadowColor: 'black', shadowOffset: { width: 10, height: 10 } }}>
                  <Icon name="food" size={20} color="white" />
                </View>
              </Marker>

            )
            )}


          </MapView>
          </View>
        )}

      {activeMarkerAlojamiento ?

        (<View style={{ position: 'absolute', bottom: 400, left: 100, height: 200, width: 200, backgroundColor: 'white' }}>
          <TouchableOpacity onPress={() => navigation.navigate('FullHotel', { item: item })} >
            <Image source={{ uri: item.foto }} style={{ height: 100, width: 200 }} />
            <Text>
              {item.nombre}
            </Text>
          </TouchableOpacity>
        </View>)
        : null}

      {activeMarkerGastro ?

        (<View style={{ position: 'absolute', bottom: 400, left: 100, height: 200, width: 200, backgroundColor: 'white' }}>
          <TouchableOpacity onPress={() => navigation.navigate('FullGastronomico', { item: item })} >
            <Image source={{ uri: item.foto }} style={{ height: 100, width: 200 }} />
            <Text>
              {item.nombre}
            </Text>
          </TouchableOpacity>
        </View>)
        : null}
    </View>
  );
}

