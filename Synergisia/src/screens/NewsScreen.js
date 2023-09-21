import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=78e31b944f774039b335f47da7049a27');
        const data = await response.json();
        setNews(data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des actualités:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#4762AE" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Widgets')}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <FlatList
         style={{marginTop: 50}}
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsContainer}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F1F3F9',
  },
  newsContainer: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#4762AE',
    padding: 16,
    borderRadius: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4762AE',
  },
  newsDescription: {
    fontSize: 16,
    color: '#3B5291',
  },
    loadingIndicator: {
    backgroundColor: '#F1F3F9',
    flex: 1,
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
});

export default NewsScreen;
