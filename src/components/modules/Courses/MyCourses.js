/**
 * This is an onboarding page with 3 slides. This page is shown only when user opens the app for the first time.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {OnBoarding}- returns a module for on boarding.
 */

 import React, { useRef, useState } from 'react';
 import { Text, View, Image, BackHandler, Alert } from 'react-native';
 
 import styles from '@styles/modules/onBoarding.scss';

 
 
 
 const MyCourses = props => {
   
 
   return (
     <View style={styles.container}>
      <Text>My courses</Text>
     </View>
   );
 };
 
 export default MyCourses;
 