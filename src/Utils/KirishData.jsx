import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchData, {BaseUrl} from './FetchData';

class KirishData {
  async PostUsersLogin(data) {
    let endPoint = 'sign-in';
    let response = await fetch(`${BaseUrl}/${endPoint}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(ress => {
        return ress.json();
      })
      .then(json => {
       AsyncStorage.setItem('token', JSON.stringify(json.data.token.access));
        return json;
      })
      .catch(err => {
        return err;
      });

    return response;
  }

  async PostUsersRegister(data) {
    let endPoint = 'sign-up';
    let response = await fetch(`${BaseUrl}/${endPoint}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(ress => {
        return ress.json();
      })
      .then(json => {
        return json;
      })
      .catch(err => {
        return err;
      });

    return response;
  }
}

export default new KirishData();
