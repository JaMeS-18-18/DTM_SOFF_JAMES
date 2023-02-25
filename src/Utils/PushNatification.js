import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    GetFCMToke()
    console.log('Authorization status:', authStatus);
  }
}

async function GetFCMToke(){
let fcmtoken = await AsyncStorage.getItem("fcmToken")
console.log(fcmtoken, "old token");
if (!fcmtoken) {
    try {
        const fcmToken = await messaging().getToken()
      if (fcmToken) {
      console.log(fcmtoken, "New token");
      await AsyncStorage.setItem("fcmToken", fcmToken)
      }
    } catch (error) {
        console.log("error");
    }
    
} else{
    
}


}


export const NotificationListiner = () => {
 messaging().onNotificationOpenedApp(remoteMessage => {
    console.log("notific", remoteMessage.notification)
 })

 messaging()
 .getInitialNotification()
 .then(remoteMessage => {
    if(remoteMessage){
    console.log("notific", remoteMessage.notification)
    }
 })

 messaging().onMessage(async remoteMessage => {
    console.log("keldi .... " , remoteMessage);
 })

}