import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PageNameCard(props) {
    const navigation  = useNavigation()

    const onPress = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.NameStyle} >
            <Text style={styles.textNameStyle}> {props.title} </Text>
            <TouchableOpacity style={styles.backIcon} onPress = {onPress} >
                <Image source={require("../../assets/images/RightPng.png")} style = {styles.ImgIconStyle} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    NameStyle: {
        // height: 60,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginVertical:10,
    },
    textNameStyle: {
        textAlign:'center',
        fontSize: 24,
        fontWeight: "800",
        color: "#111"
    },
    backIcon: {
        position: "absolute",
        left: 20
    },
    ImgIconStyle:{
        width:30,
        height:24
    }
})