import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Image, TouchableOpacity, Card } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import soleilImage from '../../assets/soleil.png';
import soleilNuagesImage from '../../assets/soleil_nuages.png';
import nuagesImage from '../../assets/nuages.png';
import pluieImage from '../../assets/pluie.png';

const WeatherScreen = () => {
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    temperature: null,
    humidity: null,
    windSpeed: null,
    feelsLike: null,
    description: '',
    city: '',
    loading: false,
  });

  const navigation = useNavigation();

  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission de localisation refusée');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setState(prevState => ({ ...prevState, latitude, longitude }));
        getCityName(latitude, longitude);
      } catch (error) {
        console.error('Erreur lors de l\'obtention de la localisation : ', error);
      }
    };

    const getCityName = async (latitude, longitude) => {
      const GEO_API_URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      try {
        const response = await fetch(GEO_API_URL);
        const data = await response.json();
        const city = data.address.city;
        setState(prevState => ({ ...prevState, city }));
        getWeatherData(city);
      } catch (error) {
        console.error('Erreur lors de la récupération du nom de la ville : ', error);
      }
    };

    const getWeatherData = async (city) => {
      const API_KEY = 'b66dd328f677b79756c30b7d4b2756ce';
      const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      try {
        setState(prevState => ({ ...prevState, loading: true }));
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();
        const { main, weather, wind } = data;
        const { temp, humidity, feels_like } = main;
        const { description } = weather[0];
        const { speed } = wind;
        setState(prevState => ({
          ...prevState,
          temperature: Math.round(temp),
          humidity,
          description,
          windSpeed: speed,
          feelsLike: Math.round(feels_like),
          loading: false
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo : ', error);
        setState(prevState => ({ ...prevState, loading: false }));
      }
    };

    getLocationAsync();
  }, []);

  const { city, temperature, humidity, windSpeed, feelsLike, description, loading } = state;

  const getWeatherImage = (description) => {
    const descriptionLowerCase = description.toLowerCase();
    if (descriptionLowerCase.includes('clear')) {
      return soleilImage;
    } else if (descriptionLowerCase.includes('few clouds')) {
      return soleilNuagesImage;
    } else if (descriptionLowerCase.includes('scattered clouds') || descriptionLowerCase.includes('broken clouds')) {
      return nuagesImage;
    } else if (descriptionLowerCase.includes('shower rain') || descriptionLowerCase.includes('rain')) {
      return pluieImage;
    } else {
      return null;
    }
  };

  const getBackgroundColor = (description) => {
    const descriptionLowerCase = description.toLowerCase();
    if (descriptionLowerCase.includes('scattered clouds') || descriptionLowerCase.includes('broken clouds')) {
      return 'lightgrey';
    } else if (descriptionLowerCase.includes('shower rain') || descriptionLowerCase.includes('rain')) {
      return 'darkgrey';
    } else if (descriptionLowerCase.includes('clear sky') || descriptionLowerCase.includes('few clouds')) {
      return '#77B5FE';
    } else {
      return null;
    }
  };

  return (
    <ImageBackground
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor(description) },
      ]}
    >
      <Image
        source={getWeatherImage(description)}
        style={{ width: 100, height: 100, marginBottom: 10 }}
      />
      <Text style={[styles.title, { color: '#4762AE' }]}>{city}</Text>
      <Text style={[styles.title, { color: '#4762AE' }]}>{Math.round(temperature)}°C</Text>
      {city ? (
        <View >
          <Text style={[styles.headline, { color: '#4762AE', }]}>Vent</Text>
          <Text style={[styles.details, { color: '#4762AE',  }]}>{windSpeed} m/s</Text>
          <Text style={[styles.headline, { color: '#4762AE', }]}>Ressentie </Text>
          <Text style={[styles.details, { color: '#4762AE', }]}>{feelsLike}°C  </Text>
          <Text style={[styles.headline, { color: '#4762AE', }]}>Humidité </Text>
          <Text style={[styles.details, { color: '#4762AE', }]}>{humidity}% </Text>
        </View>
      ) : (
        <Text style={{ color: 'black' }}>Obtention de la localisation en cours...</Text>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Widgets')}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    marginBottom: 8,
    justifyContent:'space-between',
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  bottomText: {
    position: 'absolute',
    bottom: 10,
  },
  backButton: {
    position: 'absolute',
    marginTop: 525,
    top: 125,
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

export default WeatherScreen;
