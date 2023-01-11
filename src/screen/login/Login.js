import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyleColor from '../../assets/styles/color';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import KirishData from '../../Utils/KirishData';
import StatusbarGreen from "../../components/StatusBar/StatusbarGreen"
import RegistrHedercard from '../../components/Card/RegistrHedercard';
import Ionicons from "react-native-vector-icons/Ionicons"
import LottieView from 'lottie-react-native';
import Back from '../../components/Back/Back';
import NetInfo from "@react-native-community/netinfo"


const Login = () => {
  const [show, setShow] = useState(true);
  const [Load, setLoad] = useState(false);
  const [Err, setErr] = useState(false);
  const [Phone, setPhone] = useState('');
  const [password, setpassword] = useState('');
  const [type, setType] = useState(null)
  const navigation = useNavigation();

  useEffect(() => {
     NetInfo.fetch().then(state => {
      setType(state.isConnected )
  });
  }, []);
  
    const Connect = async() => {
       await NetInfo.fetch().then(state => {
         setType(state.isConnected )
     });
    }

  const GoLogin = async () => {

    setLoad(true);
    AsyncStorage.setItem('oka', '123');

    let login = await KirishData.PostUsersLogin({
      phone: Phone,
      password: password,
    });
    if (login.data) {
      setErr(false)
     await AsyncStorage.setItem('UserName', login.data.full_name);
     await AsyncStorage.setItem('Phone', login.data.phone);
      navigation.navigate('TabNavigator');
    } else {
      setLoad(false)
      setErr(true)
      // Alert.alert('Parol yoki Nomer xato');
    }
  };



  return (

    (type == false) ? <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:StyleColor.GreenColor,}}>
      <LottieView   style={{ zIndex: 99, width:200, height:200, marginBottom:20 }}
        source={require('../../assets/images/90517-connection-error.json')}
        autoPlay
      />
      <TouchableOpacity style={styles.btn} onPress={Connect}>
         <Text style={styles.btntext}>Internet Yo'q</Text>
      </TouchableOpacity>
    </SafeAreaView>

      : <SafeAreaView style={styles.body}>
        <StatusbarGreen />
        <View style={styles.main}>
          <Back />
          <RegistrHedercard title="Tizimga kirish" />
          <View>
            <View style={styles.mainInput}>
              <Entypo
                name="phone"
                size={30}
                color="#fff"
                style={{ marginTop: 28, marginRight: 10 }}
              />
              <TextInput
                onChangeText={e => setPhone(e)}
                style={styles.input}
                placeholder="Telefon nomeringiz"
                keyboardType="decimal-pad"
                placeholderTextColor={"#fff"}
              />
            </View>
            <View style={styles.mainInput1}>
              <Entypo
                name="lock"
                size={30}
                color="#fff"
                style={{ marginTop: 28, marginRight: 10 }}
              />
              <TextInput
                onChangeText={e => setpassword(e)}
                style={styles.input}
                secureTextEntry={show}
                placeholder="Parolingiz"
                placeholderTextColor={"#fff"}

              />
            </View>
            <TouchableOpacity
              style={styles.show}
              onPress={() => {
                setShow(prev => !prev);
              }}>
              <Text>{show ? <Ionicons name='eye-off-outline' size={25} color={"#fff"} /> : <Ionicons name='eye-outline' size={25} color={"#fff"} />}</Text>
            </TouchableOpacity>
              {
                (Err) && <Text style={{textAlign:"center", marginTop:20, color:"red"}}>Parol yoki Nomer xato</Text>
              }
          </View>
          <View>
            <TouchableOpacity style={styles.btn} onPress={GoLogin}>
              <Text style={styles.btntext}>{Load ? <ActivityIndicator size="small" color="teal" />  : 'Kirish'}</Text>
            </TouchableOpacity>
          </View> 
          <Text style={styles.help}>Yordam Kerakmi?</Text>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: StyleColor.GreenColor,
    flex: 1,
    padding: 20,
  },
  main: {
    height: '100%',
    // flexDirection:"row",
    justifyContent: 'space-between',
  },
  mainTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: StyleColor.backgroundColorMain,
    fontSize: 30,
  },
  mainInput: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainInput1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    height: 53,
    width: 304,
    marginTop: 20,
    borderWidth: 1,
    color: '#fff  ',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
    borderColor: StyleColor.backgroundColorMain,
    backgroundColor: '#FFFFFF30',
  },
  help: {
    color: StyleColor.backgroundColorMain,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 18,
  },
  show: {
    position: 'absolute',
    top: 105,
    right: 25,
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
});

export default Login;
