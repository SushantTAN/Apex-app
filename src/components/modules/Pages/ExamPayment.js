/**
 * This is  page containing the ExamPayment and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {ExamPayment}- returns a module for Exampayment
 */

import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import CustomButton from '@apexapp/components/elements/CustomButton';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import TopBar from '@components/elements/TopBar';
import styles from '@styles/modules/Pages/ExamPayment';
import BackIcon from '@assets/images/back.svg';

const data = [
  {
    title: 'Instructions',
    header1: '1.Instruction number 1',
    header2: '2.Instruction number 2',
  },
];

const ExamPaymentPage = props => {
  return (
    <>
      <View style={styles.maincontainer}>
        {/* <HeaderSearch title="Payments" navigation={props.navigation} /> */}
      <TopBar title="Payments" backIcon={<BackIcon/>} />
        <View style={styles.gap} />

        <View style={styles.text}>
          <Text style={styles.baseText}>Test exam 1</Text>
          <Text style={styles.Text}>
            Loksewa class for all types of students.
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
            <View style={styles.txt}>
              <Text style={styles.fottertext}>  Pay with esewa</Text>
            </View>
          </View>


          <CustomButton
            type="theme"
            title={'Pay now'}
            style={styles.button}
            color="white"
          />

        </View>
      </View>
    </>
  );
};

export default ExamPaymentPage;
