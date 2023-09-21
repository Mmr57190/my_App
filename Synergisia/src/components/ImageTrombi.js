import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, ActivityIndicator } from 'react-native';
import { getPhotoById } from './ApiCall';

const ImageTrombi = ({ personId }) => {
  const [personImage, setPersonImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    // Chargez l'image correspondante à partir de l'ID de la personne
    const loadImage = async () => {
      try {
        const response = await getPhotoById(personId);
        if (response.status === 200) {
          const imageBlob = await response.blob();
          setPersonImage(URL.createObjectURL(imageBlob));
        } else {
          console.error(`Impossible de charger l'image pour la personne avec l'ID ${personId}.`);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'image :', error);
      } finally {
        setLoadingImage(false); // Définissez le chargement comme terminé, que ce soit un succès ou un échec.
      }
    };

    if (personId) {
      loadImage();
    }
  }, [personId]);

  return (
    <View style={styles.container}>
      {loadingImage ? (
        <ActivityIndicator size="small" color="#0000ff" /> // Indicateur de chargement
      ) : (
        personImage ? (
          <Image source={{ uri: personImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100, // Largeur de l'image
    height: 100, // Hauteur de l'image
    // backgroundColor: '#ccc', // Couleur de fond par défaut
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '150%',
    height: '150%',
    borderRadius: 25, // Pour arrondir l'image
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc', // Couleur de fond de remplacement
  },
});

export default ImageTrombi;
