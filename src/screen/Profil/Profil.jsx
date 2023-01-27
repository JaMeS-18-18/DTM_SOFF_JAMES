import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  Linking,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StyleColor from '../../assets/styles/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PageNameCard from '../../components/Card/PageNameCard';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar, Button} from 'react-native-paper';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import StatusbarWhite from '../../components/StatusBar/StatusbarWhite';
import Back from '../../components/Back/Back';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import TouchID from 'react-native-touch-id';
import { CommonActions } from '@react-navigation/native';

import UpdateProfile from '../../Utils/UpdateProfile';
import SendImage from '../../Utils/SendImage';


export default function Profil() {
  const [text, onChangeText] = useState([]);
  const [number, onChangeNumber] = useState(0);
  const [oldNum, setOldNum] = useState(0);
  const [Pic, setPic] = useState('');
  const [Pic2, setPic2] = useState({});
  const [TOken, setTOken] = useState();
  const [Rasm, setRasm] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('UserName').then(val => {
      onChangeText(val);
    });
    AsyncStorage.getItem('Phone').then(nomer => {
      onChangeNumber(nomer);
      setOldNum(nomer);
    });

    AsyncStorage.getItem('Rasm').then(img => {
      setPic(img);
    });
    AsyncStorage.getItem('token').then(val => {
      setTOken(JSON.parse(val));
    });
    AsyncStorage.getItem('Rasm').then(val => {
     setPic(val)
    });
  }, []);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const navigation = useNavigation();

  const UploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 5,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Rasm yuklash bekor qilindi');
      } else if (response.errorCode == 'permission') {
        setToastMsg('permission not sarisfied');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert('Rasm hajmi 2mb dan kop bolmasligi kerak');
      } else {
        setPic('data:image/png;base64,' + response.assets[0].base64);
        setPic2(response.assets[0])
      }
    });
  };

  const Save = async () => {
    // UpdateProfile.updateProfile({
    //   name: text,
    //   u_phone: number,
    //   token: TOken,
    //   oldNumber: oldNum,
    // });
//  const optionalConfigObject = {
//       title: 'Tasdiqlash majburiy', // Android
//       imageColor: 'teal', // Android
//       imageErrorColor: '#ff0000', // Android
//       sensorDescription: 'Barmoq izi', // Android
//       sensorErrorDescription: 'Xato', // Android
//       cancelText: '', // Android
//       fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
//       unifiedErrors: true, // use unified error messages (default false)
//       passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
//     };

//     let Touch = await TouchID.authenticate(
//       "O'zgarishlarni saqlash uchun Barmoq izini Tasdiqlang",
//       optionalConfigObject,
//     )
//       .then(success => {
//         return success;
//       })
//       .catch(error => {
//         // return error
//         alert('Barmoq izi xato');
//       });

//     if (Touch == true) {
//     }

 
    await AsyncStorage.setItem('Rasm', Pic);
    await AsyncStorage.setItem('UserName', text);
    await AsyncStorage.setItem('Phone', number);
    setModalVisible(!modalVisible);
  };

    const reset = async () => {
      setRasm(false);


       navigation.dispatch(
         CommonActions.reset({
          index: 0,
          routes: [{ name: 'Asosiy' }],
        })
      );


      const formdata = new FormData()
      formdata.append('avatar', {
        uri: Pic2.uri,
        type: Pic2.type,
        name: Pic2.fileName
      })

    let ress = await SendImage.SendImage(formdata, TOken, number)

    console.log('====================================');
    console.log(ress);
    console.log('====================================');
    navigation.navigate('TabNavigator')
    } 

  return (
    <SafeAreaView style={styles.Container}>
      <Back />
      <StatusbarWhite />
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../../assets/images/Tayyor.png')} />
            <Text style={styles.modalText}>Saqlandi</Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <View>
                <TouchableOpacity
                  onPress={reset}
                  style={styles.buttonClose2}>
                    {
                      Rasm ?  <Text style={styles.textStyle1}>OK </Text> :  <ActivityIndicator size="small" color="teal" />
                    }
                
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <PageNameCard title="Profil" />
        <View style={styles.ImgeContainer}>
          <TouchableHighlight
            onPress={() => {
              UploadImage();
            }}
            style = {{ borderRadius:75}}>
            <Avatar.Image
              style={styles.ImageBox}
              size={150}
              source={{ uri: Pic }}
            />
          </TouchableHighlight>
          <View>
            <Button
              style={styles.PushImage}
              mode="outlined"
              onPress={() => {
                UploadImage();
              }}>
              <FontAwesome5
                name="camera"
                size={20}
                color={StyleColor.backgroundColorMain}
              />
            </Button>
          </View>
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{marginBottom: 8}}>Ism:</Text>
          <TextInput
            style={styles.Input}
            onChangeText={onChangeText}
            value={text}
            keyboardType={'default'}
          />
          <FontAwesome5
            name="user"
            style={styles.IconStyle}
            size={25}
            color={StyleColor.GreenColor}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{marginBottom: 8}}>Nomer:</Text>
          <TextInput
            style={styles.Input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="numeric"
          />
          <Ionicons
            name="call"
            style={styles.IconStyle}
            size={25}
            color={StyleColor.GreenColor}
          />
        </View>

        <TouchableOpacity onPress={Save} style={styles.btn}>
          <Text style={styles.btntext}>Saqlash</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: StyleColor.backgroundColorMain,
  },
  ImgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageBox: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    borderColor: StyleColor.GreenColor,
    backgroundColor: 'White',
    borderStyle: 'solid',
    borderWidth: 2,
    position: 'relative',
  },
  PushImage: {
    position: 'absolute',
    right: -95,
    bottom: 10,
    padding: 2,
    backgroundColor: StyleColor.GreenColor,
    borderRadius: 16,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  Input: {
    backgroundColor: '#F9F9FA',
    borderRadius: 16,
    paddingHorizontal: 45,
    fontWeight: '700',
    fontSize: 16,
    color: StyleColor.textcolor,
  },
  IconStyle: {
    position: 'absolute',
    bottom: 10,
    left: 12,
  },
  btn: {
    marginVertical: 20,
    paddingHorizontal: 80,
    paddingVertical: 10,
    backgroundColor: StyleColor.GreenColor,
    borderRadius: 9,
    marginTop: 40,
  },
  btntext: {
    fontSize: 18,
    fontWeight: '500',
    color: StyleColor.backgroundColorMain,
    textAlign: 'center',
  },

  buttonClose2: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: StyleColor.GreenColor,
    background: 'White',
    paddingTop: 10,
    marginVertical: 20,
  },

  textStyle1: {
    color: StyleColor.GreenColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginTop: 25,
    textAlign: 'center',
    flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 353,
    height: 433,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
