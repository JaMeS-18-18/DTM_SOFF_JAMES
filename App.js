import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from "./src/navigators/Navigation"
import {requestUserPermission, NotificationListiner} from "./src/Utils/PushNatification"
export default function App() {

  useEffect(() => {
    requestUserPermission()
    NotificationListiner()
  }, [])
  

  return (
          <Navigation/>
  )
}

const styles = StyleSheet.create()