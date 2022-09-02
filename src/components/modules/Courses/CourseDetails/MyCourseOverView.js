/**
 * This is a slide for the course Details. This page shows the details for the selected course.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {MyCourseOverview}- returns a module for Course Overview.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

import styles from '@styles/modules/Courses/MyCourseOverview.scss';
import { useDispatch, useSelector } from 'react-redux';
import DateIcon from '@assets/images/date.svg';
import BackIcon from '@assets/images/back.svg';

const MyCourseOverview = props => {

  const dispatch = useDispatch();
  const myCoursesDetails = useSelector(state => state.courseReducer.myCoursesDetails);

  useEffect(() => {

  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <View style={styles.row}>
          <Text style={styles.category}>IOE</Text>
        </View>

        <View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: myCoursesDetails.image }}
          />
        </View>

        <Text style={styles.title}>{myCoursesDetails.name}</Text>

        <View style={styles.flex1}>
          <View style={styles.tagContainer}>
            <View style={styles.icon}>
              <DateIcon style={styles.tagIcon} />
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <Text style={styles.tagTitle}>Start Date</Text>
              <Text style={styles.tagDesc}>
                {/* {myCoursesDetails.duration} */}
                {myCoursesDetails.sessions.map((date, dateIndex) =>
                  date.start_date.split('T')[0] + "\n")}
              </Text>
            </View>
          </View>

          <View style={styles.tagContainer}>
            <View style={styles.icon}>
              <DateIcon style={styles.tagIcon} />
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <Text style={styles.tagTitle}>Duration</Text>
              <Text style={styles.tagDesc}>
                {/* {myCoursesDetails.duration} */}
                {myCoursesDetails.duration}
              </Text>
            </View>
          </View>

          <View style={styles.tagContainer}>
            <View style={styles.icon}>
              <DateIcon style={styles.tagIcon} />
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <Text style={styles.tagTitle}>Student</Text>
              <Text style={styles.tagDesc}>
                {/* {myCoursesDetails.duration} */}
                {myCoursesDetails?.enrollment_count?.course_enroll_count}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.gap}></View>

      {/* <View style={styles.padding}>
        <Text style={styles.title}>Course Overview</Text>
        <Text></Text>
      </View> */}

    </ScrollView>
  );
};

export default MyCourseOverview;
