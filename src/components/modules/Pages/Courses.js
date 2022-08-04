/**
 * This is  page containing the Course and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Course}- returns a module for Course page
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import CustomTextInput from '@apexapp/components/elements/CustomTextInput';
import CustomButtonPopup1 from '@apexapp/components/elements/CustomButtonPopup/index1';
import styles from '@styles/modules/Pages/Courses';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import DateIcon from '@assets/images/date.svg';
import UserIcon from '@assets/images/User.svg';
import TopBar from '@components/elements/TopBar';
import CourseCard from '../CourseCard';
import BackIcon from '@assets/images/back.svg';
import FilterIcon from '@assets/images/Filter.svg'

let information = [
  {
    id: 1,
    name: '',
  },
];

const data = [
  {
    image: '',
    tags:["IOm","Multiple Section"],
    main1: 'Multiple  Section',
    info: 'Medical Entrance (ME-CEE) with multiple line ',
    date: 'Starting on Feb ,2022 (4 month)',
    data: '200+ students enrolled',
  },
  {
    image: '',
    tags:["IOm","Multiple Section"],
    main1: 'Multiple Section',
    info: 'Medical Entrance  (ME-CEE) with multiple line ',
    date: 'Starting on Feb ,2022 (4 month)',
    data: '200+ students enrolled',
  },
];

const Courses = props => {
  const handleArrow = id => {
    props.navigation.navigate('CourseOverview', { test: id });
  };

  return (
    <>
      <ScrollView contentContainerStyle={{paddingBottom:10}} stickyHeaderIndices={[0]} style={styles.scrollView}>
        <TopBar title="Courses" backIcon={ <BackIcon/> } icon={<FilterIcon style={{color:"#000"}}/>} />
        <View style={styles.gap} />
        <View style={styles.mainContainer}>
          <View style={styles.text}>
            {data.map((item, index) => {
              return (
                <>

                 {/* <TouchableOpacity
                  onPress={() => handleArrow(item.id)}
                  style={styles.cards}>
                  <View style={styles.img}>
                    <Image
                      style={styles.image}
                      resizeMode="contain"
                      source={require('@assets/images/course.png')}
                    />
                  </View>
                  <View style={styles.cardContainer}>

                 

                  <View>
                    <View>
                      <Text style={styles.infos}>{item.info}</Text>
                    </View>

                  <View style={styles.tagContainer}>
                  <DateIcon style={styles.icon} width={14} height={14} />
                    <Text style={styles.date}>{item.date}</Text>
                  </View>

                  <View style={styles.tagContainer}>
                    <UserIcon style={styles.icon} width={14} height={14} />
                    <Text style={styles.data}>{item.data}</Text>
                    </View>

                  </View>
                  </View>
                </TouchableOpacity> */}

                <CourseCard tags={item.tags} actionPress={()=> handleArrow(item.id)} date={item.date} name={item.info} numberOfEnroll={item.data} />
                </>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Courses;
