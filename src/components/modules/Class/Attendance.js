/**
 * This is a slide for the classes. This page shows the attendance of students or teacher.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {Attendance}- returns a module for Course Classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

import styles from '@styles/modules/Class/Attendance.scss';
import { Fragment } from 'react';
import AttendanceCard from '@apexapp/components/elements/Class/AttendanceCard';


const Attendance = props => {


  const weekData = [
    { id: 0, name: 'Week1' },
    { id: 1, name: 'Week2' },
    { id: 2, name: 'Week3' },
    { id: 3, name: 'Week4' },
    { id: 4, name: 'Week5' },
    { id: 5, name: 'Week6' },
    { id: 6, name: 'Week7' },
    { id: 7, name: 'Week8' },
    { id: 8, name: 'Week9' },
  ];

  const data = [
    { id: 0, name: 'Class 1' },
    { id: 1, name: 'Class 2' },
    { id: 2, name: 'Class 3' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weekContainer}>
        {weekData.map((item, index) => <Fragment key={index}>
          <TouchableOpacity>
            <Text style={styles.week}>{item.name}</Text>
          </TouchableOpacity>
        </Fragment>
        )}
      </ScrollView>

      <View style={styles.dataContainer}>
        <Text style={styles.heading}>Your Attendance</Text>
        {
          data.map((item, index ) => <Fragment key={index}>
            <AttendanceCard data={item} />
          </Fragment>)
        }

      </View>
    </View>
  );
};

export default Attendance;
