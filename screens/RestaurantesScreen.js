import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, Image, ScrollView, TextInput, FlatList, Body, Picker } from 'react-native';
import Restaurante from '../src/components/restcomp.js'
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { gql } from 'apollo-boost'; // graphql-tag
import { Overlay } from 'react-native-elements';

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
const ConseguirActividades = (item) => {
  const act = item.actividades.map((actividad) => actividad.actividade.nombre);
  return act
}

const ConseguirEspecialidades = (item) => {

  const esp = item.especialidades.map((especialidad) => especialidad.especialidade.nombre);
  return esp
}

export default function RestauranteScreen() {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GASTRONOMICOS, {

    pollInterval: 5000,
  });

  const _renderGastronomicos = ({ item }) => (
    <View key={item.id} style={styles.line}>
      <Restaurante nombre={item.nombre} localidad={item.localidade?.nombre} foto={item.foto}
        lat={item.lat} lng={item.lng} domicilio={item.domicilio} id={item.id}
        actividad={ConseguirActividades(item)} especialidad={ConseguirEspecialidades(item)}
      />
    </View>
  );

  const checkNombreAct = (item) => item.actividade.id === actividad;
  const checkNombreEsp = (item) => item.especialidade.id === especialidad;

  const filtrosGastronomicos = (data) => {

    let { gastronomicos } = data;
    if (buscar !== '') {
      gastronomicos = gastronomicos.filter(i => i.nombre.toLowerCase().indexOf(buscar.toLowerCase()) >= 0);
    }

    if (localidad !== null) {
      gastronomicos = gastronomicos.filter(i => i.localidad_id === localidad);
    }

    if (actividad !== null) {
      gastronomicos = gastronomicos.filter(i => i.actividades.some(checkNombreAct))
    }

    if (especialidad !== null) {
      gastronomicos = gastronomicos.filter(i => i.especialidades.some(checkNombreEsp))
    }
    return gastronomicos;
  }

  const ReiniciarFiltros = () => {
    setSelectedActividad('Actividad')
    setSelectedEspecialidad('Especialidad')
    setSelectedValue('Localidad')
    handleClick()
  }

  //BOTON DE FILTRAR
  const handleClick = () => {
    if (selectedValue === 'Ushuaia')
      setlocalidad(1)
    else if (selectedValue === 'Rio Grande')
      setlocalidad(2)
    else if (selectedValue === 'Tolhuin')
      setlocalidad(3)
    else if (selectedValue === 'Buenos Aires')
      setlocalidad(4)
    else if (selectedValue === 'Antartida')
      setlocalidad(5)
    else if (selectedValue === 'Puerto Almanza')
      setlocalidad(6)
    else if (selectedValue === 'Valles Fueguinos')
      setlocalidad(7)

    if (selectedActividad === 'Actividad')
      setactividad(null)
    if (selectedActividad === 'Restaurante')
      setactividad(8)
    else if (selectedActividad === 'Pizzería')
      setactividad(9)
    else if (selectedActividad === 'Tenedor Libre')
      setactividad(10)
    else if (selectedActividad === 'Comida Rapida')
      setactividad(11)
    else if (selectedActividad === 'Confiteria - Cafe')
      setactividad(12)
    else if (selectedActividad === 'Bar - Pub')
      setactividad(13)
    else if (selectedActividad === 'Vegetariana')
      setactividad(14)
    else if (selectedActividad === 'Cerveceria')
      setactividad(16)
    else if (selectedActividad === 'Heladeria')
      setactividad(17)
    else if (selectedActividad === 'Rotiserias')
      setactividad(18)
    else if (selectedActividad === 'Cordero - Guiso')
      setactividad(20)
    else if (selectedActividad === 'Bar - Pub')
      setactividad(21)

    if (selectedEspecialidad === 'Especialidad')
      setespecialidad(null)
    if (selectedEspecialidad === 'Cordero-Parrilla')
      setespecialidad(8)
    else if (selectedEspecialidad === 'Frutos de Mar')
      setespecialidad(9)
    else if (selectedEspecialidad === 'Centolla')
      setespecialidad(10)
    else if (selectedEspecialidad === 'Merluza Negra')
      setespecialidad(11)
    else if (selectedEspecialidad === 'Salmon, Trucha y Otros')
      setespecialidad(12)
    else if (selectedEspecialidad === 'Pizza, Pasta y Minutas')
      setespecialidad(13)
    else if (selectedEspecialidad === 'Vegetariano')
      setespecialidad(14)
    else if (selectedActividad === 'Menú para Celiacos')
      seespecialidadd(15)
    else if (selectedEspecialidad === 'Comida Mediterranea')
      setespecialidad(16)
    else if (selectedEspecialidad === 'Heladería')
      setespecialidad(17)
    else if (selectedEspecialidad === 'Fiambreria-Vineria')
      setespecialidad(18)
    else if (selectedEspecialidad === 'Fast Food')
      setespecialidad(19)
    else if (selectedEspecialidad === 'Cerveza Artesanal')
      setespecialidad(20)
    else if (selectedEspecialidad === 'Cafeteria')
      setespecialidad(21)
    else if (selectedEspecialidad === 'Panaderia')
      setespecialidad(22)
    else if (selectedEspecialidad === 'Pastas Caseras')
      setespecialidad(23)
    else if (selectedEspecialidad === 'Codero - Guiso')
      setespecialidad(24)
    else if (selectedEspecialidad === 'Chocolaterias')
      setespecialidad(25)
  }

  const [buscar, onChangeBuscar] = useState('');
  const [localidad, setlocalidad] = useState(null);
  const [actividad, setactividad] = useState(null);
  const [especialidad, setespecialidad] = useState(null);
  const [checkedUsh, setCheckedUsh] = useState(false);
  const [checkedRG, setCheckedRG] = useState(false);
  const [latitud, setLatitud] = useState(null);
  //VALOR QUE SE USA EN EL DROPDOWN
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedActividad, setSelectedActividad] = useState(null);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);

  let dataLocalidad = [{
    value: 'Localidad',
  },
  {
    value: 'Ushuaia',
  }, {
    value: 'Rio Grande',
  }, {
    value: 'Tolhuin',
  },
  {
    value: 'Buenos Aires',
  }, {
    value: 'Antartida',
  }, {
    value: 'Puerto Almanza',
  }, {
    value: 'Valles Fueguinos',
  }];

  let dataActividad = [{
    value: 'Actividad',
  },
  {
    value: 'Restaurante',
  }, {
    value: 'Pizzería',
  }, {
    value: 'Tenedor Libre'
  },
  {
    value: 'Comida Rapida',
  },
  {
    value: 'Confiteria - Cafe',
  }, {
    value: 'Bar - Pub',
  }, {
    value: 'Vegetariana',
  },
  {
    value: 'Cerveceriae',
  },
  {
    value: 'Heladeria',
  },
  {
    value: 'Rotiserias',
  },
  {
    value: 'Cordero - Guiso',
  },
  {
    value: 'Bar - Pub',
  },

  ];

  let dataEspecialidad = [{
    value: 'Especialidad',
  },
  {
    value: 'Cordero-Parrilla',
  }, {
    value: 'Frutos de Mar',
  }, {
    value: 'Centolla'
  },
  {
    value: 'Merluza Negra',
  },
  {
    value: 'Salmon, Trucha y Otros',
  }, {
    value: 'Pizza, Pasta y Minutas',
  },
  {
    value: 'Vegetariano',
  },
  {
    value: 'Menú para Celiacos',
  },
  {
    value: 'Comida Mediterranea',
  },
  {
    value: 'Heladería',
  },
  {
    value: 'Fiambreria-Vineria',
  },
  {
    value: 'Fast Food',
  },
  {
    value: 'Cerveza Artesanal',
  },
  {
    value: 'Cafeteria',
  },
  {
    value: 'Panaderia',
  },
  {
    value: 'Pastas Caseras',
  },
  {
    value: 'Codero - Guiso',
  },
  {
    value: 'Chocolaterias',
  },
  ];

  const [over, setOver] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ width: 100 }}>
        <Button title='Filtros' color='#FF8000'
          onPress={() => setOver(true)} />
      </View>
      <Overlay isVisible={over} style={{ width: 90, height: 90 }}
        onBackdropPress={() => setOver(false)}>
        <TextInput placeholder="Ingrese el nombre del Restaurante" onChangeText={(value) => onChangeBuscar(value)} >
        </TextInput>

        <Picker
          selectedValue={selectedValue}
          style={{ height: 80, width: 180 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {dataLocalidad.map((localidad, idx) => <Picker.Item key={idx} value={localidad.value} label={localidad.value} />)}
        </Picker>

        <Picker
          selectedValue={selectedActividad}
          style={{ height: 50, width: 180 }}
          onValueChange={(itemValue, itemIndex) => setSelectedActividad(itemValue)}
        >
          {dataActividad.map((actividad, idx) => <Picker.Item key={idx} value={actividad.value} label={actividad.value} />)}
        </Picker>

        <Picker
          selectedValue={selectedEspecialidad}
          style={{ height: 50, width: 180 }}
          onValueChange={(itemValue, itemIndex) => setSelectedEspecialidad(itemValue)}
        >
          {dataEspecialidad.map((especialidad, idx) => <Picker.Item key={idx} value={especialidad.value} label={especialidad.value} />)}
        </Picker>

        <Button title='Filtrar' onPress={() => { handleClick() }} />
        <Button title='Reiniciar' onPress={() => { ReiniciarFiltros() }} />

      </Overlay>

      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text>ERFROR</Text>
      ) : (
            <FlatList
              initialNumToRender={25}
              windowSize={10}
              data={filtrosGastronomicos(data)}
              ListEmptyComponent={<Text>Lista vacía</Text>}
              renderItem={_renderGastronomicos}
              keyExtractor={gastronomico => gastronomico.id}
            />

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

