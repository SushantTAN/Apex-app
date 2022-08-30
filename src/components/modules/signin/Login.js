/**
* This is the screens for signin. It contains a form for logging users into dashboard containing  error autofadeout msg.
  Fetch POST  is called using the app URL .
* @param {Object} props.navigation - contains all the propeties of react navigation.
* @returns {Login}- returns a module for login.
*/

import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import CustomTextInput from '@elements/CustomTextInput';
import CustomButton from '@elements/CustomButton';
import Header from '@elements/Header';
import { loginForm } from '@data/Signin/login';
import styles from '@styles/modules/signin/login.scss';
import validate from '@apexapp/utils/validation';
import { loginRequest } from '@apexapp/store/actions/auth';
import { HEIGHT } from '@apexapp/utils/constants';

const Login = props => {
  const [formData, setFormData] = useState(loginForm);

  const [errormsg, setErrorMsg] = useState('');
  const [isValid, setIsvalid] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const dispatch = useDispatch();

  const autoFadeOut = () => {
    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      delay: 2000,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };



  const handleSignupLink = () => {
    props.navigation.navigate('Register');
  };

  const handleResetLink = () => {
    props.navigation.navigate('VerifyNumber');
  };

  const onChangeHandler = (key, value, password) => {
    // let tempFormData = [...formData];
    // tempFormData[key].value = value;
    // setFormData(tempFormData);

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
    // let tempFormData = [...formData];
    // tempFormData[key].focus = false;
    // setFormData(tempFormData);

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
    // let tempFormData = [...formData];
    // tempFormData[key].focus = true;
    // setFormData(tempFormData);

    setFormData(prevState => {
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          focus: true,

        },
      };
    });
  };

  const handleSubmit = async (event) => {
    let data = {
      username: formData.phoneNumber.value,
      email: '',
      password: formData.password.value,
      // username: 'test',
    };
    dispatch(loginRequest(data, autoFadeOut, props.navigation.navigate, setErrorMsg));
  };

  useEffect(() => {
    if (formData.phoneNumber.valid && formData.password.valid) {
      setIsvalid(true);
    } else {
      setIsvalid(false);
    }
  }, [formData]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%', position: 'relative' }} keyboardShouldPersistTaps={'handled'}>

        <View style={styles.background}>
          <Header />

          <View style={styles.border}>

            <View style={styles.titleContainer}>
              <Text style={styles.title}> Login</Text>

              <View style={styles.p}>
                <Text style={styles.p}> Haven't got an account?</Text>
                <TouchableOpacity onPress={handleSignupLink}>
                  <Text style={styles.link}> Sign up.</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formContainer}>
              {Object.values(formData).map((item, index) => (
                <CustomTextInput
                  onChange={value => {
                    onChangeHandler(
                      item.elementConfig.name,
                      value,
                      formData.password.value,
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
            <View style={styles.lastcontainer}>
              <Text style={styles.p}>Forget password?</Text>
              <TouchableOpacity onPress={handleResetLink}>
                <Text style={styles.link1}> Reset.</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.errorContainer}>
              {errormsg !== '' && (
                <Animated.View style={[styles.errortext, { opacity: fadeAnim }]}>
                  <Text style={styles.p}>{errormsg}</Text>
                </Animated.View>
              )}
            </View>
          </View>
        </View>

        <CustomButton
          type={isValid ? 'theme' : 'disabled'}
          title={'Sign in'}
          style={styles.signIn}
          onPress={handleSubmit}
        />

      </ScrollView>
    </View>


  );
};

export default Login;
