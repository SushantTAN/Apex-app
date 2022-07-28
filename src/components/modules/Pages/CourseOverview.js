/**
 * This is  page containing the CourseOverview and other components of the Courses.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {CourseOverview}- returns a module for course overviews
 */

import React, { useState } from 'react';
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
import DateIcon from '@assets/images/date.svg'

const CourseOverview = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const handleEnroll = () => {
    changeModalVisible(true);
  };
  const handleBack = () => {
    props.navigation.dispatch(CommonActions.goBack());
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <HeaderSearch
          title="Courses Details"
          navigation={props.navigation}
          backnav="Courses"
        />

        <View style={styles.gap} />

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
                source={require('@assets/images/home.jpeg')}
              />
            </View>
            <View>
              <Text style={styles.p1}>Engineering Entrance (IOE)</Text>
            </View>
            <View>
              <Text style={styles.p7}>
                Apex Education Academy (AEA) has been offering various
                Career-oriented Entrance Preparation Courses including Medical
                and Engineering Preparation asince two decades.
              </Text>
            </View>
            <View style={styles.examDetail}>
              <View style={styles.flex1}>
              <View style={styles.tagContainer}>
                <View style={styles.icon}>
                  <DateIcon style={styles.tagIcon} />
                </View>
                <View style={{justifyContent:"flex-start"}}>
                  <Text style={styles.tagTitle}>Starting Date</Text>
                  <Text style={styles.tagDesc}>
                  Multiple session
                    {/* {examDetails.sessions[0].start_date.split('T')[0]} */}
                  </Text>
                </View>
              </View>

              <View style={styles.tagContainer}>
                <View style={styles.icon}>
                  <DateIcon style={styles.tagIcon} />
                </View>
                <View style={{justifyContent:"flex-start"}}>
                  <Text style={styles.tagTitle}>Duration</Text>
                  <Text style={styles.tagDesc}>
                    4 month
                    {/* {examDetails.sessions[0].start_date.split('T')[0]} */}
                  </Text>
                </View>
              </View>

              <View style={styles.tagContainer}>
                <View style={styles.icon}>
                  <DateIcon style={styles.tagIcon} />
                </View>
                <View style={{justifyContent:"flex-start"}}>
                  <Text style={styles.tagTitle}>Student</Text>
                  <Text style={styles.tagDesc}>
                    200+ student
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
          <View style={styles.main}>
            <View>
              <Text style={styles.p3}>Course  Overview </Text>
            </View>
            <View>
              <Text style={styles.p6}>
                Apex Education Academy (AEA) has been offering various
                Career-oriented Entrance Preparation Courses including Medical
                and Engineering Preparation asince two decades.
              </Text>
            </View>
          </View>

          <View style={{ height: 100 }}></View>
        </ScrollView>
        <View style={styles.gap} />
        <View style={styles.footer}>
          <View style={styles.txt}>
            <Text style={styles.p5}>Get enrollment</Text>
            <Text style={styles.p4}>Enrolls leads you to payment.</Text>
          </View>
          <View>
            <CustomButton
              onPress={handleEnroll}
              type="theme"
              title={'Enroll now'}
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
            </Modal>
          </View>
        </View>
      </View>
    </>
  );
};
export default CourseOverview;
