/**
 * This is waklthrough page containing the logo of the organization. This page automatically redirects to on boarding, sign in or dashboard after 4 seconds.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Walkthrough}- returns a module for walkthrough
 */

import React, { useEffect } from 'react';
import { Image, Text, View, Animated } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Mainlogo from '@assets/images/logo.svg'
import styles from '@styles/modules/walkthrough.scss';
import { useDispatch } from 'react-redux';
import { login, refreshToken } from '@apexapp/store/actions/auth';
import { errorAlert, parseJwt } from '@apexapp/utils/functions';
import { POST } from '@apexapp/utils/api';

const Walkthrough = props => {
  const startValue = new Animated.Value(1);
  const endValue = 1.2;

  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(startValue, {
      toValue: 1.2,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // startValue.setValue(1.2);
      Animated.timing(startValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start()
    })

    const test = setInterval(() => {
      Animated.timing(startValue, {
        toValue: 1.2,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        // startValue.setValue(1.2);
        Animated.timing(startValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start()
      })
    }, 4000);


    const unsubscribe = props.navigation.addListener('blur', () => {
      clearInterval(test);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(async () => {

      try {
        const response = await POST('api/auth/token/verify/', {});
        const resJson = await response.data;
        // console.log("token verify", parsed);
        if (response) {

          await dispatch(refreshToken(resJson));
          props.navigation.navigate('BottomTabs');


          // dispatch(login({ ...parsed, access_token: resJson.access, access_token_expiration: resJson.access_token_expiration }));


        }


      } catch (error) {


        try {
          const response = await POST('api/auth/token/refresh/');
          const resJson = await response.data;

          await dispatch(refreshToken(resJson));
          props.navigation.navigate('BottomTabs');
        } catch (e) {
          props.navigation.navigate('OnBoarding');
        }

        // props.navigation.navigate('OnBoarding');

        // console.log('err token verify', error);
        // errorAlert("Error Occured", "Login Session Has Expired, please login again.")

      }
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Animated.View entering={FadeIn.delay(500).duration(700)} style={styles.test}> */}
      <Animated.View
        style={[
          {
            transform: [
              {
                scale: startValue,
              },
            ],
            // backgroundColor: 'white',
            // padding: 6,
          },
        ]}

      >
        <Mainlogo width={100} height={100} />
      </Animated.View>
    </View>
  );
};

export default Walkthrough;
