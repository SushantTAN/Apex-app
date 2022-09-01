/**
 * This is a slide for the course Details. This page shows the exams related to selected course.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {MyCourseExams}- returns a module for Course Exams.
 */

 import React, { useEffect, useRef, useState } from 'react';
 import { Text, View,  } from 'react-native';
 
 import styles from '@styles/modules/Courses/MyCourseExams.scss';
 
 
 const MyCourseExams = props => {
 
   return (
     <View style={styles.container}>
       <Text>Course Exams</Text>
     </View>
   );
 };
 
 export default MyCourseExams;
 