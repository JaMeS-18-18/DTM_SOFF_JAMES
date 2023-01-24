import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import StyleColor from '../../assets/styles/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import StatusbarGreen from '../../components/StatusBar/StatusbarGreen';

const Swipmassiv = [
  {
    iconName: 'md-star-half',
    TextName: "Bilimingizni sinab ko'ring",
    TextParagrf:
      'Matematikadan misol va masalalar to\'plami uchun sinov va imtihon testlari mavzulari.',
  },
  {
    iconName: 'settings-sharp',
    TextName: 'Natijangizni tahlil qiling',
    TextParagrf:
      'Sinov va imtihon testlaridan to’plagan ballaringiz, to’g’ri va notog’ri belgilagan jovoblaringizni ko’ra olish va tahlili qilish imkoniyati.',
  },
  {
    iconName: 'book',
    TextName: 'Abuturientlar uchun kitoblar',
    TextParagrf:
      'Matematika fanidan kitoblar haqida ma’lumot, mavzulashtirilgan tekin va pullik elektron kitoblar, kitoblar sotiladigan do’konlar ro’yxati.',
  },
  {
    iconName: 'ios-shield-checkmark-outline',
    TextName: 'Qulay interfeys',
    TextParagrf:
      'Dasturimiz orqali tez, qulay, vaqtingizni tejab va hohlagan joyda test ishlang!',
  },
  {
    iconName: 'send-sharp',
    TextName: 'Bepul imkoniyatlar',
    TextParagrf:
      'Dasturda bepul foydalanish uchun chegaralangan imkoniyatlar mavjud.',
  },
  // {
  //   iconName: 'cloud-offline-sharp',
  //   TextName: 'Offline ishlatish imkoniyati',
  //   TextParagrf:
  //     'Yuklab olingan barcha sinov va imtihon testlarini ishlay olish imkoniyati va o’z kutubxonangizdagi elektron kitoblardan foydalanish',
  // },
  
];

export default function Slider() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusbarGreen/>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        activeDotColor="#fff"
        loop = {false}
        dotColor="#ffffff50">
        {Swipmassiv.map((item, index) => (
          <SwiperWrap key={index} item={item} index={index} />
        ))}
      </Swiper>
    </SafeAreaView>
  );
}

const SwiperWrap = function (props) {
  const navigation = useNavigation();

  const StartWelcom = () => navigation.navigate('Welcome');
  return (
    <View style={styles.slide1}>
      <Ionicons name={props.item.iconName} size={140} color="#fff" />
      <View style={{padding: 40, marginTop: 40}}>
        <Text style={styles.TextSlider}> {props.item.TextName} </Text>
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.text}>{props.item.TextParagrf}</Text>
      </View>
      {props.index == 4 && (
        <TouchableOpacity onPress={StartWelcom}>
          <View style={styles.StartBtn}>
            <Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}>
              Start
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleColor.GreenColor,
  },
  text: {
    color: StyleColor.backgroundColorMain,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  TextSlider: {
    color: StyleColor.backgroundColorMain,
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  StartBtn: {
    backgroundColor: StyleColor.GreenColor,
    width: 120,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 10,
  },
});
