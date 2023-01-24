import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screen/Home/Home';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import StyleColor from "../assets/styles/color"
import { useNavigation } from '@react-navigation/native';
import Settings from '../screen/Settings/Settings';
import Online_test from "../screen/Online_test/Online_test"


export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  return (
    <Tab.Navigator  
    screenOptions={{
      tabBarShowLabel:true,
      tabBarStyle: {
        backgroundColor: StyleColor.backgroundColorMain,
        height:55,
      },
      tabBarActiveBackgroundColor: StyleColor.GreenActivColor,
      tabBarActiveTintColor:"teal",
      tabBarInactiveTintColor: "teal",
    }}>
      <Tab.Screen name='Asosiy' component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style ={styles.TabBox} >
              <FontAwesome name='home' size={28} color={color} />
              {/* <Text  style = {styles.TabNametext}>Home</Text> */}
            </View>
          ),
          tabBarLabel: "Asosiy",
          headerStyle: {
            backgroundColor: StyleColor.GreenColor
          },
        }}
        
      />

      <Tab.Screen name='Onlinetestlar' component={Online_test}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused , color}) => (
            <View style={styles.TabBox} >
              <FontAwesome name='graduation-cap' size={28} color={color}/>
              {/* <Text style={styles.TabNametext} >Kitoblar</Text> */}
            </View>
          ),
          tabBarLabel: "Online Test",
          headerStyle: {
            backgroundColor: StyleColor.GreenColor
          },
        }}
      />

      <Tab.Screen name='Sozlamalar' component={Settings}
          
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={styles.TabBox} >
              <Ionicons name='settings' size={28} color={color} />
              {/* <Text style={styles.TabNametext} >Sozlamalar</Text> */}
            </View>
          ),
          tabBarLabel: "Sozlamalar",
          
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  TabNametext:{
    color:StyleColor.GreenColor,
    fontSize:12,
    textAlign:"center",

  },
  TabBox:{
    justifyContent:"center",
    alignItems:"center",
  }
})