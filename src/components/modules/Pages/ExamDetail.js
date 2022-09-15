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
  RefreshControl,
  BackHandler
} from 'react-native';

import { CommonActions, StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '@apexapp/components/elements/CustomButton';
import styles from '@styles/modules/Pages/ExamDetail';
import CustomSessionPopup from '@apexapp/components/elements/CustomSessionPopup';
import { examDetail, examDetailRequest, examResultsRequest, examsEnrollRequest } from '@apexapp/store/actions/exam';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import TopBar from '@apexapp/components/elements/TopBar';
import Divider from '@components/elements/Divider/index';
// import FilterIcon from '@assets/images/Filter.svg';
import BackIcon from '@assets/images/back.svg';
import { getSocketUrl } from '@utils/api';
import DateIcon from '@assets/images/date.svg'
import TimeIcon from '@assets/images/time.svg'
import ClockIcon from '@assets/images/clock.svg'
import MarksIcon from '@assets/images/marks.svg'
import MarkIcon from '@assets/images/mark.svg'
import RankIcon from '@assets/images/Rank.svg'
import Tag from '@components/elements/Tag/index'
import InfoBox from '@apexapp/components/elements/InfoBox';
import CustomModal from '@elements/CustomModal/CustomModal';


const ExamDetail = props => {
  const { id } = props.route.params;
  // console.log(`url  ${getSocketUrl()}/clock/exam_${id}`);
  var ws = React.useRef(new WebSocket(`${getSocketUrl()}/clock/exam_${id}/`)).current;


  const [examId, setExamId] = useState(id)

  useEffect(() => {
    setExamId(id)
  }, [])

  // console.log(examId, "examid")

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const dispatch = useDispatch();
  const examDetails = useSelector(state => state.examsReducer.examDetail);
  const auth = useSelector(state => state.authReducer);
  const result = useSelector(state => state.examsReducer.examResult);
  console.log("exam detail", examDetails, id);


  useEffect(() => {
    if (examDetails?.sessions[0]?.status === 'resultsout' && examDetails.is_enrolled && examDetails.exam_enroll) {
      dispatch(examResultsRequest(examDetails?.exam_enroll?.id, auth.access_token));
    }
  }, [examDetails]);

  // useEffect(() => {
  //   ws.onopen = () => {
  //     // connection opened
  //     console.log("open")  // send a message
  //   };

  //   ws.onmessage = async (e) => {
  //     // console.log("message", e);

  //     let data = await JSON.parse(e.data);
  //     console.log("message", data);

  //     if (data.status === 'in_progress') {
  //       dispatch(examDetailRequest(examId));
  //     }

  //     if (data.session_status === true) {
  //       dispatch(examDetailRequest(examId));
  //     }
  //   };

  //   // ws.onclose = (e) => {
  //   //   console.log("close");
  //   // };
  //   ws.onerror = (e) => {
  //     console.log("error", e);
  //   };

  //   return () => {
  //     ws.close();
  //   }
  // }, []);

  useEffect(() => {
    // ws.onopen = () => {
    //   // connection opened
    //   console.log("open")  // send a message
    // };
    const subscribe = props.navigation.addListener('focus', () => {
      ws.onopen = () => {
        // connection opened
        console.log("open")  // send a message
      };

      ws.onmessage = async (e) => {
        // console.log("message", e);

        let data = await JSON.parse(e.data);
        // console.log("message", data);

        if (data.status === 'in_progress') {
          dispatch(examDetailRequest(examId));
        }

        if (data.session_status === true) {
          dispatch(examDetailRequest(examId));
        }
      };

      ws.onclose = (e) => {
        console.log("close");
      };
      ws.onerror = (e) => {
        console.log("error", e);
      };
    });


    const unsubscribe = props.navigation.addListener('blur', () => {
      ws.close();
    });

    return () => {
      subscribe;
      unsubscribe;
    };
  }, [props.navigation]);

  useEffect(() => {
    dispatch(examDetailRequest(examId));

    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   props.navigation.navigate('Home');
    // });

    const subscribe = props.navigation.addListener('focus', () => {
      dispatch(examDetailRequest(examId));
      setIsModalVisible(false);
      // BackHandler.addEventListener("hardwareBackPress", () => {
      //   props.navigation.navigate('Home');
      // });

    });

    return subscribe;
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(examDetailRequest(examId));
    setRefreshing(false);
  }

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const findSessionWithId = (id) => {
    let session = examDetails.sessions.find(el => el.id === id) || {};
    console.log(session.id, session.status);

    return session;
  }

  const handleChooseSession = () => {
    changeModalVisible(true);
  };

  const handleEnroll = () => {
    // props.navigation.navigate('ExamPayment');
    let data = {
      exams: [{
        exam: id,
        selected_session: examDetails.sessions.length > 0 ? examDetails.sessions[0].id : ''
      }]
    }
    dispatch(examsEnrollRequest(data, auth.access_token));
  };

  const handleTakeExam = (id, enrollId, sessionId) => {
    // props.navigation.navigate('TakeExams', { id: id, enrollId: enrollId });
    props.navigation.dispatch(
      StackActions.replace('TakeExamsWithPerPage', { id: id, enrollId: enrollId, sessionId: sessionId })
    );
  }

  const handleViewResults = (enrollId) => {
    props.navigation.navigate('ExamsResults', { id: id, enrollId: enrollId });
  }

  const handleArrow = () => {
    props.navigation.dispatch(CommonActions.goBack());
  };

  // console.log(examDetails.sessions, "detail")


  return (
    <>
      {/* <HeaderSearch
            title="Exam Details"
            navigation={props.navigation}
            backnav="Exam"
          /> */}
      <TopBar search={false} backIcon={<BackIcon />} title="Exams details" />
      <ScrollView style={{ ...styles.maincontainer }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.main}>
          <View style={styles.tagContainer}>
            <Tag title="Practice exam" />
          </View>
          {/* {console.log("details test", examDetails)} */}
          <Text style={styles.examHeaderText}>{examDetails?.name}</Text>

          <View style={styles.examDetail}>
            <View style={styles.flex1}>
              {/* <View style={styles.flex2}>
                <View style={styles.icon}>
                  <DateIcon style={{marginTop:-2, color:"#fff"}}/>
                </View>
                <View>
                  <Text style={styles.duration}>Exam Date</Text>
                  <Text style={styles.durationSubText}>
                    {examDetails.sessions[0].start_date.split('T')[0]}
                    29 Jan, 2022
                  </Text>
                </View>
              </View> */}

              <InfoBox icon={<DateIcon style={{ color: "#fff" }} />} title="Exam Date" desc={examDetails?.sessions[0]?.start_date.split('T')[0]} />
              <InfoBox icon={<TimeIcon style={{ color: "#fff" }} />} title="Duration" desc={examDetails?.template.duration} />
              <InfoBox icon={<ClockIcon style={{ color: "#fff" }} />} title="Time" desc={examDetails?.sessions.map((item, index) => <Text key={index}>{item?.start_date?.split('T')[1]?.split('+')[0]}</Text>)} />
              <InfoBox icon={<MarksIcon style={{ color: "#fff" }} />} title="Full marks" desc={examDetails?.template.full_marks} />
              <InfoBox icon={<MarkIcon style={{ color: "#fff" }} />} title="Pass marks" desc={examDetails?.template.pass_marks} />
              {examDetails?.sessions[0]?.status === 'resultsout' && examDetails?.is_enrolled && examDetails?.exam_enroll &&
                <InfoBox icon={<MarkIcon style={{ color: "#fff" }} />} title="Marks" desc={result.score ? result.score : 40} />
              }
              {examDetails?.sessions[0]?.status === 'resultsout' && examDetails?.is_enrolled && examDetails?.exam_enroll &&

                <InfoBox title="Result" icon={<MarkIcon style={{ color: "#fff" }} />} desc={result.status} />
              }
              {examDetails?.sessions[0]?.status === 'resultsout' && examDetails?.is_enrolled && examDetails?.exam_enroll &&
                <InfoBox icon={<RankIcon style={{ color: "#fff" }} />} title="Rank" desc={result.rank} />
              }


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
            {examDetails?.template.description}
          </Text>
        </View>
      </ScrollView>



      {examDetails?.sessions.length > 0 && <View style={styles.enroll}>
        {examDetails?.is_enrolled ? (examDetails?.exam_enroll ?
          (<View style={styles.enroll0}>
            <Text style={styles.enroll1}>Results Out</Text>
            <Text style={styles.enroll2}>
              Result Details will become active after results are out.
            </Text>
          </View>)
          : (<View style={styles.enroll0}>
            <Text style={styles.enroll1}>Take the exam</Text>
            <Text style={styles.enroll2}>
              Click Take Exam after it becomes active.
            </Text>
          </View>))
          : <View style={styles.enroll0}>
            <Text style={styles.enroll1}>Get enrollment</Text>
            <Text style={styles.enroll2}>
              On clicking Enroll now leads you exam session page
            </Text>
          </View>}



        {/* {console.log('enroll check in render', examDetails.is_enrolled)} */}
        <View style={styles.buttons}>
          {!examDetails?.is_enrolled ? (
            examDetails?.sessions.length > 1 ? (
              // <CustomButton
              //   onPress={handleChooseSession}
              //   style={styles.CustomButton}
              //   type="theme"
              //   title={'Choose Session'}
              //   color="#ffffff"
              // />

              <CustomModal
                height="60%"
                button={<View style={styles.button}>
                  <Text style={{ color: 'white', fontFamily: 'OpenSans-Regular' }}>Choose Session</Text>
                </View>}

              >
                <CustomSessionPopup
                  data={{
                    exams: [{
                      exam: id,
                      selected_session: examDetails?.sessions && examDetails?.sessions.length > 0 ? findSessionWithId(examDetails.session_id)?.id : ''
                    }]
                  }}
                  examDetails={examDetails}
                  navigation={props.navigation}
                  changeModalVisible={changeModalVisible}
                />
              </CustomModal>
            ) : (

              ['ended', 'resultsout'].includes(findSessionWithId(examDetails.session_id)?.status) ?
                (
                  examDetails?.sessions.length > 0 && <CustomButton
                    onPress={() => { }}
                    style={[styles.CustomButton]}
                    type={'disabled'}
                    title={'Enroll'}
                  // color="#ffffff"
                  />) :
                (
                  <CustomButton
                    onPress={handleEnroll}
                    style={styles.CustomButton}
                    type="theme"
                    title={'Enroll now'}
                    color="#ffffff"
                  />

                )
            )
          ) : (
            findSessionWithId(examDetails.session_id)?.status === 'resultsout' ?
              <CustomButton
                onPress={() => { handleViewResults(examDetails?.exam_enroll?.id) }}
                style={[styles.CustomButton]}
                type={'theme'}
                title={'Result Details'}
              // color="#ffffff"
              /> : (
                examDetails?.exam_enroll ?
                  <CustomButton
                    onPress={() => { }}
                    style={[styles.CustomButton]}
                    type={'disabled'}
                    title={'Result Details'}
                  // color="#ffffff"
                  />
                  :
                  <CustomButton
                    onPress={() => handleTakeExam(examDetails?.id, examDetails?.exam_enroll?.id, examDetails?.session_id)}
                    style={[styles.CustomButton]}
                    type={['active'].includes(findSessionWithId(examDetails.session_id)?.status) ? "theme" : 'disabled'}
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
                  selected_session: examDetails?.sessions && examDetails?.sessions.length > 0 ? examDetails?.sessions[0].id : ''
                }]
              }}
              examDetails={examDetails}
              navigation={props.navigation}
              changeModalVisible={changeModalVisible}
            />
          </Modal>
        </View>
      </View>}
    </>
  );
};

export default ExamDetail;
