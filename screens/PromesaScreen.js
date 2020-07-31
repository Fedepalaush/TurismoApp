import React, {useEffect, useState} from 'react';
import {ScrollView, Text, StyleSheet, View, FlatList} from 'react-native';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost'; // graphql-tag
import {createStackNavigator} from '@react-navigation/stack';
import piletaArakur from '../src/components/images/piletaArakur.jpg';
import {useNavigation} from '@react-navigation/native';
import Hotel from '../src/components/hotelcomp';
import { TextInput } from 'react-native-gesture-handler';


const Stack = createStackNavigator();

    const client = new ApolloClient({
      uri: 'http://192.168.0.8:8080/v1/graphql',
    });
   
    const GraphqlProviderScreen = () => {
    
       return (
        <ApolloProvider client={client}>
          <Stack.Navigator>
            <Stack.Screen name="ALOJAMIENTOS" component={GraphqlProviderChild} />
          </Stack.Navigator>
        </ApolloProvider>
      );
    };
 
      const ALOJAMIENTOS =  gql`
          query myquery($localidad: Int) {
            alojamientos(where: {nombre: {}, localidad_id: {_eq: $localidad}}) {
              id
              nombre
              domicilio
              categoria {
                valor
              }
              foto
              localidad_id
              localidade {
                
                nombre
              }
            
            }
          }
        `;
                 
  const GraphqlProviderChild = () => {
    const navigation = useNavigation();
    const {loading, error, data} = useQuery(ALOJAMIENTOS, {
      variables: {localidad: 1},
      pollInterval: 5000,
    });


  const _renderAlojamientos= ({item}) => (    
    <View >
      <Hotel nombre= {item.nombre} localidad = {item.localidade?.nombre} categoria= {item.categoria.valor} foto= {item.foto}>
      </Hotel>
    </View>
  );

  const getFilteredAlojmientos = (data) => {
    let {alojamientos} = data;
    console.log(alojamientos)
    if (buscar !== '') {
      alojamientos = alojamientos.filter(i => i.nombre.toLowerCase().indexOf(buscar.toLowerCase()) >= 0);
    }
    if (localidad !== null) {
      alojamientos = alojamientos.filter(i => i.localidad_id === localidad);
    }
    return alojamientos;
  };

  const [buscar, onChangeBuscar] = useState('');
  const [localidad, onChangeLocalidad] = useState(1);
 
  return (       
    <View style={styles.container}>
      
        <TextInput placeholder="Ingrese el nombre del Hotel" onChangeText={(value) => onChangeBuscar(value) } >

        </TextInput>
        {loading ? (
          <Text>Cargando...</Text>
        ) : error ? (
          <Text>ERROR</Text>
        ) : (  
            <View> 
              <FlatList
                initialNumToRender={25}
                windowSize={10}
                data={getFilteredAlojmientos(data)}
                ListEmptyComponent={<Text>Lista vacía</Text>}
                renderItem={_renderAlojamientos}
                keyExtractor={alojamiento => alojamiento.id}            
              />
  
            </View>     
      )}
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    padding: 10,
    borderBottomColor: '#920747',
    borderBottomWidth: 3,
  },
});
export default GraphqlProviderScreen;