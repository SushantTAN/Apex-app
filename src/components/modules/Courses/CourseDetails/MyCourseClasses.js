/**
 * This is a slide for the course Details. This page shows the classes related to selected course.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {MyCourseClasses}- returns a module for Course Classes.
 */

 import React, { useEffect, useRef, useState } from 'react';
 import { Text, View,  } from 'react-native';
 
 import styles from '@styles/modules/Courses/MyCourseClasses.scss';
 
 
 const MyCourseClasses = props => {
 
   return (
     <View style={styles.container}>
       <Text>Course Classes</Text>
     </View>
   );
 };
 
 export default MyCourseClasses;
 