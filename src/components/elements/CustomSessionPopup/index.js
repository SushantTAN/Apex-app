/**
 * This is a Session popup Component
 
 * @param {Function} props.onPress - function to execute on pressing

 * @returns {CustomSessionPopup} - returns a popup Component
 */

import React, { useState, useEffect } from 'react';

import { View, Image, Text, TouchableOpacity, AppState } from 'react-native';

import CustomButton from '../CustomButton';
import styles from '@styles/elements/CustomSessionPopup.scss';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { examsEnrollRequest } from '@apexapp/store/actions/exam';

const data = [
  {
    title1: 'Session 1',
    title2: 'Time',
    time: '5.00',
  },
  {
    title1: 'Session 2',
    title2: 'Time',
    time: '5.00',
  },
  {
    title1: 'Session 3',
    title2: 'Time',
    time: '5.00',
  },


];
const CustomSessionPopup = props => {

  const dispatch = useDispatch();
  const examDetails = useSelector(state => state.examsReducer.examDetail);
  const auth = useSelector(state => state.authReducer);
  // console.log('examdetails', examDetails);

  // const handleEnroll = () => {
  //   // props.navigation.navigate('ExamPayment')

  //   // props.navigation.navigate('ExamPayment');
  //   // let data = {
  //   //   exams: [{
  //   //     exam: id,
  //   //     selected_session: examDetails.sessions[0].id
  //   //   }]
  //   // }
  //   dispatch(examsEnrollRequest(props.data, auth.access_token));
  // };


  const handleEnroll = (index) => {
    // props.navigation.navigate('ExamPayment');
    let data = {
      exams: [{
        exam: examDetails.id,
        selected_session: examDetails.sessions[index].id
      }]
    }
    dispatch(examsEnrollRequest(data, auth.access_token));
    props.closeModal();
  };

  const handleTakeExam = (id, enrollId, sessionId) => {
    props.navigation.navigate('TakeExams', { id: id, enrollId: enrollId });
  }

  const handleViewResults = (enrollId) => {
    props.navigation.navigate('ExamsResults', { id: id, enrollId: enrollId });
  }

  const closeModal = bool => {
    props.changeModalVisible(bool);
  };
  return (

    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.flex1}>
          <Text style={styles.head}>Session</Text>
          <TouchableOpacity onPress={() => props.closeModal(false, 'Cancel')}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.line}></Text>
        <View>
          <Text style={styles.topic}>Choose exam session</Text>
          <Text style={styles.p}>
            Choosing session will let you to particular session exam enrollment
          </Text>
        </View>


        <ScrollView>
          {examDetails.sessions.map((item, index) => {
            return (
              <View style={styles.data}>
                <View key={index}>

                  <Text style={styles.title1}>Session {index + 1}</Text>
                  <View style={styles.flex3}>
                    <View style={styles.iconback}>
                      <Image style={styles.clockicon}
                        source={require('@assets/images/Vecto.png')} />
                    </View>
                    <View>
                      <Text style={styles.title2}>Time</Text>
                      <Text style={styles.time}> {new Date(item.start_date).toLocaleTimeString('en',
                        { timeStyle: 'short', hour12: false, timeZone: 'UTC' })}</Text>
                    </View>
                  </View>
                </View>

                {!examDetails.is_enrolled ? (
                  (
                    <CustomButton
                      onPress={() => handleEnroll(index)}
                      style={styles.CustomButton}
                      type="theme"
                      title={'Enroll now'}
                      color="#ffffff"
                    />
                  )
                ) : (
                  examDetails?.sessions[index]?.status === 'resultsout' ?
                    <CustomButton
                      onPress={() => { handleViewResults(examDetails?.exam_enroll?.id) }}
                      style={[styles.CustomButton]}
                      type={'theme'}
                      title={'Result Details'}
                    // color="#ffffff"
                    /> : (
                      examDetails.exam_enroll ?
                        <CustomButton
                          onPress={() => { }}
                          style={[styles.CustomButton]}
                          type={'disabled'}
                          title={'Result Details'}
                        // color="#ffffff"
                        />
                        :
                        <CustomButton
                          onPress={() => handleTakeExam(examDetails?.id, examDetails?.exam_enroll?.id)}
                          style={[styles.CustomButton, styles.borderBlack]}
                          type={['in_progress'].includes(examDetails?.status) ? "white" : 'disabled'}
                          title={'Take Exam'}
                        // color="#ffffff"
                        />)
                )}
              </View>

            );

          })}
        </ScrollView>
      </View>




    </TouchableOpacity >
  );
};

export default CustomSessionPopup;
