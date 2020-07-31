import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen.js';
import AlojamientosScreen from './screens/AlojamientosScreen.js';
import RestaurantesScreen from './screens/RestaurantesScreen.js';
import FavoritosScreen from './screens/FavoritosScreen.js';
import FotosFavScreen from './screens/FotosFavScreen.js';
import MapScreen from './screens/ScreenMap.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import FullHotelScreen from './screens/FullHotelScreen.js';
import FullGastronomicoScreen from './screens/FullGastronomicoScreen.js';
import FiltroScreen from './screens/FiltroScreen.js';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const HomeStack = createStackNavigator();
const AlojamientosStack = createStackNavigator();
const RestaurantesStack = createStackNavigator();
const FavoritosStack = createStackNavigator();
const MapStack = createStackNavigator();

const FiltroStack = createStackNavigator();
const Drawer = createDrawerNavigator();



const HomeStackScreen =({navigation}) => (
<HomeStack.Navigator screenOptions={{
       headerStyle: {
         backgroundColor: '#920747',
          },
       headerTintColor:'white',
       headerTitleStyle: {
        fontWeight: 'bold'
       }
     }}>
     <HomeStack.Screen name="Home" component= {HomeScreen} options={{
     title:'Menú',
     headerLeft: () => (
       <Icon.Button name ="ios-menu" size={25}
        backgroundColor="#920747" onPress= {() => navigation.
          openDrawer()}></Icon.Button>
     )
    }}     
     />
    </HomeStack.Navigator>
); 

const AlojamientosStackScreen =({navigation}) => (

  <AlojamientosStack.Navigator screenOptions={{
         headerStyle: {
           backgroundColor: '#920747',
            },
         headerTintColor:'#fff',
         headerTitleStyle: {
          fontWeight: 'bold'
         }
       }}>
       <AlojamientosStack.Screen name="Alojamientos" component= {AlojamientosScreen} options={{
          headerLeft: () => (
       <Icon.Button name = "ios-menu" size={25}
        backgroundColor="#920747" onPress= {() => {navigation.
          openDrawer()}}></Icon.Button>
     )
    }}      />
      </AlojamientosStack.Navigator>
); 
  

  const RestaurantesStackScreen =({navigation}) => (

    <RestaurantesStack.Navigator screenOptions={{
           headerStyle: {
             backgroundColor: '#FF8000',
              },
           headerTintColor:'#fff',
           headerTitleStyle: {
            fontWeight: 'bold'
           }
         }}>
         <RestaurantesStack.Screen name="Restaurantes" component= {RestaurantesScreen} options={{
            headerLeft: () => (
         <Icon.Button name = "ios-menu" size={25}
          backgroundColor="#FF8000" onPress= {() => {navigation.
            openDrawer()}}></Icon.Button>
       )
      }}      />
        </RestaurantesStack.Navigator>
    ); 

    const FavoritosStackScreen =({navigation}) => (

      <FavoritosStack.Navigator screenOptions={{
             headerStyle: {
               backgroundColor: '#FF8000',
                },
             headerTintColor:'#fff',
             headerTitleStyle: {
              fontWeight: 'bold'
             }
           }}>
           <FavoritosStack.Screen name="Favoritos" component= {FavoritosScreen} options={{
              headerLeft: () => (
           <Icon.Button name = "ios-menu" size={25}
            backgroundColor="#FF8000" onPress= {() => {navigation.
              openDrawer()}}></Icon.Button>
         )
        }}      />
          </FavoritosStack.Navigator>
      ); 

        const MapStackScreen =({navigation}) => (

          <MapStack.Navigator screenOptions={{
                 headerStyle: {
                   backgroundColor: '#FF8000',
                    },
                 headerTintColor:'#fff',
                 headerTitleStyle: {
                  fontWeight: 'bold'
                 }
               }}>
               <MapStack.Screen name="Mapa" component= {MapScreen} options={{
                  headerLeft: () => (
               <Icon.Button name = "ios-menu" size={25}
                backgroundColor="#FF8000" onPress= {() => {navigation.
                  openDrawer()}}></Icon.Button>
             )
            }}      />
              </MapStack.Navigator>
          ); 


        
         
        const FiltroStackScreen =({navigation}) => (

          <FiltroStack.Navigator screenOptions={{
                 headerStyle: {
                   backgroundColor: '#FF8000',
                    },
                 headerTintColor:'#fff',
                 headerTitleStyle: {
                  fontWeight: 'bold'
                 }
               }}>
               <FiltroStack.Screen name="Filtro" component= {FiltroScreen} options={{
                  headerLeft: () => (
               <Icon.Button name = "ios-menu" size={25}
                backgroundColor="#FF8000" onPress= {() => {navigation.
                  openDrawer()}}></Icon.Button>
             )
            }}      />
              </FiltroStack.Navigator>
          ); 




          const client = new ApolloClient({
            uri: 'http://192.168.0.4:8080/v1/graphql',
          });
  

const App = () => {
  console.disableYellowBox = true;
  return (
    
    
    <ApolloProvider client={client}>
   <NavigationContainer>

<Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Alojamientos" component={AlojamientosStackScreen} />
        <Drawer.Screen name="Restaurantes" component={RestaurantesStackScreen} />
        <Drawer.Screen name="Favoritos" component={FavoritosStackScreen} />
        <Drawer.Screen name="Mapa" component={MapStackScreen} />
        <Drawer.Screen name="Filtro" component={FiltroStackScreen} />
        <Drawer.Screen name="FotosFav" component={FotosFavScreen} />
        <Drawer.Screen name="FullGastronomico" component={FullGastronomicoScreen} options= {{
        title:' ', }}
         />
        <Drawer.Screen name="FullHotel" component={FullHotelScreen} options= {{
        title:' ', }}
         />
</Drawer.Navigator>

   </NavigationContainer>
   </ApolloProvider>
  );
}
export default App;


