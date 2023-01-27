import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import PageNameCard from '../../components/Card/PageNameCard'
import Fallow from "../../components/Card/Follow"
import StatusbarWhite from '../../components/StatusBar/StatusbarWhite'
import SetingsCard from '../../components/Card/SetingsCard'
import StyleColor from '../../assets/styles/color';
import { Link, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const menuItems = [
  {
    title: "Profil",
    screenName: "Profil"
  },
  {
    title: "Parolni o’zgartirish",
    screenName: "CHangePas"
  },
  // {
  //   title: "Bildirishnoma",
  //   screenName: "Sozlamalar"
  // },
  // {
  //     title: "Maxfiy sozlamalar",
  //     screenName: "Sozlamalar"
  // },
  {
    title: "Yordamchi markaz",
    screenName: "Sozlamalar"
  },
  // {
  //     title: "Biz bilan bog’lanish",
  //     screenName: "Sozlamalar"
  // },
]

export default function Settings() {
  const navigation = useNavigation()
  function goToScreen(screenName) {
    navigation.navigate(screenName)
  }

  const LogOut = () => {
    AsyncStorage.clear()
    navigation.navigate("Welcome")
  }
  

  return (
    <SafeAreaView style={styles.container} >
      <StatusbarWhite />
      <PageNameCard title="Sozlamalar" />
      <View style={{ marginTop: 20 }} >
        <Text style={{ marginBottom: 20 }} >
          Umumiy
        </Text>
        {
          menuItems.map((item, index) => {
            return (
              <SetingsCard screenFun={(sitem) => goToScreen(sitem)} key={index} data={item} />
            )
          })
        }
      </View>
      <View style={{ marginTop: 20 }} >
        <Text>
          Follow Us
        </Text>
        <View style={styles.FallowContainer} >
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://www.facebook.com/profile.php?id=100089580103049')
          }}>
              <Fallow iconName="facebook" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Linking.openURL("https://t.me/sofftest")
          }}>
            <Fallow iconName="telegram" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Linking.openURL("https://instagram.com/soff_test")
          }}>
            <Fallow iconName="instagram" />
          </TouchableOpacity>
        </View>
        <View style={styles.TextLogOut} >
          <TouchableOpacity onPress={LogOut} style={styles.TouchableStyle} >
            <Text style={{ color: "red", fontSize: 16 }} >
              Log out
            </Text>
          </TouchableOpacity>
          <Text style={{ marginBottom: 20 }} >
            Soff Hub / 2022
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: StyleColor.backgroundColorMain
  },
  FallowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15
  },
  TextLogOut: {
    justifyContent: "center",
    alignItems: "center"
  },
  TouchableStyle: {
    marginVertical: 40
  }
})