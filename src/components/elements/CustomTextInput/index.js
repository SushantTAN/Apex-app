/**
* This is a input Component
* @param {String} props.value - value of the field
* @param {Function} props.onChange - execute after changing value.
* @param {string} props.error - return an  error message in TextInput

* @returns {CustomTextInput}- returns an Input Component

*/

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Eyeicon from "@assets/images/eye-invisible.svg";
import styles from '@styles/elements/CustomInput.scss';

const CustomTextInput = props => {
  const [password, setPassword] = useState(props.hidden);

  return (
    <View style={styles.mainContainer}>
      <View style={!props.valid && props.touched ? styles.errorContainer : [styles.container, props.style]}>
        <TextInput
          style={
            // !props.valid ? styles.errorTexts : 
            styles.input}
          onChangeText={props.onChange}
          value={props.value}
          secureTextEntry={password}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          {...props}
        />

        {props.password && (
          <TouchableOpacity
            onPress={() => setPassword(prevState => !prevState)}
            style={styles.eye}>

            <Eyeicon height={15} width={30} />
          </TouchableOpacity>
        )}
      </View>
      {!props.valid && props.touched && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

export default CustomTextInput;
