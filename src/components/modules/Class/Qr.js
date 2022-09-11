/**
 * This is a slide for the classes. This page shows the QR code and its scanning.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {QR}- returns a module for Course Classes.
 */

 import React, { useEffect, useRef, useState } from 'react';
 import { Text, View,  } from 'react-native';
 
 import styles from '@styles/modules/Courses/MyCourseClasses.scss';
 
 
 const QR = props => {
 
   return (
     <View style={styles.container}>
       <Text>Qr</Text>
     </View>
   );
 };
 
 export default QR;
 