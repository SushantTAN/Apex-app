/**
 * This is a Header Component
 * @param {String} props.type - type of button
 * @param {Function} props.onPress - function to execute on pressing
 * @param {String} props.title - text to display in button
 * @returns {CustomButton}- returns a Header Component
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '@styles/elements/Header.scss';
import Mainlogo from "@assets/images/Apexlogo.svg";


const Header = props => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
      />
      <Mainlogo width={90} height={90} />
      <Text style={styles.heading}>Apex Educational Academy</Text>
    </View>
  );
};

export default Header;
