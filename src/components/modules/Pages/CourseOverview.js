/**
 * This is  page containing the CourseOverview and other components of the Courses.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {CourseOverview}- returns a module for course overviews
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';

import { CommonActions } from '@react-navigation/native';

import CustomButton from '@components/elements/CustomButton';
import CustomSessionPopup1 from '@apexapp/components/elements/CustomSessionPopup/index1';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import styles from '@styles/modules/Pages/CourseOverview';
import TopBar from '@components/elements/TopBar';
import DateIcon from '@assets/images/date.svg';
import BackIcon from '@assets/images/back.svg';
import CustomModal from '@apexapp/components/elements/CustomModal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { courseDetailRequest } from '@apexapp/store/actions/course';



const CourseOverview = props => {
  const { id } = props.route.params.id;
  // console.log("params", props.route.params.id)

  const [courseId, setCourseId] = useState(id)

  useEffect(() => {
    setCourseId(id)
  }, [props.route.params.id])

  const dispatch = useDispatch();
  const courseDetails = useSelector(state => state.courseReducer.courseDetail);


  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (props.route.params.id) {
      dispatch(courseDetailRequest(props.route.params.id));
    }
    console.log("course", courseId)
  }, [props.route.params.id]);


  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const handleEnroll = () => {
    changeModalVisible(true);
  };
  const handleBack = () => {
    props.navigation.dispatch(CommonActions.goBack());

  };
  console.log('fffg', courseDetails)
  console.log(courseDetails.sessions, "details")
  console.log(courseDetails.image)
  return (
    <>
      <View style={{ flex: 1 }}>
        {/* <HeaderSearch
          title="Courses Details"
          navigation={props.navigation}
          backnav="Courses"
        /> */}
        <TopBar title="Course Details" backIcon={<BackIcon />} search={false} />


        <ScrollView nestedScrollEnabled={true} style={styles.mainContainer}>
          <View style={styles.main1}>
            <View style={styles.head}>
              <View style={styles.texthead}>
                <Text style={styles.text}>IOE</Text>
              </View>
            </View>
            <View style={styles.img}>
              <Image
                style={styles.image}
                source={{ uri: courseDetails.image }}
              />
            </View>
            <View>
              <Text style={styles.p1}>{courseDetails.name}</Text>
            </View>
            <View>
              <Text style={styles.p7}>

                {courseDetails.description}
              </Text>
            </View>
            <View style={styles.examDetail}>
              <View style={styles.flex1}>
                <View style={styles.tagContainer}>
                  <View style={styles.icon}>
                    <DateIcon style={styles.tagIcon} />
                  </View>
                  <View style={{ justifyContent: "flex-start" }}>
                    <Text style={styles.tagTitle}>Starting Date</Text>
                    {courseDetails.sessions.map((item, index) => {
                      return (
                        <Text
                          key={index}
                          style={styles.tagDesc}> {item.start_date.split('T')[0]} </Text>
                      )

                    })}
                  </View>
                </View>

                <View style={styles.tagContainer}>
                  <View style={styles.icon}>
                    <DateIcon style={styles.tagIcon} />
                  </View>
                  <View style={{ justifyContent: "flex-start" }}>
                    <Text style={styles.tagTitle}>Duration</Text>
                    <Text style={styles.tagDesc}>
                      {courseDetails.duration}
                      {/* {examDetails.sessions[0].start_date.split('T')[0]} */}
                    </Text>
                  </View>
                </View>
                <View style={styles.tagContainer}>
                  <View style={styles.icon}>
                    <DateIcon style={styles.tagIcon} />
                  </View>
                  <View style={{ justifyContent: "flex-start" }}>
                    <Text style={styles.tagTitle}>Student</Text>
                    <Text style={styles.tagDesc}>
                      {courseDetails.enrollment_count.course_enroll_count} students
                      {/* {examDetails.sessions[0].start_date.split('T')[0]} */}
                    </Text>
                  </View>
                </View>
                {/* <View style={styles.flex2}>
                  <Text style={styles.icon}> </Text>
                  <View>
                    <Text style={styles.duration}>Date</Text>
                    <Text style={styles.duration1}>29 Jan,2022</Text>
                  </View>
                </View> */}

              </View>
            </View>
          </View>

          <View style={styles.gap} />
          {/* <View style={styles.main}>
            <View>
              <Text style={styles.p3}>Course  Overview </Text>
            </View>
            <View>
              <Text style={styles.p6}>
                {courseDetails.category}
              </Text>
            </View>
          </View> */}

          <View style={{ height: 100 }}></View>
        </ScrollView>
        <View style={styles.gap} />

        {courseDetails.sessions.length > 0 &&
          <View style={styles.footer}>
            <View style={styles.txt}>
              <Text style={styles.p5}>Get enrollment</Text>
              <Text style={styles.p4}>Enrolls leads you to payment.</Text>
            </View>
            <View>

              <CustomModal
                height="65%"
                button={<View style={styles.sessionbutton}>
                  <Text style={styles.sessiontext}> Choose session</Text>
                </View>}
              >

                <CustomSessionPopup1
                  navigation={props.navigation}
                  changeModalVisible={changeModalVisible}
                />
              </CustomModal>

              {/* <CustomButton
                onPress={handleEnroll}
                type="theme"
                title={'Choose Session'}
                style={styles.button}
                color="white"
              />

              <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                nRequestClose={() => changeModalVisible(true)}>
                <CustomSessionPopup1
                  navigation={props.navigation}
                  changeModalVisible={changeModalVisible} />
              </Modal> */}



            </View>
          </View>}
      </View>
    </>
  );
};
export default CourseOverview;
