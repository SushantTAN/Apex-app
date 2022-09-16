import React, { useEffect, useState } from 'react';
import ZoomUs from "react-native-zoom-us";
import { Button, Alert } from "react-native";


const CLIENT_KEY = '1Pdmz2ex00PWc2Pj9F1Fb0hzH4sq8SmuFZVm';
const CLIENT_SECRET = '3EWQHADjLwHeHWOG8E0V85nXRlbgJ032dTNV';

const ZoomMeeting = () => {
 const [isInitialized, setIsInitialized] = useState(false);
 useEffect(() => {
  (async () => {
   try {
    const message = await ZoomUs.initialize({
     clientKey: CLIENT_KEY,
     clientSecret: CLIENT_SECRET,
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
   userName: 'Johny',
   meetingNumber: 6760988717,
   password: '7Ku0hs'
  });

  console.log('meetng joined ', meeting);
 };
 return (
  <Button title={"Join a meeting"} disabled={!isInitialized} onPress={joinMeeting} />
 )
};

export default ZoomMeeting;