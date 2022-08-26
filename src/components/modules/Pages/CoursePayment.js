/**
 * This is  page containing the CoursePayment and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {CoursePayment}- returns a module for Coursepayment
 */

import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import CustomButton from '@apexapp/components/elements/CustomButton';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import TopBar from '@components/elements/TopBar';
import BackIcon from '@assets/images/back.svg';
import styles from '@styles/modules/Pages/CoursePayment';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { courseEnrollRequest } from '@apexapp/store/actions/course';


const data = [
  {
    title: 'Instructions',
    header1: 'no description available',

  },
];

const CoursePayment = (props) => {
  const dispatch = useDispatch();

  const handlePayment = (id, enrollId) => {
    props.navigation.navigate('CourseOverview', { id: id, enrollId: enrollId })

    dispatch(courseEnrollRequest())
    // console.log("enroll", courseEnrollRequest)
  }

  const courseDetails = useSelector(state => state.courseReducer.courseDetail);

  return (
    <>
      <View style={styles.maincontainer}>
        <TopBar backIcon={<BackIcon />} title="Payments" />
        <View style={styles.gap} />

        <View style={styles.text}>
          <Text style={styles.baseText}>{courseDetails.name}</Text>
          <Text style={styles.Text}>
            {courseDetails.description}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.price}>Rs {courseDetails.price}</Text>
          </View>
        </View>
        <View style={styles.gap} />

        <View style={styles.text}>
          {data.map((item, index) => {
            return (
              <View style={styles.main}>
                <View style={styles.card}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.header1}>{item.header1}</Text>

                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.flex}>
            <Image
              style={styles.image}
              source={require('@assets/images/esewa.png')}
            />
            <View >
              <Text style={styles.fottertext}>Pay with esewa</Text>
            </View>
          </View>
          <View>
            <CustomButton
              onPress={handlePayment}
              type="theme"
              title={'Pay now'}
              style={styles.button}


            />
          </View>
        </View>
      </View>
    </>
  );
};

export default CoursePayment;
