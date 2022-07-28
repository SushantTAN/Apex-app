/**
 * This is  page containing the ExamDetails and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {ExamDetails}- returns a module for ExamDetails
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  RefreshControl
} from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '@apexapp/components/elements/CustomButton';
import styles from '@styles/modules/Pages/ExamDetail';
import CustomSessionPopup from '@apexapp/components/elements/CustomSessionPopup';
import { examDetail, examDetailRequest, examResultsRequest, examsEnrollRequest } from '@apexapp/store/actions/exam';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import { getSocketUrl } from '@utils/api';
import DateIcon from '@assets/images/date.svg'
import TimeIcon from '@assets/images/time.svg'
import ClockIcon from '@assets/images/clock.svg'
import MarksIcon from '@assets/images/marks.svg'
import MarkIcon from '@assets/images/mark.svg'


const data = [
  {
    id: 1,
    title: 'Instruction number 1',
  },
  {
    id: 2,
    title: 'Instruction number 2',
  },
];

const ExamDetail = props => {
  const { id } = props.route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const dispatch = useDispatch();
  const examDetails = useSelector(state => state.examsReducer.examDetail);
  const auth = useSelector(state => state.authReducer);
  const result = useSelector(state => state.examsReducer.examResult);
  // console.log("exam detail", examDetails, id);


  useEffect(() => {
    if (examDetails?.sessions[0]?.status === 'resultsout') {
      dispatch(examResultsRequest(examDetails?.exam_enroll?.id, auth.access_token));
    }
  }, [examDetails]);

  useEffect(() => {
    dispatch(examDetailRequest(id));

    const subscribe = props.navigation.addListener('focus', () => {
      dispatch(examDetailRequest(id));
      setIsModalVisible(false);
    });

    return subscribe;
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(examDetailRequest(id));
    setRefreshing(false);
  }

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const handleChooseSession = () => {
    changeModalVisible(true);
  };

  const handleEnroll = () => {
    // props.navigation.navigate('ExamPayment');
    let data = {
      exams: [{
        exam: id,
        selected_session: examDetails.sessions[0].id
      }]
    }
    dispatch(examsEnrollRequest(data, auth.access_token));
  };

  const handleTakeExam = (id, enrollId, sessionId) => {
    props.navigation.navigate('TakeExams', { id: id, enrollId: enrollId });
  }

  const handleViewResults = (enrollId) => {
    props.navigation.navigate('ExamsResults', { id: id, enrollId: enrollId });
  }

  const handleArrow = () => {
    props.navigation.dispatch(CommonActions.goBack());
  };


  return (
    <>
      <ScrollView style={styles.maincontainer} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
         <HeaderSearch
            title="Exam Details"
            navigation={props.navigation}
            backnav="Exam"
          />
        <View style={styles.main}>
         
          <View style={styles.examDetail}>
            <View style={styles.flex1}>
              <View style={styles.flex2}>
                <View style={styles.icon}>
                  <DateIcon style={{marginTop:-2}}/>
                </View>
                <View>
                  <Text style={styles.duration}>Date</Text>
                  <Text style={styles.duration1}>
                    {/* {examDetails.sessions[0].start_date.split('T')[0]} */}
                  </Text>
                </View>
              </View>

              <View style={styles.fullmark}>
                <View style={styles.icon}>
                    <TimeIcon/>
                </View>
                <View>
                  <Text style={styles.fullmarks}>Duration</Text>
                  <Text style={styles.fullmarks1}>
                    {examDetails.template.duration}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.flex3}>
              <View style={styles.passmark}>
                <View style={styles.icon}>
                  <ClockIcon/>
                </View>
                <View>
                  <Text style={styles.passmarks}>Time</Text>
                  <Text style={styles.passmarks1}>
                    {examDetails.sessions.length > 1
                      ? 'Multiple session'
                      : 'Single'}
                  </Text>
                </View>
              </View>
              <View style={styles.mark}>
                <View style={styles.icon}>
                  <MarksIcon/>
                </View>
                <View>
                  <Text style={styles.marks}>Full marks</Text>
                  <Text style={styles.marks1}>
                    {examDetails.template.full_marks}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.flex3}>
              <View style={styles.pass}>
                <View style={styles.icon}>
                  <MarkIcon/>
                </View>
                <View>
                  <Text style={styles.passmarks}>Pass marks</Text>
                  <Text style={styles.passmarks1}>
                    {examDetails.template.pass_marks}
                  </Text>
                </View>
              </View>

              {examDetails?.sessions[0]?.status === 'resultsout' && <View style={[styles.pass, { marginHorizontal: 16 }]}>
                <Text style={styles.icon}> </Text>
                <View>
                  <Text style={styles.passmarks}>Marks</Text>
                  <Text style={styles.passmarks1}>
                    {result.score}
                  </Text>
                </View>
              </View>}
            </View>

            <View style={styles.flex3}>
              {examDetails?.sessions[0]?.status === 'resultsout' && <View style={styles.pass}>
                <Text style={styles.icon}> </Text>
                <View>
                  <Text style={styles.passmarks}>Rank</Text>
                  <Text style={styles.passmarks1}>
                    {result.rank}
                  </Text>
                </View>
              </View>}

              {examDetails?.sessions[0]?.status === 'resultsout' && <View style={[styles.pass, { marginHorizontal: 16 }]}>
                <Text style={styles.icon}> </Text>
                <View>
                  <Text style={styles.passmarks}>Result</Text>
                  <Text style={styles.passmarks1}>
                    {result.status}
                  </Text>
                </View>
              </View>}
            </View>
          </View>
        </View>

        <View style={styles.main2}>
          <Text style={styles.instruction}>Instructions</Text>
          {/* {data.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.instruction1}>
                {item.id}. {item.title}
              </Text>
            </View>
          );
        })} */}
          <Text style={styles.instruction1}>
            {examDetails.template.description}
          </Text>
        </View>


      </ScrollView>

      <View style={styles.enroll}>
        <View style={styles.enroll0}>
          <Text style={styles.enroll1}>Get enrollment</Text>
          <Text style={styles.enroll2}>
            On clicking Enroll now leads you exam session page
          </Text>
        </View>
        {/* {console.log('enroll check in render', examDetails.is_enrolled)} */}
        <View style={styles.buttons}>
          {!examDetails.is_enrolled ? (
            examDetails.sessions.length > 1 ? (
              <CustomButton
                onPress={handleChooseSession}
                style={styles.CustomButton}
                type="theme"
                title={'Choose Session'}
                color="#ffffff"
              />
            ) : (
              <CustomButton
                onPress={handleEnroll}
                style={styles.CustomButton}
                type="theme"
                title={'Enroll now'}
                color="#ffffff"
              />
            )
          ) : (
            examDetails?.sessions[0]?.status === 'resultsout' ?
              <CustomButton
                onPress={() => { handleViewResults(examDetails?.exam_enroll?.id) }}
                style={[styles.CustomButton]}
                type={'theme'}
                title={'Result Details'}
              // color="#ffffff"
              /> : (
                examDetails.exam_enroll ?
                  <CustomButton
                    onPress={() => {  }}
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

          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            nRequestClose={() => changeModalVisible(true)}>
            <CustomSessionPopup
              data={{
                exams: [{
                  exam: id,
                  // selected_session: examDetails.sessions && examDetails.sessions.length>0?sessions[0].id :''
                }]
              }}
              examDetails={examDetails}
              navigation={props.navigation}
              changeModalVisible={changeModalVisible}
            />
          </Modal>
        </View>
      </View>
    </>
  );
};

export default ExamDetail;
