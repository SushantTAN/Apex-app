/**
 * This is  page containing the CoursePayment and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {CoursePayment}- returns a module for Coursepayment
 */

import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import CustomButton from '@apexapp/components/elements/CustomButton';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import TopBar from '@components/elements/TopBar';
import BackIcon from '@assets/images/back.svg';
import styles from '@styles/modules/Pages/CoursePayment';


const data = [
  {
    title: 'Instructions',
    header1: '1.instruction number 1',
    header2: '2.instruction number 2',
  },
];

const CoursePayment = (props) => {
  return (
    <>
      <View style={styles.maincontainer}>
      <TopBar backIcon={<BackIcon/>} title="Payments" />
        <View style={styles.gap} />

        <View style={styles.text}>
          <Text style={styles.baseText}>Engineering Entrance (IOE)</Text>
          <Text style={styles.Text}>
            Apex Education Academy (AEA) has been offering various
            Career-oriented Entrance Preparation Courses including Medical and
            Engineering Preparation asince two decades.
          </Text>
          <View style={styles.prices}>
            <Text style={styles.price}>Rs.500</Text>
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
                  <Text style={styles.header2}>{item.header2}</Text>
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
