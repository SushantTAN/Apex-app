/**
 * This is a slide for the classes. This page shows the QR code and its scanning.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {QR}- returns a module for Course Classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import styles from '@styles/modules/Class/Qr.scss';


const QR = props => {

  const onSuccess = (e) => {
    console.log("ttt", e);
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  }

  return (
    <View style={styles.container}>
      <Text>Sacn QURR</Text>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      // topContent={
      //   <Text style={styles.centerText}>
      //     Sacn QR
      //   </Text>
      // }
      // bottomContent={
      //   <TouchableOpacity style={{ paddingBottom: 24 }}>
      //     <Text style={[styles.heading, { color: 'white', padding: 16 }]}>Scan QR code</Text>
      //   </TouchableOpacity>
      // }
      />
      <TouchableOpacity style={{ paddingBottom: 24 }}>
        <Text style={[styles.heading, { color: 'white', padding: 16 }]}>Scan QR code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QR;
