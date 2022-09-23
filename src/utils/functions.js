import { Alert, Platform } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

import { POST } from '@utils/api';

export const errorAlert = (title, message, callback = () => { }) => {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel"
    },
    { text: "Ok", onPress: () => null }
  ]);
}

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const getDuration = (date1) => {
  return (new Date(date1).getTime() - new Date().getTime()) / 1000
}

export const sendFcm = async () => {
  let tokens = await messaging().getToken();
  console.log("messagong", tokens);

  let storedTokens = await AsyncStorage.getItem('fcmtokens_apex');
  console.log("compare", storedTokens, tokens)
  if (JSON.parse(storedTokens) !== tokens) {

    let data = {
      // name: "string",
      registration_id: tokens,
      // "device_id": "string",
      "active": true,
      type: Platform.OS,
    }
    try {
      const response = await POST('api/fcm/devices/', data);
      const resJson = response.data;
      console.log("action", resJson)
      if (response) {
        AsyncStorage.setItem('fcmtokens_apex', JSON.stringify(tokens));
      }
    } catch (error) {
      console.log("fcm error", error.response.data);
    }
  }
}