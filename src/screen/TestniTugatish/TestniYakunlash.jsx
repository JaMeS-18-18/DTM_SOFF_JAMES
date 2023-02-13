import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import StyleColor from '../../assets/styles/color';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendData from '../../Utils/SendData';
import { ActivityIndicator } from 'react-native-paper';

export default function TestniYakunlash(props) {
  console.log("keldkeldi", props.route.params.Kvaqt);

  const [modalVisible, setModalVisible] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [PostMass, setPostMass] = useState([]);


  const [AllResult, setAllResult] = useState([
    {
      vaqt: props.route.params.Kvaqt,
      Id: props.route.params.TestID,
    },
  ]);

  const [Ishlanganlar, setIshlanganlar] = useState(
    {
      soni: props.route.params.soni,
      CRans: props.route.params.CRans,
      INCRans: props.route.params.INCRans,
      TestName: props.route.params.TestName,
      Natija: props.route.params.Natija,
      TestID: props.route.params.TestID,
      vaqt: props.route.params.Kvaqt,
    },
  )



  function GetQuizID() {
    const currMass = [...PostMass]

    props.route.params.Natija.map(quiz => {
      currMass.push({
        question_data: quiz.id,
        user_answer: quiz.UserAns
      })
    })
    setPostMass(currMass)
  }



  const [persent, setpersent] = useState(
    parseInt((props.route.params.CRans / props.route.params.soni) * 100),
  );
  const [holat, setHolat] = useState('');

  useEffect(() => {
    GetQuizID()
    Holatlar();
  }, []);

  let token = ''


  getToken()

  async function getToken() {
    await AsyncStorage.getItem("token").then(val => {
      token = JSON.parse(val)
    });
  }


  async function Holatlar() {


    if (persent < 55) {
      setHolat('Qoniqarsiz');
    }
    if (persent >= 55 && persent < 71) {
      setHolat('Qoniqarli');
    }
    if (persent >= 71 && persent < 86) {
      setHolat('Yaxshi');
    }
    if (persent >= 86) {
      setHolat("A'lo");
    }
  }

  function Natija() {
    navigation.navigate('Natijanikorish', { value: props.route.params.Natija });
  }





  // const [natija , srtNatija] = useState(20)
  const navigation = useNavigation();

  const Saqlash = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.centeredView}>
      <LottieView
        style={{
          zIndex: 99,
          width: 400,
          height: 400,
          top: -50,
          position: 'absolute',
        }}
        source={{
          uri: 'https://assets1.lottiefiles.com/packages/lf20_5upjwxvm.json',
        }}
        autoPlay
      />
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
                  style={styles.buttonClose2}
                  onPress={async () => {
                    setLoader(true)

                    let data = await AsyncStorage.getItem('Ishlandi').then(
                      item => {
                        return JSON.parse(item);
                      },
                    );

                    if (data == null) {
                      await AsyncStorage.setItem(
                        'Ishlandi',
                        JSON.stringify([Ishlanganlar]),
                      );
                    } else {
                      let mass = [...data];
                      mass.push(Ishlanganlar)
                      await AsyncStorage.setItem(
                        'Ishlandi',
                        JSON.stringify(mass),
                      );
                    }



                    let PostWork = await SendData.UserData({
                      category: Number(props.route.params.TestID),
                      duration: props.route.params.Kvaqt,
                      answers_album: PostMass
                    }, token)

                    console.log(PostWork)



                    let malumot = await AsyncStorage.getItem('Finish').then(
                      item => {
                        return JSON.parse(item);
                      },
                    );

                    if (malumot == null) {
                      await AsyncStorage.setItem(
                        'Finish',
                        JSON.stringify(AllResult),
                      );
                    } else {
                      let mass = [...AllResult];
                      malumot.map(date => {
                        mass.push({
                          vaqt: date.vaqt,
                          nomi: date.nomi,
                        });
                      });
                      await AsyncStorage.setItem(
                        'Finish',
                        JSON.stringify(mass),
                      );
                    }


                    navigation.navigate('TabNavigator');
                  }}>
                  <Text style={styles.textStyle1}>{Loader ? <ActivityIndicator size="small" color="teal" /> : "Ok"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.name}>
          <Text style={styles.hederText}>Test Yakunlandi!</Text>
        </View>
        <Image
          source={require('../../assets/images/natijanikorish.png')}
          style={styles.imgStyle}
          resizeMode={'stretch'}
        />
        <ScrollView contentContainerStyle={styles.contentbox}>
          <View style={styles.quti}>
            <View style={styles.natijaBox}>
              <View style={{ alignItems: 'center', marginBottom: 40 }}>
                <Text style={styles.foiz}>{persent + '%'}</Text>
              </View>
              <View style={{ padding: 20 }}>
                <CardItemaa
                  color="#42C999"
                  natija={props.route.params.CRans}
                  title="To’g’ri jovoblar soni:"
                />
                <CardItemaa
                  color="#FF0000"
                  natija={props.route.params.INCRans}
                  title="Noto’g’ri jovoblar soni:"
                />
                <CardItemaa
                  color="#2965C3"
                  natija={props.route.params.soni}
                  title="Umumiy savollar soni:"
                />
                <View style={styles.card}>
                  <View>
                    <Text>Sarflangan Vaqt:</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ color: "purple", fontWeight: "700" }}>{props.route.params.Kvaqt / 60 < 1 ? "00" : Math.round(props.route.params.Kvaqt / 60) < 10 ? "0" + Math.round(props.route.params.Kvaqt / 60) : Math.round(props.route.params.Kvaqt / 60)}</Text>
                    <Text style={{ color: "purple", fontWeight: "700" }}>:</Text>
                    <Text style={{ color: "purple", fontWeight: "700" }}>{Math.round(props.route.params.Kvaqt % 60) < 10 ? "0" + Math.round(props.route.params.Kvaqt % 60) : Math.round(props.route.params.Kvaqt % 60)}</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontWeight: '700',
                    textAlign: 'center',
                    color: '#2965C3',
                  }}>
                  Natija: {holat}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() => Natija()}
                  style={styles.btnTahlil}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: StyleColor.backgroundColorMain,
                    }}>
                    {' '}
                    Natija tahlili{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.btnCard}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TabNavigator')}
              style={styles.btnotkaz}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: StyleColor.GreenColor,
                }}>
                O’tkazib yuborish
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Saqlash} style={styles.btnsaqla}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: StyleColor.backgroundColorMain,
                }}>
                Saqlab qo’yish
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const CardItemaa = props => {
  return (
    <View style={styles.card}>
      <Text style={{ fontSize: 16 }}>{props.title}</Text>
      <Text
        style={{
          color: props.color,
          fontSize: 16,
          fontWeight: '700',
        }}>
        {props.natija}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FE',
  },
  name: {
    height: Dimensions.get('screen').height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hederText: {
    color: StyleColor.textcolor,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 40,
  },
  contentbox: {
    height: Dimensions.get('window').height * 0.85,
    backgroundColor: StyleColor.backgroundColorMain,
    justifyContent: 'space-between',
  },
  imgStyle: {
    left: Dimensions.get('window').width * 0.5 - 82,
    top: 95,
    position: 'absolute',
    zIndex: 2,
  },
  natijaBox: {
    // marginHorizontal: 15,
    backgroundColor: StyleColor.backgroundColorMain,
    paddingVertical: 15,
    paddingTop: 90,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  foiz: {
    fontWeight: '800',
    fontSize: 48,
    color: StyleColor.textcolor,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#11111110',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#11111110',
  },
  btnCard: {
    backgroundColor: StyleColor.backgroundColorMain,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnotkaz: {
    backgroundColor: '#F4FCF9',
    width: Dimensions.get('window').width * 0.5 - 30,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 16,
  },
  btnsaqla: {
    backgroundColor: StyleColor.GreenColor,
    width: Dimensions.get('window').width * 0.5 - 30,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 16,
  },
  btnTahlil: {
    backgroundColor: StyleColor.GreenColor,
    width: Dimensions.get('window').width * 0.5 - 80,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 16,
  },
  quti: {
    backgroundColor: '#F5F7FE',
    padding: 15,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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

  textStyle2: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginTop: 25,
    textAlign: 'center',
    flex: 1,
  },
});
