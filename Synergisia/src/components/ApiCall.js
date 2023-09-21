import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function login(email, password, navigation) {
  console.log('Email: ', email);
  console.log('Mot de passe: ', password)
    const item = {email, password};
    const apiKey = Constants.expoConfig.extra.apiKey;

    try {
    const response = await fetch('https://masurao.fr/api/employees/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Group-Authorization': apiKey,
      },
      body: JSON.stringify(item),
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      const userToken = responseJson.access_token;
      await storeToken(userToken);
      navigation.navigate('Home');
    }
    else {
      console.log('Login failed');
    }
  } catch (error) {
    console.error(error);
  }
}

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Erreur de stockage du token :', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Erreur de récupération du token :', error);
  }
};

export async function getSelf() {
  const apiKey = Constants.expoConfig.extra.apiKey;
  const token = await getToken();

  try {
    const response = await fetch('https://masurao.fr/api/employees/me', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Group-Authorization': apiKey,
        'Authorization': 'Bearer ' + token,
      },
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export async function getAll()
{
  const apiKey = Constants.expoConfig.extra.apiKey;
  const token = await getToken();

  try {
    const response = await fetch('https://masurao.fr/api/employees', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Group-Authorization': apiKey,
        'Authorization': 'Bearer ' + token,
      }
    });
    return (response);
  } catch (error) {
    console.error(error);
  }
}


function getLeaders ()
{

}

export async function getPhotoById(id)
{
  const apiKey = Constants.expoConfig.extra.apiKey;
  const token = await getToken();

  try {
    const response = await fetch('https://masurao.fr/api/employees/' + id + '/image', {
      method: 'GET',
      headers: {
        accept: 'image/png',
        'X-Group-Authorization': apiKey,
        'Authorization': 'Bearer ' + token,
      }
    });
    return (response);
  } catch (error) {
    console.error(error);
  }
}

export async function getById(id)
{
  const apiKey = Constants.expoConfig.extra.apiKey;
  const token = await getToken();

  try {
    const response = await fetch('https://masurao.fr/api/employees/' + id , {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Group-Authorization': apiKey,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImVtYWlsIjoib2xpdmVyLmxld2lzQG1hc3VyYW8uanAiLCJuYW1lIjoiT2xpdmVyIiwic3VybmFtZSI6Ikxld2lzIiwiZXhwIjoxNjk2MzIxMzIzfQ.ECYUrr668aXFQmRrN2-C9iop-SaAfzAG8jeFpbVPrpk',
      }
    });
    const responseJson = await response.json();
    return (responseJson);
  } catch (error) {
    console.error(error);
  }
}
