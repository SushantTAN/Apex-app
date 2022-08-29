/**
 * This is one of two screens for reset. It contains an input field for entering the otp received.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {Reset}- returns a module for Reset
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ProgressViewIOSComponent } from 'react-native';

import CustomTextInput from '@elements/CustomTextInput';
import CustomButton from '@elements/CustomButton';
import styles from '@styles/modules/ResetPassword/Reset.scss';
import { useDispatch } from 'react-redux';
import validate from '@utils/validation';
import { verifyForm } from '@apexapp/data/signup/verify';
import { phoneVerifyRequest, verifyResetOtp } from '@apexapp/store/actions/resetPassword';


const Reset = props => {
  const [formData, setFormData] = useState(verifyForm);
  const [errormsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const counter = useSelector(state => state.resetReducer.counter);


  const onChangeHandler = (key, value, password) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          value: value,
          valid: validate(value, prevState[key].validationRules, password),
          touched: true,
        },
      };
    });
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

  const handleReset = () => {
    let data = {
      username: props.route.params.username,
      otp: formData.otp.value,
    };
    console.log(data);
    dispatch(verifyResetOtp(data, props.navigation.navigate));
    // props.navigation.navigate('NewPassword');
  };

  const handleResets = () => {
    props.navigation.navigate('VerifyNumber');
  };

  const handleResend = () => {
    dispatch(phoneVerifyRequest(props.route.params, props.navigation.navigate, counter));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleResets} style={styles.left}>
        <Image source={require('@assets/images/leftArrow.png')} />
      </TouchableOpacity>

      <Text style={styles.title}>Reset password</Text>

      <Text style={styles.titles}>Verify yourself</Text>
      <Text style={styles.p}>Code has been sent to your phone number</Text>

      <View style={styles.formContainer}>
        {/* <CustomTextInput onChange={() => {}} placeholder="Enter code here" /> */}

        {Object.values(formData).map((item, index) => (
          <CustomTextInput
            onChange={value => {
              onChangeHandler(
                item.elementConfig.name,
                value,
              );
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
      <Text style={styles.p}>Reset code in: 33s</Text>

      <View style={styles.bottomContainer}>
        <CustomButton
          type="white"
          title={'Re-send code'}
          style={styles.signUps}
          onPress={handleResend}
        />

        <CustomButton
          type="theme"
          title={'Verify'}
          style={styles.signUp}
          onPress={handleReset}
        />
      </View>
    </View>
  );
};

export default Reset;
