/**
 * This is a slide for the classes. This page shows the attendance of students or teacher.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {Attendance}- returns a module for Course Classes.
 */

 import React, { useEffect, useRef, useState } from 'react';
 import { Text, View,  } from 'react-native';
 
 import styles from '@styles/modules/Courses/MyCourseClasses.scss';
 
 
 const Attendance = props => {
 
   return (
     <View style={styles.container}>
       <Text>Attendance</Text>
     </View>
   );
 };
 
 export default Attendance;
 