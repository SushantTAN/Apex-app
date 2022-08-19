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
import { login } from '@apexapp/store/actions/auth';

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
      const tokens = await AsyncStorage.getItem('apex-tokens');
      // console.log(value);
      if (tokens) {
        props.navigation.navigate('BottomTabs');
        let data = await JSON.parse(tokens);
        dispatch(login(data));
      } else {
        props.navigation.navigate('OnBoarding');
      }
    }, 4000);
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
