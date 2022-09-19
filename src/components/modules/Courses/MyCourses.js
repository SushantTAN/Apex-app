/**
 * This is an onboarding page with 3 slides. This page is shown only when user opens the app for the first time.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {OnBoarding}- returns a module for on boarding.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, BackHandler, Alert, FlatList, RefreshControl } from 'react-native';

import styles from '@styles/modules/onBoarding.scss';
import TopBar from '@apexapp/components/elements/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { myCourseListRequest } from '@apexapp/store/actions/course';
import CourseCard from '@apexapp/components/elements/CourseCard';




const MyCourses = props => {

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const myCourses = useSelector(state => state.courseReducer.myCoursesList);
  // console.log(myCourses);

  const fetchData = () => {
    dispatch(myCourseListRequest());
  }

  useEffect(() => {
    fetchData();
    const subscribe = props.navigation.addListener('focus', () => {
      fetchData();
    });

    return () => {
      subscribe;
    };
  }, []);

  const courseCardInfo = [
    "IOM",
    "Multiple Section",
  ]

  const handleClick = (id) => {
    props.navigation.navigate('MyCourseDetails', { id });
  }

  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  }

  const renderItem = ({ item, index }) => {
    return <CourseCard
      key={index}
      tags={courseCardInfo}
      actionPress={() => handleClick(item.id)}
      sessions={item.sessions}
      name={item.name}
      numberOfEnroll={item?.enrollment_count?.course_enroll_count}
      image={item.image}
    />
  }

  return (
    <View style={styles.container}>
      <TopBar title="My Courses" backIcon={null} search={false} />
      {myCourses.length > 0 ? <FlatList
        data={myCourses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /> : <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'OpenSans-SemiBold', padding: 16, fontSize: 16, }}>No courses yet</Text>
      </View>}
      {/* <Text>My courses</Text> */}
    </View>
  );
};

export default MyCourses;
