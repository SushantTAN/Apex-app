import { HEIGHT, WIDTH } from '@apexapp/utils/constants';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import ZoomUs, { ZoomUsVideoView, ZoomEmitter } from 'react-native-zoom-us';

const CustomZoomUI = (props) => {
  const navigation = useNavigation();
  return <View style={{ flex: 1 }}>
    <ZoomUsVideoView
      style={{ height: '90%', width: WIDTH }}
      layout={[
        // The active speaker
        // { kind: 'active', x: 0, y: 0, width: 1, height: 1 },
        // showScreenShare ? activeShareConfig : activeConfig,
        {
          kind: 'active',
          x: 0,
          y: 0,
          width: 1,
          height: 1,
          background: '#ccc',

          showUsername: true,
          userIndex: 0,
          showAudioOff: false,
        },
        // Selfcamera preview
        {
          kind: 'preview',
          // The percent of video view (required)
          x: 0.73,
          y: 0,
          width: 0.5,
          height: 1,
          // Enable border (optional)
          border: true,
          // Disable show user name (optional)
          showUsername: true,
          // Show audio off (optional)
          showAudioOff: false,
          // Background color (optional)
          background: '#ccc',
        },
        // active speaker's share
        // {
        //   kind: 'active-share',
        //   x: 0.73, y: 0.73, width: 0.25, height: 0.20,
        // },
        // // share video
        // {
        //   kind: 'share',
        //   x: 0.73, y: 0.73, width: 0.25, height: 0.20,
        //   // The index of user list (required)
        //   userIndex: 0,
        // },
        // Specify attendee
        {
          kind: 'attendee',
          x: 0.73, y: 0.73, width: 1, height: 1,
          // The index of user list (required)
          userIndex: 0,
        },
        // {
        //   kind: 'attendee',
        //   x: 0.73, y: 0.73, width: 0.25, height: 0.20,
        //   userIndex: 0,
        // },
      ]}
    />
    <TouchableOpacity onPress={async () => {
      await ZoomUs.leaveMeeting();
      navigation.dispatch(CommonActions.goBack());
    }}>
      <Text>Leave</Text>
    </TouchableOpacity>
  </View>
}

export default CustomZoomUI;