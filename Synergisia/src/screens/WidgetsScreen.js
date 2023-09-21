import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import widget1 from '../../assets/profil.png';
import widget2 from '../../assets/agenda.png';
import widget3 from '../../assets/meteo.png';
import widget4 from '../../assets/trombi.png';
import widget5 from '../../assets/news.png';
import widget6 from '../../assets/horloge.png';

const WidgetsScreen = ({ navigation, route }) => {
  const [likedWidget, setLikedWidget] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const token = route.params?.token || null;

  const widgets = [
    { id: '2', title: 'Agenda' },
    { id: '3', title: 'Météo' },
    { id: '4', title: 'JobCapture' },
    { id: '5', title: 'News' },
    { id: '6', title: 'Horloge' },
  ];

  const numColumns = 2;

  const getLikedWidget = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('likedWidget');
      if (jsonValue != null) {
        setLikedWidget(JSON.parse(jsonValue));
        console.log(JSON.parse(jsonValue))
      }
    } catch (e) {
      console.error('Erreur lors de la récupération des données:', e);
    }
  };

  const saveLikedWidget = async () => {
    try {
      await AsyncStorage.setItem('likedWidget', JSON.stringify(likedWidget));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des personnes aimées:', error);
    }
  };

  useEffect(() => {
    if (!loaded) {
      getLikedWidget();
      setLoaded(true);
    }
    saveLikedWidget();
    console.log(likedWidget);
  });

  const handleLike = personId => {
    if (likedWidget.includes(personId)) {
      setLikedWidget(likedWidget.filter(id => personId !== id));
    } else {
      setLikedWidget([...likedWidget, personId]);
    }
  };

  const renderImage = (id) => {
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

const renderItem = ({ item }) => (
  <View style={styles.widgetContainer}>
    <View style={styles.likeContainer}>
      <TouchableOpacity onPress={() => handleLike(item.id)}>
        {likedWidget.includes(item.id) ?
          <Ionicons name="heart" size={30} color="red" />
        :
          <Ionicons name="heart-outline" size={30} color="grey"/>
        }
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      onPress={() => {
        if (item.id === '4') {
          navigation.navigate('JobCapture', { token: token });
        } else if (item.id === '5') {
          navigation.navigate('News');
        } else if (item.id === '6') {
          navigation.navigate('Clock');
        } else if (item.id === '2') {
          navigation.navigate('Agenda');
        } else if (item.id === '3') {
          navigation.navigate('Weather');
        }
      }}
    >
      <View style={[styles.widget, item.id === '2' && styles.firstWidget]}>
        {item.id && (
            <ImageBackground
              source={renderImage(item.id)}
              style={styles.widgetImageBackground}
            />
        )}
        <Text style={styles.widgetTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <FlatList
        data={widgets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const widgetSize = (width - 16) / 2 - 16;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F1F3F9',
  },
  widgetContainer: {
    padding: 6,
    marginRight: 4,
    marginLeft: 4,
    marginBottom: 8,
  },
  widget: {
    width: widgetSize,
    height: widgetSize,
    padding: 10,
    alignItems: 'center',
  },
  firstWidget: {
    backgroundColor: 'transparent',
  },
  widgetImageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4762AE',
    textAlign: 'center',
    marginTop: 8,
  },
  likeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 100
  },
});

export default WidgetsScreen;
