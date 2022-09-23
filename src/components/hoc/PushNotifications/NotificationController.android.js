import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const NotificationController = (props) => {


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      try {
        await PushNotification.createChannel(
          {
            channelId: "channelapex", // (required)
            channelName: "channelapex", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        )
        await PushNotification.configure({
          onNotification: function (notification) {
            if (notification.userInteraction) {
              // Handle notification click
              console.log("user clicked on notification", notification)
              // dispatch(updateNotificationNewsId(parseInt(notification.data.newId)))
            }
            // PushNotification.localNotification({
            //   channelId: "channelapex",
            //   message: remoteMessage.notification.body,
            //   title: remoteMessage.notification.title,
            //   // bigPictureUrl: remoteMessage.notification.android.imageUrl,
            //   // smallIcon: remoteMessage.notification.android.imageUrl,
            //   // data: { newId: remoteMessage.data.newId }
            // })


            // notification.finish(PushNotificationIOS.FetchResult.NoData);
          },
          permissions: {
            alert: true,
            badge: true,
            sound: true
          },
          popInitialNotification: true,
          requestPermissions: true
        });

        console.log("ggg", remoteMessage);

        PushNotification.localNotification({
          channelId: "channelapex",
          message: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          bigPictureUrl: remoteMessage.notification.android.imageUrl,
          smallIcon: remoteMessage.notification.android.imageUrl,
          data: { newId: remoteMessage.data.newId },
          allowWhileIdle: true,
          ignoreInForeground: false,
          playSound: true,
          // vibrate: true,

        })

      }
      catch (err) {
        console.log('notification error', err)
      }
    });
    return unsubscribe;
  }, []);

  return null;
};

export default NotificationController;