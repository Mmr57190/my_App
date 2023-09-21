import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getById } from '../components/ApiCall';
import ImageTrombi from '../components/ImageTrombi';
import Constants from 'expo-constants';
import qs from 'qs';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;
    let url = `mailto:${to}`;

    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });
    if (query.length) {
        url += `?${query}`;
    }
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}

export default function ProfilsScreen({ route }) {
    const navigation = useNavigation();
    const [birthDate, setBirthDate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [work, setWork] = useState('');
    const [surname, setSurname] = useState('');
    const [id, setId] = useState('');
    const apiKey = Constants.expoConfig.extra.apiKey;

    useEffect(() => {
        getById(route.params.idUser).then((response) => {
            setBirthDate(response.birth_date)
            setName(response.name)
            setSurname(response.surname)
            setEmail(response.email)
            setWork(response.work)
            setId(route.params.idUser)
        });
    }, [route.params.idUser]);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Trombinoscope')}>
                <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>
            <ImageTrombi personId={id} />
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
                <TouchableOpacity onPress={() => sendEmail(email)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <Icon name="envelope" size={24} color="white" />
                        <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>{email}</Text>
                    </View>
                </TouchableOpacity>
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
