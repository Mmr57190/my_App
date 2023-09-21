import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../components/ApiCall';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <View style={styles.logoContainer}>
            <Text>
              <Image
                source={require('../../assets/logo_small.png')}
                style={styles.logo}
              />
            </Text>
          </View>
        </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          placeholderTextColor={'#fff'}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor={'#fff'}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true} // Pour cacher le mot de passe
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={()=>login(email, password, navigation)}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4762AE', // Couleur de fond
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#3B5291', // Couleur de fond du conteneur du formulaire
    borderRadius: 10, // Coins arrondis
    padding: 20, // Espacement intérieur
    width: '80%', // Largeur du formulaire
  },
  logoContainer: {
    alignItems: 'center', // Pour centrer le logo
    marginBottom: 30, // Espacement en bas du logo
  },
  logoCircle: {
    width: 220,
    height: 220,
    backgroundColor: '#4762AE', // Couleur du cercle
    borderRadius: 110, // Pour obtenir un cercle parfait
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Espacement en bas du logo
  },
  logo: {
    width: 210, // largeur
    height: 210, // longueur
    marginBottom: 20, // Espacement en bas du logo
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#6278BC', // Couleur de la bordure
    borderRadius: 4,
    color: '#fff', // Couleur du texte
  },
  buttonContainer: {
    backgroundColor: '#6278BC', // Couleur de fond du bouton
    borderRadius: 4, // Coins arrondis du bouton
    padding: 10, // Espacement intérieur
    alignItems: 'center', // Centrer le texte horizontalement
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Couleur du texte du bouton
  },
});

export default LoginScreen;
