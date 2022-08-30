/**
 * This is one of  the screens for Verify number. It contains an input field for entering the number.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {VerifyNumber}- returns a module for Verify number.
 */

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import CustomTextInput from '@elements/CustomTextInput';
import CustomButton from '@elements/CustomButton';
import styles from '@styles/modules/ResetPassword/VerifyNumber.scss';
import validate from '@utils/validation';
import { phoneVerifyForm } from '@data/reset/phoneVerify';
import { verifyRequest } from '@apexapp/store/actions/auth';
import { phoneVerifyRequest } from '@apexapp/store/actions/resetPassword';
import { useDispatch, useSelector } from 'react-redux';

const VerifyNumber = props => {
  const [formData, setFormData] = useState(phoneVerifyForm);
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
      username: formData.username.value
      // username: 'test',
    };
    console.log(data)
    dispatch(phoneVerifyRequest(data, props.navigation.navigate, counter));
    // props.navigation.navigate('Reset');
  };

  const handleResets = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleResets} style={styles.left}>
        <Image source={require('@assets/images/leftArrow.png')} />
      </TouchableOpacity>

      <Text style={styles.title}>Phone number</Text>

      <Text style={styles.p}>Add phone number for verification.</Text>

      <View style={styles.formContainer}>
        {/* <CustomTextInput onChange={() => { }} placeholder="Phone number" /> */}

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

      <View style={styles.bottomContainer}>
        <CustomButton
          type="theme"
          title={'Send code'}
          style={styles.signUp}
          onPress={handleReset}
        />
      </View>
    </View>
  );
};

export default VerifyNumber;
