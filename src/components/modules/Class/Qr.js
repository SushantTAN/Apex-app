/**
 * This is a slide for the classes. This page shows the QR code and its scanning.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {QR}- returns a module for Course Classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image } from 'react-native';

import styles from '@styles/modules/Class/Qr.scss';


const QR = props => {

  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/DefaultQR.png')}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>Kishor Ghising</Text>
        <Text style={styles.text}>Scan QR code to register attendance</Text>
      </View>
    </View>
  );
};

export default QR;
