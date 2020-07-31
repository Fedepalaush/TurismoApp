import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  AsyncStorage,
}
  from 'react-native';

import Hotel from '../src/components/hotelcomp.js'
import Restaurante from '../src/components/restcomp.js'

class FavoritosScreen extends Component  {
   constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }



  async componentDidMount() {

    try {
      const gastronomicos = await AsyncStorage.getItem('restauranteFav');
      const alojamientos = await AsyncStorage.getItem('hotelFav');
      this.setState({
        list: JSON.parse(gastronomicos).concat(JSON.parse(alojamientos))
       
      });

    } catch (_) {
      console.log(_);
    }
  }

 
  render() {

    return (
      <ScrollView styles={styles.containter}>
        <View>
    
          {this.state.list.map((data, i) => {
            
      
           
            // codigo
            if (data.gastronomico) {
              console.log(data)
              
              return [< Restaurante id={data.id} nombre={data.nombre} localidad={data.localidad} 
              foto={data.foto} estrella={data.estrella = true} colorEstrella={data.colorEstrella = 'gold'}
               lat={data.lat} lng={data.lng} especialidad={data.especialidad} actividad={data.actividad} />,
               <View style={[{ width: "20%", margin: 10, marginLeft:250, marginTop:-30 }]}>
               <Button
                 
                 title="Fotos Fav"
                 backgroundColor="blue"
                 onPress={() => this.props.navigation.navigate('FotosFav', {data:data})}
                
               />
             </View> 
             ]
               
            }
            else
              return [<Hotel id={data.id} nombre={data.nombre} localidad={data.localidad.nombre} 
              foto={data.foto} localidad={data.localidad} lat={data.lat} lng={data.lng}
               estrella={data.estrella = true} colorEstrella={data.colorEstrella = 'gold'} 
               categoria={data.categoria}/>, <View style={[{ width: "20%", margin: 10, marginLeft:250, marginTop:-30 }]}>
               <Button
                 
                 title="Fotos Fav"
                 backgroundColor="blue"
                 onPress={() => this.props.navigation.navigate('FotosFav', {data:data})}
                
               />
             </View> 
             ]

          })}
        </View>
      </ScrollView>
    )
  }

}
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    marginTop: 80
  }
})
export default FavoritosScreen;