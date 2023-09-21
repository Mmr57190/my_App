import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgendaList = ({ items, onRemoveItem }) => {
  return (
    <View style={styles.agendaList}>
      {items.map(item => (
        <View key={item.id} style={styles.agendaItem}>
          <Text style={styles.agendaItemText}>
            {item.text} - {item.time}
          </Text>
          <TouchableOpacity onPress={() => onRemoveItem(item.id)}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const AgendaScreen = () => {
  const navigation = useNavigation();
  const [agendaText, setAgendaText] = useState('');
  const [agendaTime, setAgendaTime] = useState('');
  const [agendaItems, setAgendaItems] = useState([]);

  useEffect(() => {
    loadAgenda();
  }, []);

  const loadAgenda = async () => {
    try {
      const savedAgendaItems = await AsyncStorage.getItem('agendaItems');
      if (savedAgendaItems !== null) {
        setAgendaItems(JSON.parse(savedAgendaItems));
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'agenda:', error);
    }
  };

  const saveAgenda = async () => {
    try {
      if (!agendaText || !agendaTime) {
        alert('Veuillez entrer un événement et une heure.');
        return;
      }

      const newAgendaItem = {
        id: Date.now(),
        text: agendaText,
        time: agendaTime,
      };
      setAgendaItems([...agendaItems, newAgendaItem]);
      await AsyncStorage.setItem(
        'agendaItems',
        JSON.stringify([...agendaItems, newAgendaItem])
      );

      setAgendaText('');
      setAgendaTime('');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'agenda:', error);
    }
  };

  const removeAgendaItem = async (id) => {
    const updatedAgendaItems = agendaItems.filter(item => item.id !== id);
    setAgendaItems(updatedAgendaItems);

    try {
      await AsyncStorage.setItem('agendaItems', JSON.stringify(updatedAgendaItems));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'agenda:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Que dois-je faire aujourd'hui ?"
        placeholderTextColor="#3B5291"
        value={agendaText}
        onChangeText={setAgendaText}
      />
      <TextInput
        style={styles.textInput}
        placeholder="et à quelle heure ?"
        placeholderTextColor="#3B5291"
        value={agendaTime}
        onChangeText={setAgendaTime}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          saveAgenda();
          alert('Agenda enregistré !');
        }}
      >
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Widgets')}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <AgendaList items={agendaItems} onRemoveItem={removeAgendaItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F9',
    marginBottom: 190,
  },
  textInput: {
    width: '80%',
    height: 100,
    borderWidth: 3,
    borderColor: '#4762AE',
    borderRadius: 20,
    color: '#4762AE',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4762AE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    marginTop: 525,
    top: 150,
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
  agendaList: {
    marginTop: 20,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  agendaItemText: {
    color: '#4762AE',
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  removeButtonText: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendaScreen;
