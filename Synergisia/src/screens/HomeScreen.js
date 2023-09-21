import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import ImageTrombi from '../components/ImageTrombi';
import Fav from '../components/Fav';
import Constants from 'expo-constants';
import { getSelf } from '../components/ApiCall';

class MyInlineWeb extends Component {
  render() {
    return (
      <WebView
        style={{ marginTop: 100 }}
        source={{
          html: '<iframe style="border-radius: 12px" src="https://open.spotify.com/embed/playlist/7yUg6boSKKiX0iWb9d4xhw?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.startsWith('http')) {
            return false;
          }
          return true;
        }}
      />
    );
  }
}

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const handleGetSelf = async () => {
    const response = await getSelf();
    setUserData(response);
  };

  useEffect(() => {
    handleGetSelf();
  }, []);

  if (!userData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4762AE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
      <View style={{ top: 130, left:20, display:'flex', position:'absolute' }}>
        <Fav title='Personnes Favoris' src='likedPeople' />
      </View>
      <View style={{ top: 350, left:20, display:'flex', position:'absolute' }}>
        <Fav title='Widgets Favoris' src='likedWidget' />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          gap: 50,
          backgroundColor: '#4762AE',
          padding: 10,
          borderRadius: 20,
          paddingRight: 25,
          right: -170,
        }}
      >
        <ImageTrombi personId={userData.id} />
        <Text style={styles.name}>{`${userData.name} ${userData.surname}`}</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonContainer: {
    // alignSelf: 'stretch',
    // paddingHorizontal: 50,
  },
  button: {
    backgroundColor: '#4762AE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 610,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
