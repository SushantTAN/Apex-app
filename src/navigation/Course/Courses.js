import React, { Fragment } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MyStack } from '../AppNavigation';

import Courses from '@screens/Pages/Courses';
import CourseOverview from '@screens/Pages/CourseOverview';
import CoursePayment from '@screens/Pages/CoursePayment';
import MyCourseDetails from '@screens/Courses/MyCourseDetails';
import MyCourses from '@components/modules/Courses/MyCourses';
import CustomZoomUI from '@apexapp/components/modules/ZoomUI/CustomZoomUi';


const CoursesRouter = () => {
  return (
    <MyStack.Navigator screenOptions={{ headerShown: false }}>
      <MyStack.Screen name="MyCourses" component={MyCourses} />
      <MyStack.Screen name="MyCourseDetails" component={MyCourseDetails} />


      <MyStack.Screen name="Courses" component={Courses} />
      <MyStack.Screen name="CourseOverview" component={CourseOverview} />
      <MyStack.Screen name="CoursePayment" component={CoursePayment} />

      <MyStack.Screen name="CustomZoomUI" component={CustomZoomUI} />


    </MyStack.Navigator>
  );
};

export default CoursesRouter;
