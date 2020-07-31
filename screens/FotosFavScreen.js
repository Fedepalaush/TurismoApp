import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, AsyncStorage } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { ActionSheet, Root } from 'native-base'
const width = Dimensions.get('window').width;
import ImagePicker from 'react-native-image-crop-picker';
import { List } from 'react-native-paper';

export default class FotosFavScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            fileList: [],

        }
    }
    setValor = () => {
        const { data } = this.props.route.params
        if (data.gastronomico) {
            AsyncStorage.getItem('restauranteFav').then((value) => {
                const d = JSON.parse(value);
                const a = d.findIndex(item => item.id === data.id);
                const aux = d[a];
                aux.fotosFav = this.state.fileList
                d.splice(d.findIndex(item => item.id === data.id, 1))
                d.push(aux)
                AsyncStorage.setItem('restauranteFav', JSON.stringify(d))
            })
        } 
        else {
            AsyncStorage.getItem('hotelFav').then((value) => {
                const d = JSON.parse(value);
                const a = d.findIndex(item => item.id === data.id);
                const aux = d[a];
                aux.fotosFav = this.state.fileList
                d.splice(d.findIndex(item => item.id === data.id, 1))
                d.push(aux)
                AsyncStorage.setItem('hotelFav', JSON.stringify(d))
            })
        }
    }

    onSelectImage = (image) => {
        let newDataImg = this.state.fileList;
        const source = { uri: image.path };
        let item = {
            id: Date.now(),
            url: source,
            content: image.data
        };
        newDataImg.push(item);
        console.log("VOY A SETEAR EL VALOR")
        this.fileList = newDataImg
        console.log(" VALOR SETEADO")
    }
    TomarFotoCamara = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.onSelectImage(image);
            console.log(image);
            this.setValor();
        });
    }

    TomarFotoGaleria = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.onSelectImage(image);
        });
    }
    onClickAddImage = () => {
        console.log("Entre")
        const BUTTONS = ['SACAR FOTO', 'ELEGIR FOTO GALERIA', 'CANCELAR'];
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: 2,
                title: "Selecciona una Foto"
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        this.TomarFotoCamara();
                        break;
                    case 1:
                        this.TomarFotoGaleria();
                        break;
                    default:
                        break;
                }
            }
        )
    };

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.itemViewImage}>
                <Image source={item.url} style={styles.itemImage} />
            </View>
        )
    };

    componentDidMount() {
        const { data } = this.props.route.params
        if (!data.fotosFav.empty) {
            console.log(data.fotosFav + data.nombre)
            //BUCLE POR CADA FOTO
            var joined = this.state.fileList.concat(data.fotosFav);
            this.setState({ fileList: joined })
        }
        else {
            console.log("SI ERA")
            this.state.fileList = []
        }
    }
    componentDidUpdate() {
        const { data } = this.props.route.params
        console.log("ENTRE ACAAAA")
        // Uso tipico (no olvides de comparar los props):
        console.log("FILE LIST" + this.state.fileList)
        console.log("DATA LIST" + data.fotosFav)
        if (this.state.fileList !== data.fotosFav) {
            console.log("VACIO")
            this.setState({
                fileList: data.fotosFav
            });
        }
    }
    render() {
     
        const { navigation } = this.props
        const { data } = this.props.route.params
        let { content, btnPress, txtStyle } = styles;
        let { fileList } = this.state;
        return (
            <Root>
                <View style={content}>
                    <Text>Agregar Imagen</Text>
                    <Text>{data.nombre}</Text>
                    <FlatList
                        data={fileList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                    />
                    <TouchableOpacity onPress={this.onClickAddImage} style={btnPress}>
                        <Text style={txtStyle}>Presione para agregar una imagen</Text>
                    </TouchableOpacity>
                </View>
            </Root>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 30,
    },
    btnPress: {
        backgroundColor: '#0080ff',
        height: 50,
        width: width - 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtStyle: {
        color: '#ffffff'
    },
    itemImage: {
        backgroundColor: '#2F455C',
        height: 150,
        width: width - 60,
        borderRadius: 8,
        resizeMode: 'contain'
    },
    itemViewImage: {
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10
    }
});