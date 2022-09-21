/**
 * This is a slide for the course Details. This page shows the classes related to selected course.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {MyCourseClasses}- returns a module for Course Classes.
 */

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, } from 'react-native';

import styles from '@styles/modules/Courses/MyCourseClasses.scss';
import { useSelector } from 'react-redux';
import CourseClassCard from '@apexapp/components/elements/Class/CourseClassCard';


const MyCourseClasses = props => {

  const myCoursesDetails = useSelector(state => state.courseReducer.myCoursesDetails);
  console.log(",ycourse details", myCoursesDetails.course_enroll.selected_session.meetings);
  const meetings = myCoursesDetails.course_enroll.selected_session.meetings;

  const Item = ({ item, index }) => {
    return <View style={{
      width: '50%',
      paddingRight: index % 2 === 0 ? 8 : 0,
      paddingLeft: index % 2 === 0 ? 0 : 8
    }}>
      <CourseClassCard item={item} />
    </View>;
  };

  return (
    <View style={styles.container}>
      {/* {
        meetings.map((meeting, meetingIndex) => <Fragment key={meetingIndex}>
          <CourseClassCard item={meeting} />
        </Fragment>)
      } */}

      <FlatList
        data={[...meetings]}
        numColumns={2}
        renderItem={Item}
        contentContainerStyle={{}}
        style={{}}
        ItemSeparatorComponent={() => <View style={{ width: 20, height: 16 }} />}
        columnWrapperStyle={{
          justifyContent: "space-between"
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default MyCourseClasses;
