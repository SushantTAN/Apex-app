import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, LogBox, Alert } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import NotificationController from '@apexapp/components/hoc/PushNotifications/NotificationController.android';
import Router from './src/navigation/AppNavigation';


// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...', 'ViewPropTypes will', 'Warning: Failed prop type', 'Require cycle:']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const App = () => {

  // useEffect(async () => {
  //   let tokens = await messaging().getToken();
  //   console.log("messagong", tokens)
  //   const subscribe = messaging().onMessage(async remoteMessage => {
  //     // Get the message body
  //     let message_body = remoteMessage.notification.body;

  //     // Get the message title
  //     let message_title = remoteMessage.notification.title;

  //     // Get message image
  //     let avatar = remoteMessage.notification.android.imageUrl;


  //     Alert.alert(message_title, message_body, [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       {
  //         text: "YES", onPress: () => null
  //       }
  //     ]);
  //   });

  //   return subscribe;
  // }, [messaging]);

  return (
    <>
      <NotificationController />
      <Router />
    </>
  );
}

export default App;
