import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View , Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { ImageTrombi } from "./ImageTrombi";
import widget2 from '../../assets/agenda.png';
import widget3 from '../../assets/meteo.png';
import widget4 from '../../assets/trombi.png';
import widget5 from '../../assets/news.png';
import widget6 from '../../assets/horloge.png';

export default class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.getData(),
            isWidget: true,
        };
    }

    componentDidMount() {
        const { src } = this.props;
        if (src !== 'likedWidget') {
            this.setState({ isWidget: false });
        }
    }

    getData = async () => {
        const { src } = this.props;

        try {
            const jsonValue = await AsyncStorage.getItem(src);
            console.log(jsonValue);
            if (jsonValue != null) {
                this.setState({ data: JSON.parse(jsonValue) });
            }
        } catch (e) {
            console.error('Erreur lors de la récupération des données:', e);
        }
        console.log(src, this.state.data);
    };

    render() {
        const { data, isWidget } = this.state;
        const { title } = this.props;

        const renderWidget = (id) => {
            switch (id) {
                case '2':
                    return widget2;
                case '3':
                    return widget3;
                case '4':
                    return widget4;
                case '5':
                    return widget5;
                case '6':
                    return widget6;
                default:
                    return null;
            }
        };

        const renderItem = ({ item }) => {
            console.log(item);
            return (
                <View>
                    <TouchableOpacity >
                        {isWidget ? (
                            <Image style={{ width:100, height:100, margin:30, marginHorizontal:25 }} source={renderWidget(item)} ></Image>
                        ) : (
                            <View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.setState({ data: this.getData() })}>
                    <Text style={styles.title}>{title}</Text>
                </TouchableOpacity>
                <FlatList
                    horizontal
                    data={data}
                    keyExtractor={(item) => item}
                    renderItem={(item) => renderItem(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4762AE',
        borderRadius: 40,
        shadowColor:'#444',
        shadowRadius: 16,
        shadowOpacity: 0.5,
        shadowOffset : {width : 0, height: 12},
        elevation:24,
        position: 'relative',
        height: 200,
        width: 350,
        marginBottom: 300,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        left: 20,
        top: 12,
    },
});
