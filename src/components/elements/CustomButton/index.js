/**
 * This is a button Component
 * @param {String} props.type - type of button
 * @param {Function} props.onPress - function to execute on pressing
 * @param {String} props.title - text to display in button
 * @returns {CustomButton}- returns a Button Component
 */

import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import styles from '@styles/elements/CustomButton.scss';

const CustomButton = props => {
  let container = styles.container;
  let text = styles.text;

  switch (props.type) {
    case 'white':
      container = [container, styles.whiteBack];
      text = [styles.text];
      break;

    case 'theme':
      container = [container, styles.themeBack];
      text = [styles.white];
      break;

    case 'disabled':
      container = [container, styles.disabledBack];
      text = [styles.white];
      break;
    default:
      container = styles.container;
  }

  return (
    <TouchableOpacity
      style={[container, props.style]}
      onPress={props.type === 'disabled' ? () => { } : props.onPress}>
        { props.icon &&  props.icon }
      <Text style={[text]}> {props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
