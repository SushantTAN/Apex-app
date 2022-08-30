/**
 * This is one of two screen for the Reset Password . It contains a page for filling up user's reset information.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {NewPassword}- returns a module for Reset Newpassword.
 */
import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

import { changePasswordForm } from '@apexapp/data/reset/changePassword';
import { confirmPasswordChange } from '@apexapp/store/actions/resetPassword';
import CustomButton from '@elements/CustomButton';
import CustomTextInput from '@elements/CustomTextInput';
import styles from '@styles/modules/ResetPassword/NewPassword.scss';
import validate from '@utils/validation';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';


const NewPassword = props => {
  const [formData, setFormData] = useState(changePasswordForm);

  const dispatch = useDispatch();

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

  const handleNewPassChange = () => {
    // props.navigation.navigate('Reset');
    let data = {
      username: props.route.params.username,
      password: formData.password.value
    };
    // console.log(data);
    dispatch(confirmPasswordChange(data, props.navigation.navigate));
    // props.navigation.navigate('NewPassword');
  };

  const handleBack = () => {
    props.navigation.dispatch(CommonActions.goBack());
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.left}>
        <Image source={require('@assets/images/leftArrow.png')} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Enter new password</Text>
      </View>

      <View style={styles.formContainer}>
        {/* <CustomTextInput
          onChange={() => { }}
          placeholder="Password"
          hidden={true}
        />
        <CustomTextInput
          onChange={() => { }}
          placeholder="Confirm Password"
          hidden={true}
        /> */}

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

      <CustomButton
        type="theme"
        title={'Change Password'}
        style={styles.signUp}
        onPress={handleNewPassChange}
      />
    </View>
  );
};

export default NewPassword;
