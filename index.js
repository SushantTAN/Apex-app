/**
 * @format
 */

import { AppRegistry } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   // Extract the body
//   let message_body = remoteMessage.notification.body;
//   // Extract the title
//   let message_title = remoteMessage.notification.title;
//   // Extract the notification image 
//   let avatar = remoteMessage.notification.android.imageUrl;

//   // Add the notification to the messages array

// });

AppRegistry.registerComponent(appName, () => App);
