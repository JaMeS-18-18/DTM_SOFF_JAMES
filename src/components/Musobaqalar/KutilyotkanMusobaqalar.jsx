import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import StyleColor from "../../assets/styles/color"
import { useNavigation } from '@react-navigation/native'
import CompitetionData from '../../Utils/CompitetionData'
import Competition from '../../screen/Musobaqa/competition'

// const Card = [
//   {
//     iconName: "clipboard-list",
//     mavzu: "15 talik XX mavzuga misollar",
//     sana: "15-noyabr / 2022",
//     narxi: "0 sum",
//     time: "09:39"
//   },
//   {
//     iconName: "clipboard-list",
//     mavzu: "15 talik XX mavzuga misollar",
//     sana: "15-noyabr / 2022",
//     narxi: "0 sum",
//     time: "09:39"
//   },
//   {
//     iconName: "clipboard-list",
//     mavzu: "15 talik XX mavzuga misollar",
//     sana: "15-noyabr / 2022",
//     narxi: "0 sum",
//     time: "09:39"
//   },
//   {
//     iconName: "clipboard-list",
//     mavzu: "15 talik XX mavzuga misollar",
//     sana: "15-noyabr / 2022",
//     narxi: "0 sum",
//     time: "09:39"
//   },
// ]

export default function KutilyotkanMusobaqalar() {

  const [Musobaqa, setMusobaqa] = useState([])
  const [month, setMonth] = useState()
  const [Time, setTime] = useState()

  useEffect(() => {
    const funksiya = async () => {
      const KutilayotganTestlar = await CompitetionData.Musobaqalar()
      setMusobaqa(KutilayotganTestlar)
      if (KutilayotganTestlar.length > 0) {
        console.log(KutilayotganTestlar[1]);
        const unixTimeZero =  Date.parse(KutilayotganTestlar[0].date_created);
        const date =  new Date(unixTimeZero)
        const year =  date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay()
        const hour =  date.getHours() + ":" + date.getMinutes()
        setMonth(year)
        setTime(hour)        
      }
    }
    funksiya()

  }, [])


  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.TextHeder} >
        <Text style={styles.textHead} >
          Kelayotgan musoboqalar
        </Text>
        <Text style={{color: StyleColor.GreenColor, fontWeight:"500", fontSize:16}}>
          Barchasi
        </Text>

      </View>
      {
        (Musobaqa.length > 0) ? Musobaqa.map((item, index) => (
          <CardMusobaqaa key={index} item={item} month={month} time={Time} />
        ))
          :
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Text>Hozircha Musobaqalar Yo'q</Text>
          </View>
      }
    </SafeAreaView>
  )
}

const CardMusobaqaa = function (props) {
  const navigation = useNavigation()

  async function GoMusobaqa(params) {
    await CompitetionData.Competitionparticipants(params)
    navigation.navigate('Competition', { "value": params })
  }

  return (
    <View style={styles.raceCard} >
      <TouchableOpacity onPress={() => GoMusobaqa(props.item.id)} >
        <View style={styles.boxCard} >
          <View >
            <FontAwesome5 name="clipboard-list" size={40} />
          </View>

          <View style={{ flex: 1, justifyContent: "space-between", flexDirection:"row" }}>
            <View style={{ marginLeft: 20 }} >
              <View>
                <Text style={styles.textName} >
                  {props.item.title}
                </Text>
              </View>
              <View>
                <View style={{ flexDirection: "row", width: 200, alignItems: "center" }} >
                  <FontAwesome5 name='arrow-right' color={"red"} style={{ marginRight: 8 }} />
                  <Text>
                    {props.month}
                  </Text>
                </View>
              </View>
            </View>
            <View >
              <Text style={styles.textSum} >
                {props.item.status_display}
              </Text>
              <Text style={styles.textTime}>
                {props.time}
              </Text>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: "#00000010",
    borderStyle: 'solid',
    borderRadius: 16
  },
  TextHeder: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center",
    width: "100%",
    // backgroundColor:"red"
    // paddingHorizontal: 20
  },
  raceCard: {
    marginTop: 10,
    paddingHorizontal: 20,
    height: 76,
    justifyContent: "center"
  },
  boxCard: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  textSum: {
    fontWeight: "700",
    fontSize: 14,
    textAlign: "right",
    color: StyleColor.textcolor
  },
  textTime: {
    fontWeight: "400",
    fontSize: 12,
    textAlign: "right",
  },
  textName: {
    fontWeight: "700",
    fontSize: 14,
    color: StyleColor.textcolor
  },
  textHead: {
    fontWeight: "800",
    fontSize: 18,
    color: "black",
    // textAlign: "center",
    // width: "100%"
  },
  textHeadActive: {
    fontWeight: "500",
    fontSize: 16,
    color: StyleColor.GreenColor
  }
})