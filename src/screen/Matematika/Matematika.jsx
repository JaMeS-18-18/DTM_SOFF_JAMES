import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import StyleColor from '../../assets/styles/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import StatusbarWhite from '../../components/StatusBar/StatusbarWhite';
import offlineQuiz from '../../Utils/offlineQuiz';
import { useNavigation } from '@react-navigation/native';
import PageNameCard from '../../components/Card/PageNameCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

export default function Matematika(props) {


  const [Category, setCategory] = useState(props.route.params.title.children);
  const [Time, setTime] = useState(0);
  const [SavolID, setSavolID] = useState(
    props.route.params.title.children[0].id,
  );
  const [Ishlangan, setIshlangan] = useState([]);
  const [IconName, setIconName] = useState('arrow-right');
  const navigation = useNavigation();

  useEffect(() => {
    run();
  }, []);

  async function run() {


    await AsyncStorage.getItem('Ishlandi').then(data => {
      let item = JSON.parse(data);

      if (item != null) {
        setIshlangan(item);
      }
      // setIconName("check-circle")
    });
  }

  function GOQuiz(props, id) {






    if (Ishlangan.length > 0) {
      let aaa = Ishlangan.some(el => el.TestID == id);

      if (aaa) {
        Ishlangan.map((element) => {
          if (element.TestID == id) {
            navigation.navigate('QaytaNatijaniKorish', {
              soni: element.soni,
              CRans: element.CRans,
              INCRans: element.INCRans,
              TestName: element.TestName,
              Answers: element.Natija,
              Kvaqt: element.vaqt
            })
          }
        })
      } else {
        navigation.navigate('Boshlash', { title: props, Id: id });
      }

    } else {
      navigation.navigate('Boshlash', { title: props, Id: id });
    }






    // if (aaa) {
    //   navigation.navigate('QaytaNatijaniKorish', {
    //     soni: Ishlangan.soni,
    //     CRans: Ishlangan.CRans,
    //     INCRans: Ishlangan.INCRans,
    //     TestName: Ishlangan.TestName,
    //     Answers: Ishlangan.Natija
    //   });
    // } else {
    // }
  }

  return (
    <View style={styles.body}>
      <StatusbarWhite />
      <PageNameCard title={props.route.params.title.title} />
      <ScrollView>
        {Category.length > 0 ?
          Category.map((item, index) => {
            Ishlangan &&
              Ishlangan.map(element => {
                if (element.TestID == item.id) {
                  item.IconName = 'check-circle';
                  item.Second = element.vaqt
                }
              });
            return (
              <TouchableOpacity onPress={() => GOQuiz(item.title, item.id, index)} key={index}>
                <View style={styles.card}>
                  <View style={{ flexDirection: 'row' }}>
                    <Feather
                      size={20}
                      name={'edit'}
                      style={{ marginHorizontal: 10, marginVertical: 2 }}
                    />
                    <Text style={{ color: 'black', fontSize: 18 }}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 80,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems:"center"
                    }}>
                    <Text style={{ fontSize: 15, color: '#111111', }}>
                      {item.Second ? <View style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <Text style={{fontWeight: "700"}}>{item.Second / 60 < 1 ? "00" : Math.round(item.Second / 60) < 10 ? "0" + Math.round(item.Second / 60) : Math.round(item.Second / 60)}</Text>
                        <Text style={{fontWeight: "700"}}>:</Text>
                        <Text style={{fontWeight: "700"}}>{Math.round(item.Second % 60) < 10 ? "0" + Math.round(item.Second % 60) : Math.round(item.Second % 60)}</Text>
                      </View> : ''}
                    </Text>
                    <FontAwesome5
                      color={StyleColor.GreenColor}
                      size={25}
                      name={item.IconName}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }) : <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="teal" />
          </View>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: StyleColor.backgroundColorMain,
    padding: 20,
  },
  card: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginVertical: 10,
    borderBottomWidth: 6,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomColor: '#11111115',
    borderLeftColor: '#11111110',
    borderRightColor: '#11111110',
    borderTopWidth: 2,
    borderTopColor: '#11111110',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: Dimensions.get("window").height * 0.3
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    alignItems: "center"

  }
});
