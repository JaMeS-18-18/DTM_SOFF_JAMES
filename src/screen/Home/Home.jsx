import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  BackHandler,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
  ImageBackground
  
} from 'react-native'
import React, { useEffect, useState } from 'react'
import StyleColor from "../../assets/styles/color"
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import KutilyotkanMusobaqalar from '../../components/Musobaqalar/KutilyotkanMusobaqalar';
import StatusbarWhite from '../../components/StatusBar/StatusbarWhite';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function Home() {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    onRefresh()
  }, [])
  
  


  const navigation = useNavigation()
  const [active, setActive] = useState(true)
  const [name, setName] = useState(null)
  const [Pic, setPic] = useState('')

  
  const TabPress = () => {
    navigation.navigate("Profil")
  }

  AsyncStorage.getItem('Rasm').then(img => {
    setPic(img)
  });
  
  AsyncStorage.getItem('UserName').then(ism => {
    setName(ism)
  });

  function GetImg() {
    
  }

    const backAction = () => {
      Alert.alert("To'xtang !", "Siz ilovadan chiqmoqchimisiz", [
        {
          text: "Bekor qilish",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Ha", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    

  // const onPress = () => {
  //   setActive(true)
  // }
  // const onPressBtn = () => {
  //   setActive(false)
  // }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: StyleColor.backgroundColorMain }} refreshControl={<RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />} >
      <StatusbarWhite />
      <View style={styles.container} >
        <ScrollView>
          <View style={styles.hederStyle} >
            <View>
              <Text style={{ fontSize: 16 }} >
                Salom!
              </Text>
              <Text style={styles.textStyle}>
                {(name == null) ? "abituriyent" : name}
              </Text>
            </View>
            {/* <TouchableOpacity onPress={TabPress} >
              <View>
                <Image style={styles.imgStyle} resizeMode="cover" source={require("../../assets/images/Selfie.png")} />
              </View>
            </TouchableOpacity> */}
          <TouchableHighlight onPress={TabPress} style = {{ borderRadius:25}}>
            {
              (Pic == null) ? <Image style={styles.imgStyle} resizeMode="cover" source={require("../../assets/images/Selfie.png")} /> : <Avatar.Image style={styles.ImageBox} size={50} source={{ uri: Pic }}/>
            }
          </TouchableHighlight>
          </View>
          {/* <View style={{ padding: 10 }} >
            <Text style={styles.natigaText} >
              Mening natijalarim
            </Text>
            <View style={styles.btnBox}  >
              <TouchableOpacity
                style={active ? styles.btnstyleActive : styles.btnstyle}
                onPress={onPress}>
                <Text
                  style={active ? styles.btnTextStyleActive : styles.btnTextStyle}>
                  Online testlar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={!active ? styles.btnstyleActive : styles.btnstyle}
                onPress={onPressBtn}>
                <Text style={!active ? styles.btnTextStyleActive : styles.btnTextStyle}>
                  Oflayn testlar
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.OnlineBox, { display: active ? "flex" : "none" }]}>

            </View>
            <View style={[styles.OflineBox, { display: !active ? "flex" : "none" }]}>

            </View>
          </View> */}
          <HomeSlider />
          <KutilyotkanMusobaqalar />
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: StyleColor.backgroundColorMain,
    paddingVertical: 20,

  },
  imgStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: StyleColor.GreenColor,
  },
  hederStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textStyle: {
    fontWeight: "800",
    fontSize: 16,
    color: "#15141F"
  },
  btnstyleActive: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: StyleColor.GreenColor,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  btnstyle: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: StyleColor.backgroundColorMain,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  btnTextStyleActive: {
    color: StyleColor.backgroundColorMain,
    fontSize: 14,
    fontWeight: "600"
  },
  btnTextStyle: {
    color: StyleColor.textcolor,
    fontSize: 14,
    fontWeight: "600"
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#00000010",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 8
  },
  natigaText: {
    color: StyleColor.GreenColor,
    fontWeight: "600",
    fontSize: 16
  },
  OnlineBox: {
    height: 175,
    backgroundColor: StyleColor.GreenColor,
    marginTop: 10
  },
  OflineBox: {
    height: 175,
    backgroundColor: "yellow",
    marginTop: 10
  },

  ImageBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
    borderColor: StyleColor.GreenColor,
    backgroundColor: "White",
    borderStyle: "solid",
    borderWidth: 2,
    position: 'relative',
  }

})