import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    setTimeout(() => {
      navigation.replace('Login'); // Redirigez vers la page de connexion après quelques secondes
    }, 1000); // Réglez le délai en millisecondes (ici, 3000 ms soit 3 secondes)
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/logo_small.png')}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4762AE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;
