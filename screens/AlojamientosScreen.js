import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Picker, Button } from 'react-native';
import axios from 'axios';
import Hotel from '../src/components/hotelcomp';
import { Overlay } from 'react-native-elements';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsFetching(true);

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.warn(error);
        setIsError(true);
      }
      setIsFetching(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isFetching, isError }, setUrl];
};

const RestService = () => {
  const [{ data, isFetching, isError }, doFetch] = useDataApi(
    'http://192.168.0.4:3000/alojamientos?select=id,nombre,domicilio,lat,lng,foto,clasificacion:clasificaciones(id,nombre),categoria:categorias(id,estrellas,valor),localidad:localidades(id,nombre)',
    null,
  );



  const _renderAlojamiento = ({ item }) => (
    <View key={item.id} style={styles.line}>
 
      <Hotel id={item.id} nombre={item.nombre} foto={item.foto}
        categoria={item.categoria} localidad={item.localidad}
        lat={item.lat} lng={item.lng} domicilio={item.domicilio}
      >
      </Hotel>
    </View>
  );

  const filtrosAlojamientos = (data) => {
    let alojamientos = data;

    if (buscar !== '') {
      alojamientos = alojamientos.filter(i => i.nombre.toLowerCase().indexOf(buscar.toLowerCase()) >= 0);
    }
    if (localidad !== null) {
      alojamientos = alojamientos.filter(i => i.localidad.id === localidad);
    }
    if (categoria !== null) {
      alojamientos = alojamientos.filter(i => i.categoria.id === categoria)
    }
    if (clasificacion !== null) {
      alojamientos = alojamientos.filter(i => i.clasificacion.id === clasificacion)
    }
    return alojamientos;
  }

  const ReiniciarFiltros = () => {

    setSelectedCategoria('Categoría')
    setSelectedClasificacion('Clasificación')
    setSelectedValue('Localidad')
    handleClick()
  }

  const handleClick = () => {
    if (selectedValue === 'Localidad')
      setlocalidad(null)
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

    if (selectedCategoria === 'Categoría')
      setcategoria(null)
    if (selectedCategoria === '1')
      setcategoria(1)
    else if (selectedCategoria === '2')
      setcategoria(2)
    else if (selectedCategoria === '3')
      setcategoria(3)
    else if (selectedCategoria === '4')
      setcategoria(4)
    else if (selectedCategoria === '5')
      setcategoria(5)
    else if (selectedCategoria === '6')
      setcategoria(6)

    if (selectedClasificacion === 'Clasificación')
      setclasificacion(null)
    if (selectedClasificacion === 'Albergue')
      setclasificacion(1)
    else if (selectedClasificacion === 'Apart')
      setclasificacion(2)
    else if (selectedClasificacion === 'Cabaña')
      setclasificacion(3)
    else if (selectedClasificacion === 'Cama y Desayuno')
      setclasificacion(4)
    else if (selectedClasificacion === 'Camping')
      setclasificacion(5)
    else if (selectedClasificacion === 'Hospedaje')
      setclasificacion(6)
    else if (selectedClasificacion === 'Hosteria')
      setclasificacion(7)
    else if (selectedClasificacion === 'Hotel')
      setclasificacion(8)
    else if (selectedClasificacion === 'Alquiler Temporario')
      setclasificacion(9)
  }

  const [buscar, onChangeBuscar] = useState('');
  const [localidad, setlocalidad] = useState(null);
  const [categoria, setcategoria] = useState(null);
  const [clasificacion, setclasificacion] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedClasificacion, setSelectedClasificacion] = useState(null);

  let dataLocalidad = [
    {
      value: 'Localidad',
    }, {
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

  let dataClasificaciones = [
    {
      value: 'Clasificación',
    }, {
      value: 'Albergue',
    }, {
      value: 'Apart',
    }, {
      value: 'Cama y Desayuno',
    },
    {
      value: 'Camping',
    },
    {
      value: 'Hospedaje',
    }, {
      value: 'Hosteria',
    },
    {
      value: 'Hotel',
    },
    {
      value: 'Alquiler Temporario',
    },
  ];

  let dataCategorias = [
    {
      value: 'Categoría',
    }, {
      value: '1',
    }, {
      value: '2',
    }, {
      value: '3',
    },
    {
      value: '4',
    },
    {
      value: '5',
    }, {
      value: 'Especial',
    }];

  const [over, setOver] = useState(false)
  return (
    <View style={styles.container}>
      <View style={{ width: 100 }}>
        <Button title='Filtros' color='#920747'
          onPress={() => setOver(true)} />
      </View>
      <Overlay isVisible={over} style={{ width: 90, height: 90 }}
        onBackdropPress={() => setOver(false)}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {dataLocalidad.map((localidad, idx) =>
            <Picker.Item key={idx} value={localidad.value} label={localidad.value} />)}
        </Picker>
        <Picker
          selectedValue={selectedCategoria}
          style={{ height: 50, width: 180 }}
          onValueChange={(itemValue, itemIndex) => setSelectedCategoria(itemValue)}
        >
          {dataCategorias.map((categoria, idx) =>
            <Picker.Item key={idx} value={categoria.value} label={categoria.value} />)}
        </Picker>
        <Picker
          selectedValue={selectedClasificacion}
          style={{ height: 50, width: 180 }}
          onValueChange={(itemValue, itemIndex) => setSelectedClasificacion(itemValue)}
        >
          {dataClasificaciones.map((clasificacion, idx) =>
            <Picker.Item key={idx} value={clasificacion.value} label={clasificacion.value} />)}
        </Picker>

        <TextInput placeholder="Ingrese el nombre del Alojamiento" onChangeText={(value) => onChangeBuscar(value)} >
        </TextInput>
        <Button title='Filtrar' onPress={() => { handleClick() }} />
        <Button title='Reiniciar' onPress={() => { ReiniciarFiltros() }} />
      </Overlay>

      {isFetching ? (
        <Text>Cargando...</Text>
      ) : isError ? (
        <Text>ERROR</Text>
      ) : data ? (
        <FlatList
          initialNumToRender={25}
          windowSize={10}
          data={filtrosAlojamientos(data)}
          ListEmptyComponent={<Text>Lista vacía</Text>}
          renderItem={_renderAlojamiento}
          keyExtractor={alojamiento => alojamiento.id}
        />
      ) : (<Text>Lista vacía</Text>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default RestService;