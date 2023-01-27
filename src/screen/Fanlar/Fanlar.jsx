import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, TouchableOpacity, BackHandler, Alert, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyleColor from "../../assets/styles/color"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Feather from "react-native-vector-icons/Feather"
import StatusbarWhite from '../../components/StatusBar/StatusbarWhite'
import offlineQuiz from '../../Utils/offlineQuiz'
import { useNavigation } from '@react-navigation/native'
import PageNameCard from '../../components/Card/PageNameCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native-paper'


export default function Fanlar() {
  const [Category, setCategory] = useState([]);
  const [Time, setTime] = useState(0);
  const [Data, setData] = useState([{ salom: "salom" }]);
  const [IconName, setIconName] = useState("arrow-right");
  const navigation = useNavigation()

  function handleBackButton() {
    navigation.goBack();
    return true;
  }

useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  GetSubject()
    return () => backHandler.remove();
}, [])



async function GetSubject() {
  let mass = await offlineQuiz.Category()


  mass.map(el => {
    el.IconName = "arrow-right"
    el.Second = null,
      el.Minute = null
  })
  setCategory(mass)
}
 
function GoTheme() {
  navigation.navigate("variant", { "title": Category[0] }) 
}

  
  return (
    <View style={styles.body}>
        <PageNameCard title = "Fanlar" />
      <ScrollView>
        {
          (Category.length > 0) ? Category.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => GoTheme(item.title)} key={index}>
                <View style={styles.card}>
                  <View style={{ flexDirection: "row", }}>
                    <Feather size={20} name={"edit"} style={{ marginHorizontal: 10, marginVertical: 2 }} />
                    <Text style={{ color: "black", fontSize: 18 }}>{item.title}</Text>
                  </View>
                  <View style={{ width: 80, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 15, color: "#111111" }}>{(item.Second ? item.Minute + " : " + item.Second : "")}</Text>
                    <FontAwesome5 color={StyleColor.GreenColor} size={25} name={item.IconName} />
                  </View>
                </View>
              </TouchableOpacity>
            )
          }) : <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="teal" />
          </View>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: StyleColor.backgroundColorMain,
    padding: 20,
  },
  card: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginVertical: 10,
    borderBottomWidth: 6,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomColor: "#11111115",
    borderLeftColor: "#11111110",
    borderRightColor: "#11111110",
    borderTopWidth: 2,
    borderTopColor: '#11111110'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop:Dimensions.get("window").height*0.3
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    alignItems: "center"

  }
})