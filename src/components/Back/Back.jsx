import { View, Text, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Back() {
  const navigation = useNavigation();
  function handleBackButton() {
    navigation.goBack();
    return true;
  }
    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => backHandler.remove();
    }, []);

    
}