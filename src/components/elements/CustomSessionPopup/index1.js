/**
 * This is another Session popup Component 
 
 * @param {Function} props.onPress - function to execute on pressing

 * @returns {CustomSessionPopup1}- returns another popup Component
 */

import React, { useState } from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  AppState,
  ScrollView,
} from 'react-native';

import CustomButton from '../CustomButton';
import styles from '@styles/elements/CustomSessionPopup1';
import DateIcon from '@assets/images/date.svg';
import { useSelector } from 'react-redux';

const data = [
  {
    title1: 'Session 1',
    date: 'Date',
    time: '29 Jan,2022',
  },
  {
    title1: 'Session 2',
    date: 'Date',
    time: '29 Jan,2022',
  },
  {
    title1: 'Session 3',
    date: 'Date',
    time: '29 Jan,2022',
  },
];
const CustomSessionPopup1 = props => {


  const courseDetails = useSelector(state => state.courseReducer.courseDetail);

  const handleEnroll = (id) => {
    props.navigation.navigate('CoursePayment', { id: id });
  };

  const closeModal = bool => {
    props.changeModalVisible(bool);
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={{ ...styles.modal, backgroundColor: "#fff" }}>
        <View style={styles.flex1}>
          <Text style={styles.head}>Session</Text>
          <TouchableOpacity onPress={() => props.closeModal(false)}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.line}></Text>

        <View style={styles.courseSessionContainer}>
          <Text style={styles.topic}>Choose course session</Text>
          <Text style={styles.p}>
            Choosing session will let you to particular session exam
            enrollment
          </Text>
        </View>

        <ScrollView style={styles.sessionContainer}>
          <View style={styles.flex2}>
            {data.map((item, index) => {
              return (
                <View style={styles.data} key={index}>
                  <View>
                    <Text style={styles.title1}>{item.title1}</Text>
                    <View style={styles.flex3}>
                      <View style={styles.iconback}>
                        <DateIcon style={styles.sessionIcon} />
                      </View>
                      <View>
                        <Text style={styles.title2}>{item.date}</Text>

                        {courseDetails.sessions.map((item, index) => {
                          return (
                            <Text
                              key={index}
                              style={styles.time}>{item.start_date.split('T')[0]} </Text>
                          )
                        })}

                      </View>
                    </View>
                  </View>

                  <CustomButton
                    onPress={handleEnroll}
                    style={styles.CustomButton}
                    type="theme"
                    title={'Enroll now'}
                    color="#ffffff"
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default CustomSessionPopup1;
