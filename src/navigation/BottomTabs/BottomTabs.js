import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '@apexapp/screens/Pages/Home';
import HomePage from '@screens/Pages/Home';
import HomeRouter from '../Home/Home';
import CoursesRouter from '../Course/Courses';
import Profile from '@apexapp/screens/Profile/Profile';
import ProfileRouter from '../Profile/Profile';
import HomeIcon from '@assets/images/Home.svg'
import ActiveHome from '@assets/images/Activehome.svg'
import CoursesIcon from '@assets/images/Courses.svg'
import ActiveCoursesIcon from '@assets/images/activeCourses.svg'
import NotificationIcon from '@assets/images/Notification.svg'
import ProfileIcon from '@assets//images/User.svg'
import ActiveProfileIcon from '@assets//images/activeUser.svg'
import TopBar from '@components/elements/TopBar';
import DateIcon from '@assets/images/date.svg';
import BackIcon from '@assets/images/back.svg';

const Tab = createMaterialBottomTabNavigator();

const deviceWidth = Dimensions.get('screen').width;

/**
 * Consists of layout for getStarted screen with three slider sections
 * slider sections imported from data/onBoarding returning array of object of image, title and short desc
 * @returns {AppIntroSlider, View} If slider is completed it gives onBoarding sections while if it is completed it goes on to next layout
 *
 **/

const BottomTabs = props => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#252775"
      inactiveColor="gray"
      shifting={false}
      barStyle={{
        backgroundColor: 'white',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeRouter}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              // <Image  source={require('@assets/images/homeActive.png')} />
              <ActiveHome />
            ) :
              (
                <HomeIcon />
              ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesRouter}
        options={{
          tabBarLabel: 'MY COURSES',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ActiveCoursesIcon />
            ) : (
              <CoursesIcon />
            ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={TabTest}
        options={{
          tabBarLabel: 'NOTIFICATION',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <NotificationIcon style={{ color: "#252775" }} />
            ) : (
              <NotificationIcon style={{ color: "#909090" }} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileRouter}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ActiveProfileIcon />
              // <Image source={require('@assets/images/profileInactive.png')} />
            ) : (
              // <Image source={require('@assets/images/profileInactive.png')} />
              <ProfileIcon style={{ color: "#909090" }} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabTest = () => {
  return <>
    <TopBar title="Notifications" backIcon={<BackIcon />} search={false} />
    <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'OpenSans-SemiBold', padding: 16, fontSize: 16, }}>No notifications</Text>
    </View>
  </>;
};

const styles = StyleSheet.create({
  activeDotStyle: {
    bottom: -28,
    width: 30,
  },
  centerAlign: {
    alignItems: 'center',
  },
  dotStyle: {
    bottom: -28,
  },
  renderItem: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    alignSelf: 'stretch',
    resizeMode: 'stretch',
  },
});

export default BottomTabs;
