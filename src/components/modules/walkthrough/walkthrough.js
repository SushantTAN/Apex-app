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
      // const tokens = await AsyncStorage.getItem('apex-tokens');
      // // console.log(value);
      // if (tokens) {
      //   // props.navigation.navigate('BottomTabs');
      //   let data = await JSON.parse(tokens);
      //   // console.log(new Date(data.refresh_token_expiration).getTime() - new Date().getTime());

      //   if ((new Date(data.refresh_token_expiration).getTime() - new Date().getTime()) > 0) {
      //     await dispatch(refreshToken(data, props.navigation));
      //     props.navigation.navigate('BottomTabs');
      //   }
      //   else {
      //     await AsyncStorage.removeItem('apex-tokens');
      //     props.navigation.navigate('OnBoarding');

      //   }

      //   // dispatch(login(data));
      // } else {
      //   props.navigation.navigate('OnBoarding');
      // }

      try {
        const response = await POST('api/auth/token/verify/');
        const resJson = await response.data;
        console.log("token verify", resJson);
        if (response) {
          // dispatch(refreshSuccess(resJson));

          // dispatch(login({ ...tokens, access_token: resJson.access, access_token_expiration: resJson.access_token_expiration }));

          props.navigation.navigate('BottomTabs');
        }


      } catch (error) {
        props.navigation.navigate('OnBoarding');

        console.log('err token verify', error);
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
