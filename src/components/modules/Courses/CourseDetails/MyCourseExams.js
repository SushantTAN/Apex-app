/**
 * This is a slide for the course Details. This page shows the exams related to selected course.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {MyCourseExams}- returns a module for Course Exams.
 */

import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, } from 'react-native';

import { courseExamsRequest } from '@apexapp/store/actions/course';
import styles from '@styles/modules/Courses/MyCourseExams.scss';
import { useDispatch, useSelector } from 'react-redux';
import ExamCard from '@apexapp/components/elements/ExamCard';
import { HEIGHT } from '@apexapp/utils/constants';



const MyCourseExams = props => {

  const examCardInfo = [
    { title: "Live" },
    { title: "Practice" },
  ]

  const dispatch = useDispatch();
  const courseExams = useSelector(state => state.courseReducer.courseExamsList)

  useEffect(() => {
    dispatch(courseExamsRequest());
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Text>Course Exams</Text> */}

      {
        courseExams.results.map((item, index) => <ExamCard
          status={item.status}
          tags={examCardInfo}
          name={item.name}
          actionPress={() => handleToDetail(item.id)}
          price={item.price}
          duration={item.template.duration}
          handleExamDetailsLink={() => handleExamDetailsLink(item.id)} />
        )
      }
      <View style={{ height: HEIGHT * 0.3 }}></View>
    </ScrollView>
  );
};

export default MyCourseExams;
