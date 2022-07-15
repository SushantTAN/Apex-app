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
];
const CustomSessionPopup1 = props => {

  const handleEnroll = () => {
    props.navigation.navigate('CoursePayment');
  };

  const closeModal = bool => {
    props.changeModalVisible(bool);
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.flex1}>
          <Text style={styles.head}>Session</Text>
          <TouchableOpacity onPress={() => closeModal(false, 'Cancel')}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.line}></Text>

        <ScrollView>
          <View>
            <Text style={styles.topic}>Choose course session</Text>
            <Text style={styles.p}>
              Choosing session will let you to particular session exam
              enrollment
            </Text>
          </View>

          <View style={styles.flex2}>
            {data.map((item, index) => {
              return (
                <View style={styles.data} key={index}>
                  <View>
                    <Text style={styles.title1}>{item.title1}</Text>
                    <View style={styles.flex3}>
                      <View style={styles.iconback}>
                        <Image
                          style={styles.clockicon}
                          source={require('@assets/images/Vecto.png')}
                        />
                      </View>
                      <View>
                        <Text style={styles.title2}>{item.date}</Text>
                        <Text style={styles.time}>{item.time} pm</Text>
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
