import React, {useEffect, useState} from 'react';
import StyleColor from '../../assets/styles/color';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BtnButton from '../../components/Button/BtnButton';
import KirishData from '../../Utils/KirishData';
import {useNavigation} from '@react-navigation/native';
import StatusbarGreen from '../../components/StatusBar/StatusbarGreen';
import Back from '../../components/Back/Back';
import RegistrHedercard from '../../components/Card/RegistrHedercard';
import {ActivityIndicator} from 'react-native-paper';

const Register = () => {
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState([]);
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');
  const [show, setShow] = useState(true);
  const [Load, setLoad] = useState(false);

  const navigation = useNavigation();

  const GoRegister = async () => {
    setLoad(true);

    let Register = await KirishData.PostUsersRegister({
      full_name: Name,
      password: password,
      password2: password2,
      phone: Phone,
    });

    if (
      Register.message == 'You should login' ||
      Register.phone == 'This field may not be blank.' ||
      Register.phone == '1. Account with this Telefon raqami already exists.'
    ) {
      AsyncStorage.setItem('oka', '123');
      AsyncStorage.setItem('Parol', password2);
      AsyncStorage.setItem('UserName', Name);
      AsyncStorage.setItem('Phone', Phone);
      navigation.navigate('Login');
    }
    if (Register.full_name) {
      // frontni o'zidan bo'lsin
      setLoad(false);
      Alert.alert("Ism maydonini to'ldiring");
    }
    if (Register.message == 'Password did not match, please try again') {
      //frontni o'zidan
      setLoad(false);
      Alert.alert('Parollar bir biriga mos emas');
    }
    if (Register.message == 'Error') {
      Alert.alert("Hamma maydonlarni To'ldiring");
      setLoad(false);
    }
    if (
      Register.password ||
      Register.password2 == 'Ensure this field has at least 6 characters.' || //frotni oz'idan
      Register.password ||
      Register.password2 == 'This field may not be blank'
    ) {
      setLoad(false);
      Alert.alert("Parollar 6 ta belgidan kam bo'lmasligi kerak");
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <Back />
      <StatusbarGreen />
      <View style={styles.main}>
        {/* <View style={styles.mainTitle}>
          <Text style={styles.title}></Text>
          <Fontisto name="close-a" size={23} color={'#fff'}/>
        </View> */}
        <RegistrHedercard title="Ro’yxatdan o’tish" />
        <View>
          <View>
            <View style={styles.mainInput}>
              <View
                style={style = styles.inputIconStyle}>
                <Entypo name={'pencil'} size={30} color={'#FFF'} />
              </View>
              <TextInput
                onChangeText={e => setName(e)}
                style={styles.input}
                placeholder={'To`liq Ismingiz'}
                placeholderTextColor={'#fff'}
                color="#fff"
              />
            </View>

            <View style={styles.mainInput}>
              <View
                style={style = styles.inputIconStyle}
               >
                <Entypo name={'phone'} size={30} color={'#FFF'} />
              </View>
              <TextInput
                onChangeText={e => setPhone(e)}
                style={styles.input}
                type="password"
                keyboardType="decimal-pad"
                placeholder={'Telefon Raqaminigiz'}
                placeholderTextColor={'#fff'}
                color="#fff"
              />
            </View>

            <View style={styles.mainInput}>
              <View
                style={style = styles.inputIconStyle}
              >
                <Entypo name={'lock'} size={30} color={'#FFF'} />
              </View>
              <TextInput
                onChangeText={e => setpassword(e)}
                style={styles.input}
                type="password"
                secureTextEntry={show}
                placeholder={'Parol Yarating'}
                placeholderTextColor={'#fff'}
                color="#fff"
              />
              <View style={style = styles.showStyle} >
                <TouchableOpacity
                  onPress={() => {
                    setShow(prev => !prev);
                  }}>
                  <View style={{ height: 50, justifyContent: "center", paddingStart: 3 }}>
                    {show ? (
                      <Ionicons name="eye-off-outline" size={30} color={'#fff'} />
                    ) : (
                      <Ionicons name="eye-outline" size={30} color={'#fff'} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              
            </View>

            <View style={styles.mainInput}>
              <View
                style={style = styles.inputIconStyle}
              >
                <Entypo name={'lock'} size={30} color={'#FFF'} />
              </View>
              <TextInput
                onChangeText={e => setpassword2(e)}
                style={styles.input}
                secureTextEntry={show}
                
                type="password"
                placeholder={'Parolni Tasdiqlang'}
                placeholderTextColor={'#fff'}
                color="#fff"
              />
              <View style = {style = styles.showStyle} >

              </View>
            </View>

            <TouchableOpacity
              style={styles.show}
              onPress={() => {
                setShow(prev => !prev);
              }}>
              
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={GoRegister}>
            <Text style={styles.btntext}>
              {Load ? (
                <ActivityIndicator size="small" color="teal" />
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.help}></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: StyleColor.GreenColor,
    width: '100%',
    padding: 20,
    height: Dimensions.get('window').height * 1,
  },
  main: {
    height: '100%',
    width: '100%',
    // flexDirection:"row",
    justifyContent: 'space-between',
  },
  // mainTitle: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // title: {
  //   color: StyleColor.backgroundColorMain,
  //   fontSize: 25,
  //   fontWeight: '700',
  // },
  input: {
    height: 53,
    width: Dimensions.get("window").width -120,
    borderWidth: 1,
    color: '#fff  ',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
    borderColor: StyleColor.backgroundColorMain,
    backgroundColor: '#FFFFFF30',
  },
  mainInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: Dimensions.get("window").width-40,
    display:'flex',
    justifyContent:"flex-start",
  },
  help: {
    color: StyleColor.backgroundColorMain,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 18,
  },
  show: {
    position: 'absolute',
    top: 180,
    right: 20,
    color: '#fff',
  },

  btn: {
    paddingHorizontal: 80,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 9,
  },
  btntext: {
    fontSize: 18,
    fontWeight: '500',
    color: StyleColor.GreenColor,
    textAlign: 'center',
  },
  inputIconStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width:40,

  },
  showStyle:{
    width:40,
    justifyContent:"center",
    alignItems:"center"

  }
});

export default Register;