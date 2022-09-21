import React, { useEffect, useState } from 'react';
import ZoomUs from "react-native-zoom-us";
import { Button, Alert, StyleSheet } from "react-native";
import CustomButton from '@apexapp/components/elements/CustomButton';
import VideoCamera from '@assets/images/VideoCamera.svg';
import { ZoomUsVideoView } from 'react-native-zoom-us';
import { useSelector } from 'react-redux';


const CLIENT_KEY = '1Pdmz2ex00PWc2Pj9F1Fb0hzH4sq8SmuFZVm';
const CLIENT_SECRET = '3EWQHADjLwHeHWOG8E0V85nXRlbgJ032dTNV';

const ZoomMeeting = (props) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const auth = useSelector(state => state.authReducer);
  console.log(auth)

  useEffect(() => {
    (async () => {
      try {
        const message = await ZoomUs.initialize({
          clientKey: CLIENT_KEY,
          clientSecret: CLIENT_SECRET,

        }, {
          // enableCustomizedMeetingUI: true
          disableClearWebKitCache: true
        });
        console.log('message is ', message);
        setIsInitialized(true);
      } catch (error) {
        Alert.alert('error is ', error.toString());
      }

    })();
  }, []);

  const joinMeeting = async () => {
    const meeting = await ZoomUs.joinMeeting({
      userName: auth.user.full_name,
      meetingNumber: props.meetingId,
      password: props.password,
      noInvite: true,
      noTitlebar: true,
      // noWebinarRegisterDialog: true,
      noTextPassword: true,
      noTextMeetingId: true,
      noShare: true,
      noButtonShare: true,




      // autoConnectAudio: true,
      // noAudio: true,
      // noVideo: true,
      // noButtonLeave: true,
      // noButtonMore: true,
      // noButtonParticipants: true,

      // webinarToken: '',
      // noBottomToolbar: true,
      // noPhoneDialIn: true,
      // noPhoneDialOut: true,
      // noMeetingEndMessage: true,
      // noMeetingErrorMessage: true,
      // // noTitlebar: true,
      // noDrivingMode: true,
      // noDisconnectAudio: true,
      // noRecord: true,
      // noUnmuteConfirmDialog: true,
      // noWebinarRegisterDialog: true,
      // noChatMsgToast: true,
      // zoomAccessToken: '',

    });

    console.log('meetng joined ', meeting);
  };
  return (<>
    <CustomButton
      style={{ flexDirection: 'row', justifyContent: 'center' }}
      type="red"
      icon={<VideoCamera />}
      title={'Join now'}
      onPress={joinMeeting}
    // color="#000000"
    />
    {/* <ZoomUsVideoView
      style={StyleSheet.absoluteFillObject}
      layout={[
        // The active speaker
        { kind: 'active', x: 0, y: 0, width: 1, height: 1 },
        // Selfcamera preview
        {
          kind: 'preview',
          // The percent of video view (required)
          x: 0.73, y: 0.73, width: 0.25, height: 0.20,
          // Enable border (optional)
          border: true,
          // Disable show user name (optional)
          showUsername: false,
          // Show audio off (optional)
          showAudioOff: true,
          // Background color (optional)
          background: '#ccc'
        },
        // active speaker's share
        // {
        //   kind: 'active-share',

        // },
        // // share video
        // {
        //   kind: 'share',

        //   // The index of user list (required)
        //   userIndex: 0,
        // },
        // // Specify attendee
        // {
        //   kind: 'attendee',

        //   // The index of user list (required)
        //   userIndex: 0,
        // },
        // {
        //   kind: 'attendee',

        //   userIndex: 1,
        // },
      ]}
    /> */}


  </>)
};

export default ZoomMeeting;