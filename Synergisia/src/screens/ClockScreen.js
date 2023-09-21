import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Line } from 'react-native-svg';

const ClockScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const DigitalClock = ({ time }) => {
    return (
      <Text style={styles.digitalClockText}>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </Text>
    );
  };

  const AnalogClock = ({ time }) => {
    const radius = 80;
    const center = radius + 22;
    const hour = time.getHours() % 12;
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const hourAngle = (hour + minute / 60) * 30 - 90;
    const minuteAngle = minute * 6 - 90;
    const secondAngle = second * 6 - 90;

    return (
      <Svg height="200" width="200">
        <Circle cx={center} cy={center} r={radius + 15} fill="transparent" stroke="#4762AE" strokeWidth="5" />
        <Circle cx={center} cy={center} r={radius + 6} fill="transparent" stroke="#3B5291" strokeWidth="5" />
        <Circle cx={center} cy={center} r={radius} fill="#fff" />
        <Line
          x1={center}
          y1={center}
          x2={center + Math.cos(hourAngle * (Math.PI / 180)) * radius * 0.5}
          y2={center + Math.sin(hourAngle * (Math.PI / 180)) * radius * 0.5}
          stroke="#102542"
          strokeWidth="6"
        />
        <Line
          x1={center}
          y1={center}
          x2={center + Math.cos(minuteAngle * (Math.PI / 180)) * radius * 0.7}
          y2={center + Math.sin(minuteAngle * (Math.PI / 180)) * radius * 0.7}
          stroke="#102542"
          strokeWidth="4"
        />
        <Line
          x1={center}
          y1={center}
          x2={center + Math.cos(secondAngle * (Math.PI / 180)) * radius * 0.9}
          y2={center + Math.sin(secondAngle * (Math.PI / 180)) * radius * 0.9}
          stroke="#6278BC"
          strokeWidth="2"
        />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Widgets')}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <AnalogClock time={currentTime} />
      <DigitalClock time={currentTime} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F9',
  },
  digitalClockText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4762AE',
    marginTop: 15,
  },
  backButton: {
    position: 'absolute',
    marginTop: 525,
    top: 150, // Déplacer vers le bas
    left: 70, // Définir la position à gauche à 0
    right: 70, // Définir la position à droite à 0
    zIndex: 1,
    borderRadius: 20, // Coins arrondis de la bordure
    paddingHorizontal: 20, // Espacement horizontal (20 pixels de chaque côté)
    paddingVertical: 10, // Espacement vertical
    backgroundColor: '#4762AE', // Couleur de fond du bouton
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Centrer le texte horizontalement
  },
});

export default ClockScreen;
