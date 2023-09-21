import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageTrombi from '../components/ImageTrombi';
import { Ionicons } from '@expo/vector-icons';
import { getAll } from '../components/ApiCall';

const TrombinoscopeScreen = ({ navigation }) => {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPeople, setLikedPeople] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getLikedPeople = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('likedPeople');
      if (jsonValue != null) {
        setLikedPeople(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Erreur lors de la récupération des données:', e);
    }
  };

  useEffect(() => {
    if (!loaded) {
      getLikedPeople();
      setLoaded(true);
    }
    saveLikedPeople();
  }, []);

  const saveLikedPeople = async () => {
      try {
        await AsyncStorage.setItem('likedPeople', JSON.stringify(likedPeople));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des personnes aimées:', error);
      }
    };

  const handleLike = (personId) => {
    if (likedPeople.includes(personId)) {
      setLikedPeople(likedPeople.filter(id => id !== personId));
    } else {
      setLikedPeople([...likedPeople, personId]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll()

        if (response.status === 200) {
          const data = await response.json();
          setPersonnel(data);
          setLoading(false);
        } else {
          console.log('Échec de la récupération des données du personnel.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données du personnel:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderPersonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('Profils', { idUser: item.id });
      }}
    >
      <View style={styles.centeredContainer}>
        <ImageTrombi personId={item.id} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameSurnameText}>{`${item.name} ${item.surname}`}</Text>
      </View>
      <View style={styles.likesContainer}>
      <TouchableOpacity onPress={() => handleLike(item.id)}>
        {likedPeople.includes(item.id) ? (
          <Ionicons name="heart" size={30} color="red" />
        ) : (
          <Ionicons name="heart-outline" size={30} color="grey" />)}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredPersonnel = personnel.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.surname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un collaborateur"
        placeholderTextColor="#3B5291"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <Text style={styles.loadingText}>Chargement en cours...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {filteredPersonnel.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              {renderPersonItem({ item })}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    backgroundColor: '#F1F3F9',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ccc',
    padding: 8,
    margin: 15,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#4762AE',
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  nameSurnameText: {
    color: '#4762AE',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderWidth: 3,
    borderColor: '#4762AE',
    borderRadius: 20,
    color: '#3B5291',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginLeft: 37,
    marginTop: -60,
  },
  likesContainer: {
  position: 'absolute',
  top: 8,
  right: 10,
},
});

export default TrombinoscopeScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ImageTrombi from '../components/ImageTrombi';

// const TrombinoscopeScreen = ({ navigation }) => {
//   const [personnel, setPersonnel] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   const getToken = async () => {
//     try {
//       const userToken = await AsyncStorage.getItem('userToken');
//       return userToken;
//     } catch (error) {
//       console.error('Erreur lors de la récupération du token:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await getToken();

//         if (!token) {
//           console.error('Token non défini. Impossible de récupérer les données du personnel.');
//           setLoading(false);
//           return;
//         }

//         const response = await fetch('https://masurao.fr/api/employees', {
//           method: 'GET',
//           headers: {
//             accept: 'application/json',
//             'X-Group-Authorization': 'TOzoEBzJzw2Clg__r-8yPZnh6mPq_c4K',
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImVtYWlsIjoib2xpdmVyLmxld2lzQG1hc3VyYW8uanAiLCJuYW1lIjoiT2xpdmVyIiwic3VybmFtZSI6Ikxld2lzIiwiZXhwIjoxNjk1ODM2MDk5fQ.jWLzCQYlpnSUrT0Ite5QQpn-58nJMGAawqlbxZz5Jkk`,
//           },
//         });

//         if (response.status === 200) {
//           const data = await response.json();
//           setPersonnel(data);
//           setLoading(false);
//         } else {
//           console.log('Échec de la récupération des données du personnel.');
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des données du personnel:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderPersonItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.cardContainer}
//       onPress={() => {
//         navigation.navigate('Profils', { idUser: item.id });
//       }}
//     >
//       <View style={styles.centeredContainer}>
//         <ImageTrombi personId={item.id} />
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.nameSurnameText}>{`${item.name} ${item.surname}`}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const filteredPersonnel = personnel.filter(
//     item =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.surname.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Rechercher un collaborateur"
//         placeholderTextColor="#3B5291"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       {loading ? (
//         <Text style={styles.loadingText}>Chargement en cours...</Text>
//       ) : (
//         <ScrollView contentContainerStyle={styles.cardsContainer}>
//           {filteredPersonnel.map((item) => (
//             <View key={item.id} style={styles.cardWrapper}>
//               {renderPersonItem({ item })}
//             </View>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 120,
//     backgroundColor: '#F1F3F9',
//   },
//   cardContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 4,
//     borderColor: '#ccc',
//     padding: 8,
//     margin: 20,
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: '#ffffff',
//   },
//   centeredContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#4762AE',
//     textAlign: 'center',
//   },
//   textContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   nameSurnameText: {
//     color: '#4762AE',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   cardsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   cardWrapper: {
//     width: '48%',
//     marginBottom: 20,
//   },
//   searchInput: {
//     width: '80%',
//     height: 40,
//     borderWidth: 3,
//     borderColor: '#4762AE',
//     borderRadius: 5,
//     color: '#3B5291',
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     marginLeft: 37,
//     marginTop: -30,
//   },
// });

// export default TrombinoscopeScreen;