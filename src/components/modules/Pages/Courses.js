/**
 * This is  page containing the Course and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Course}- returns a module for Course page
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import CustomTextInput from '@apexapp/components/elements/CustomTextInput';
import CustomButtonPopup1 from '@apexapp/components/elements/CustomButtonPopup/index1';
import styles from '@styles/modules/Pages/Courses';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import DateIcon from '@assets/images/date.svg';
import UserIcon from '@assets/images/User.svg';
import TopBar from '@components/elements/TopBar';
import CourseCard from '../CourseCard';
import BackIcon from '@assets/images/back.svg';
import FilterIcon from '@assets/images/Filter.svg'
import { useSelector, useDispatch } from 'react-redux';
import { courseListRequest } from '@apexapp/store/actions/course';
import { DrawerItemList } from '@react-navigation/drawer';


let information = [
  {
    id: 1,
    name: '',
  },
];

const data = [
  {
    image: '',
    tags: ["IOm", "Multiple Section"],
    main1: 'Multiple  Section',
    info: 'Medical Entrance (ME-CEE) with multiple line ',
    date: 'Starting on Feb ,2022 (4 month)',
    data: '200+ students enrolled',
  },
  {
    image: '',
    tags: ["IOm", "Multiple Section"],
    main1: 'Multiple Section',
    info: 'Medical Entrance  (ME-CEE) with multiple line ',
    date: 'Starting on Feb ,2022 (4 month)',
    data: '200+ students enrolled',
  },
];



const Courses = props => {

  const handleArrow = id => {
    props.navigation.navigate('CourseOverview', { id: id });
  };

  const dispatch = useDispatch();
  const courseList = useSelector(state => state.courseReducer.courseList);

  useEffect(() => {
    dispatch(courseListRequest());
  }, []);

  const courseCardInfo = [
    "IOM",
    "Multiple Section",
  ]

  // console.log("asdsf", courseList.results)
  return <Text style={{ fontFamily: 'OpenSans-SemiBold', padding: 16, fontSize: 16 }}>No courses yet.</Text>;
  return (

    <ScrollView contentContainerStyle={{ paddingBottom: 10 }} stickyHeaderIndices={[0]} style={styles.scrollView}>
      {/* <TopBar title="Courses" backIcon={<BackIcon />} icon={<FilterIcon style={{ color: "#000" }} />} />
      <View style={styles.gap} />
      <View style={styles.mainContainer}>
        <View style={styles.text}>

          {courseList.results.map((item, index) => {
            return (

              <CourseCard
                key={index}
                tags={courseCardInfo}
                actionPress={() => handleArrow(item.id)}
                sessions={item.sessions}
                name={item.name}
                numberOfEnroll={item.enrollment_count.course_enroll_count}
                image={item.image}
              />
            );
          })}
        </View>

      </View> */}

      <Text style={{ fontFamily: 'OpenSans-SemiBold', padding: 16, fontSize: 16 }}>No courses yet</Text>
    </ScrollView>

  );
};

export default Courses;
