import React from 'react';
import { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { getSelf, getToken } from '../components/ApiCall';
import Constants from 'expo-constants';
import ImageTrombi from '../components/ImageTrombi';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfilScreen() {
    const navigation = useNavigation();
    const [birthDate, setBirthDate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [work, setWork] = useState('');
    const [surname, setSurname] = useState('');
    const [id , setId] = useState('');
    const apiKey = Constants.expoConfig.extra.apiKey;

    getSelf().then((response) => {
        setBirthDate(response.birth_date)
        setName(response.name)
        setSurname(response.surname)
        setEmail(response.email)
        setWork(response.work)
        setId(response.id)
    })
    return (
        <SafeAreaView style={styles.container}>
            <ImageTrombi personId={id} />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>
            <View style={styles.info}>
                <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Icon name="user" size={24} color="white" />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>{name} {surname}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Icon name="calendar" size={24} color="white" />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>{birthDate}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Icon name="envelope" size={24} color="white" />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>{email}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Icon name="briefcase" size={24} color="white" />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>{work}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 200,
        backgroundColor: '#F1F3F9',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
    },
    info: {
        padding: 10,
        width: 300,
        backgroundColor: '#4762AE',
        shadowColor: '#444',
        shadowRadius: 16,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 12 },
        elevation: 24,
        marginTop: 40,
        color: '#fff',
        borderRadius: 20,
    },
    backButton: {
        position: 'absolute',
        marginTop: 525,
        top: -10,
        left: 70,
        right: 70,
        zIndex: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#4762AE',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
