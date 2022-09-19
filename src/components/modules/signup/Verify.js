/**
 * This is one of three screens for signup. It contains an input field for entering the otp received.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {Verify}- returns a module for Verify.
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Alert } from 'react-native';

import CustomTextInput from '@elements/CustomTextInput';
import CustomButton from '@elements/CustomButton';
import styles from '@styles/modules/signup/Verify.scss';
import { useDispatch, useSelector } from 'react-redux';
import { verifyRequest } from '@apexapp/store/actions/auth';
import { verifyForm } from '@apexapp/data/signup/verify';
import validate from '@apexapp/utils/validation';
import { PATCH } from '@apexapp/utils/api';
import { phoneVerifyRequest } from '@apexapp/store/actions/resetPassword';
import { CommonActions } from '@react-navigation/native';

import LeftIcon from '@assets/images/leftarrow.svg';

const Verify = props => {
  const [formData, setFormData] = useState(verifyForm);
  const [errormsg, setErrorMsg] = useState('');
  const [counter, setCounter] = useState(120);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const autoFadeOut = () => {
    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      delay: 2000,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const dispatch = useDispatch();
  const auth = useSelector(state => state.authReducer);

  // useEffect(() => {
  //   var timer;
  //   const subscribe = props.navigation.addListener('focus', () => {
  //     timer = setInterval(() => {
  //       setTimeRemaining(timeRemaining - 1);
  //       if (timeRemaining <= 0) {
  //         console.log("hhhh")
  //         clearInterval(timer);
  //       }
  //     }, 1000);
  //   });

  //   return subscribe;
  // }, []);

  const onChangeHandler = (key, value) => {
    try {
      setFormData(prevState => {
        return {
          ...prevState,
          [key]: {
            ...prevState[key],
            value: value,
            // valid: validate(value, prevState[key].validationRules),
            // touched: true,
          },
        };
      });
    } catch (e) {
      Alert.alert(
        "Alert Title",
        e,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }

  };
  const blurHandler = key => {
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          focus: false,
        },
      };
    });
  };
  const focusHandler = key => {
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          focus: true,
          touched: true,
        },
      };
    });
  };

  const handleVerify = async () => {
    let data = {
      username: props.route.params.username,
      otp: formData.otp.value,
    }
    dispatch(verifyRequest(data, autoFadeOut, props.navigation.navigate, setErrorMsg));
  };

  const handleResend = async () => {
    await dispatch(phoneVerifyRequest(props.route.params, props.navigation, 'Verify'));
    startTimer();
  }

  const handleBack = () => {
    // props.navigation.navigate('Register');
    props.navigation.dispatch(CommonActions.goBack());
  };

  const startTimer = () => {
    setCounter(120);
    let timer;
    timer = setInterval(() => {
      // console.log("counter", counter);

      setCounter(prevState => {
        if (prevState <= 0) {
          clearInterval(timer);
          return prevState;
        }
        return prevState - 1
      });
    }, 1000);

  }

  useEffect(() => {
    // console.log("use effect")
    startTimer();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={[styles.left, { marginLeft: -3 }]}>
        {/* <Image source={require('@assets/images/leftArrow.png')} /> */}
        <LeftIcon style={{ color: '000' }} />
      </TouchableOpacity>

      <Text style={styles.title}>Verify Yourself</Text>
      <Text style={styles.p}>Code has been sent to your phone number</Text>

      <View style={styles.formContainer}>
        {/* <CustomTextInput
          onChange={() => { }}
          placeholder="Enter code "
          error={'Error message'}
        /> */}


        {Object.values(formData).map((item, index) => (
          <CustomTextInput
            onChange={value => {
              // onChangeHandler(
              //   item.elementConfig.name,
              //   value,
              // );
              setFormData(prevState => {
                return {
                  ...prevState,
                  [item.elementConfig.name]: {
                    ...prevState[item.elementConfig.name],
                    value: value,
                    // valid: validate(value, prevState[key].validationRules),
                    // touched: true,
                  },
                };
              });
            }}
            placeholder={item.elementConfig.placeholder}
            // hidden={true}
            password={item.elementConfig.type === 'password'}
            key={item.elementConfig.name}
            // id={item.elementConfig.name}
            // type={item.elementConfig.type}
            keyboardType={item.elementConfig.keyboardType}
            value={item.value}
            valid={item.valid}
            error={item.errorMessage}
            touched={item.touched}
            // errorMessage={item.errorMessage}
            onBlur={() => blurHandler(item.elementConfig.name)}
            onFocus={() => focusHandler(item.elementConfig.name)}
          // focus={item.focus}
          />
        ))}
      </View>

      <Text style={styles.p}>Code will expire in {counter}s</Text>

      <View style={styles.errorContainer}>
        {errormsg !== '' && (
          <Animated.View style={[styles.errortext, { opacity: fadeAnim }]}>
            <Text style={styles.p}>{errormsg}</Text>
          </Animated.View>
        )}
      </View>
      {console.log("hhh", props.route.params)}
      <View style={styles.bottomContainer}>
        <CustomButton
          type="theme"
          title={'Verify'}
          style={styles.signUp}
          onPress={handleVerify}
        />
        {counter === 0 ? <CustomButton
          type="white"
          title={'Re-send code'}
          style={styles.signUps}
          onPress={handleResend}
        /> : <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16 }}><Text style={{ color: "gray" }}>Re-send code</Text></View>}


      </View>
    </View>
  );
};

export default Verify;
