/**
 * This is a slide for the course Details. This page shows the details for the selected course.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {MyCourseOverview}- returns a module for Course Overview.
 */

 import React, { useEffect, useRef, useState } from 'react';
 import { Text, View,  } from 'react-native';
 
 import styles from '@styles/modules/Courses/MyCourseOverview.scss';
 
 
 const MyCourseOverview = props => {
 
  
 
   return (
     <View style={styles.container}>
       <Text>Overview</Text>
     </View>
   );
 };
 
 export default MyCourseOverview;
 