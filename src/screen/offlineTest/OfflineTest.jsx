import React, {useEffect, useState, Component, useMemo, useCallback} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Pressable,
  Alert,
  BackHandler,
  Dimensions,
  useColorScheme,
} from 'react-native';
import {Modal} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QuizCard from '../../components/Card/QuizCard';
import OffTest from '../../Utils/offlineQuiz';
import StyleColor from '../../assets/styles/color';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sekundamer from '../../components/Sekundamer/Sekundamer';

const OfflineTest = props => {

  
  const [Savollars, setSavollar] = useState([]);
  const [Nomi, setNomi] = useState(props.route.params.title);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [AllAnswer, setAllAnswer] = useState([]);
  // const [time, setTime] = useState({
  //   sekund: "00",
  //   minute: "00",
  //   startDisable: false,
  // })
  const [KetganVaqt, setKetganVaqt] = useState(0)
  const navigation = useNavigation();

  console.log("salom");
  useEffect(() => {
    quiz();
  }, []);

  const backAction = () => {
    setModalVisible(!modalVisible);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  async function quiz() {
    let result = await OffTest.Savollar(props.route.params.Id);
    setSavollar(result.question_category);
  }




  async function ansverrun(params) {
    let mass = [...AllAnswer];
    if (mass.length > 0) {
      let natija = mass.some(el => el.id == params.id);
      if (natija) {
        mass.splice(params.id, 1, params);
        setAllAnswer(mass);
      } else {
        mass.push(params);
        setAllAnswer(mass);
      }
    } else {
      mass.push(params);
      setAllAnswer(mass);
    }
  }
   let s = 0

  async function Checked() {
    setModalVisible2(!modalVisible2);
    let quizs = [...Savollars];
    let Tson = 0;
    let Xson = 0;
    quizs.map((e, i) => {
      if (e.correct_answer == AllAnswer[i].answer) {
        quizs[i].type = true;
        Tson++;
      } else {
        quizs[i].type = false;
        Xson++;
      }
      quizs[i].UserAns = AllAnswer[i].answer;
    });

    navigation.navigate('Yakunlash', {
      soni: Savollars.length,
      CRans: Tson,
      INCRans: Xson,
      TestName: props.route.params.title,
      Natija: quizs,
      TestID: props.route.params.Id,
      Kvaqt: s
    });
  }


  // function ishladi(params) {
  //   console.log(params);
  // }


  function TimerAdd(t) {
    console.log("vaqt keldi",t);
    s = t
    // setKetganVaqt(t)
    
  }


console.log('qale');
  return (
    // <View></View>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../../assets/images/atmen_img.png')} />
            <Text style={styles.modalText}>
              Testni rostdan ham to’xtatmoqchimisiz?
            </Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <View>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle2}>Yo'q</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.buttonClose2}
                  onPress={() => {
                    navigation.navigate('Fanlar');
                  }}>
                  <Text style={styles.textStyle1}>HA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible2(!modalVisible2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../../assets/images/Yakunlash.png')} />
            <Text style={styles.modalText}>
              Barcha savollarga jovoblarni belgilagan bo’lsangiz natijalarni
              ko’ramizmi?
            </Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <View>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => setModalVisible2(!modalVisible2)}>
                  <Text style={styles.textStyle2}>Yo'q</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.buttonClose2}
                  onPress={() => Checked()}>
                  <Text style={styles.textStyle1}>HA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <SafeAreaView style={styles.container}>
        <View style={styles.TestNav}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.BtnNav2}>
              <Ionicons name="close" size={25} color={'red'} />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: '500',
                marginStart: 10,
                color: 'black',
                fontSize: 18,
              }}>
                {/* <StopWatch  Send={(i) => ishladi(i)} /> */}
                <Sekundamer  SekundAdd = {(t) => TimerAdd(t)}/>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (Savollars.length != AllAnswer.length) {
                Alert.alert('Hammasini belgilamadiz');
              } else {
                setModalVisible2(!modalVisible2);
              }
            }}
            style={styles.BtnNav}>
            <Ionicons name="md-paper-plane" size={24} color={'teal'} />
            <Text style={styles.NavText}>Yakunlash</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          {Savollars.length > 0 ? (
            Savollars.map((item, index) => {
              return (
                <QuizCard
                  javobstatus={true}
                  key={index}
                  id={index}
                  img={item.image}
                  tekshir={i => ansverrun(i)}
                />
              );
            })
          ) : (
            <View>
              <ActivityIndicator
                size={50}
                color="teal"
                style={{marginTop: 50}}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OfflineTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    backgroundColor: '#fff',
    width:Dimensions.get("window").width
    // paddingHorizontal:10
  },
  TestNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  BtnNav: {
    width: 150,
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'teal',
  },
  BtnNav2: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NavText: {
    color: 'teal',
    fontSize: 18,
    fontWeight: '500',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    // marginTop: 22,
    // backgroundColor:"blue",
    // padding:20,
    zIndex: 1,
  },
  modalView: {
    // margin: 20,
    marginHorizontal: '5%',
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

  buttonClose: {
    width: 117,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    background: 'White',
    paddingTop: 10,
    marginVertical: 20,
  },

  buttonClose2: {
    width: 117,
    height: 40,
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
