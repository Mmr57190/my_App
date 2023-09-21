import React, { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { SoRealDB } from '../components/SoReal';

export default function JobCaptureScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const cameraRef = React.useRef(null);
  const db = new SoRealDB();

  React.useEffect(() => {
    getCameraPermission();
    db.init();
    setPhotos(db.getPhotos());
  }, []);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status);
  };

  const toggleCameraType = () => {
    setType((prevState) =>
      prevState === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        db.addPhoto(uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
    setIsLoading(true);
    setPhotos(await db.getPhotos());
    console.log(photos);
  };

  const deletePh = (id) => {
    db.deletePhoto(id);
    const newData = photos.filter((item) => item.id !== id);
    setPhotos(newData);
  };

  const goAlbum = async () => {
    setIsLoading(true);
    setPhotos(await db.getPhotos());
  };

  const Item = ({ source, id }) => (
    <View style={{flexDirection:'row', alignItems : 'center'}}>
      <Image source={source} style={{ width:350, height:350, margin:5}} />
      <TouchableOpacity onPress={() => {deletePh(id)}}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ?
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Image source={require("../../assets/flipPhoto.png")} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Image source={require("../../assets/takePhoto.png")} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goAlbum}>
            <Image source={require("../../assets/album.png")} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Widgets')}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </Camera>:
      <View style={styles.container}>
        <TouchableOpacity style={{}} onPress={() => {setIsLoading(false)}}>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      <FlatList
        style={{flex:1, top: 50}}
        data={photos}
        renderItem={({ item }) => <Item source={{ uri: item.uri }} id={item.id} />}
        keyExtractor={(item) => item.id}
      />
      </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 640,
    justifyContent: 'space-between',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  button: {
    flex: 1,
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  deleteButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    color: 'red',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  backText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 70,
    right: 70,
    zIndex: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4762AE',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
