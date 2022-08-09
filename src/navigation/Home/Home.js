import React, { Fragment } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MyStack } from '../AppNavigation';

import Home from '@screens/Pages/Home';
import Exam from '@screens/Pages/Exam';
import ExamDetail from '@screens/Pages/ExamDetail';
import ExamPayment from '@screens/Pages/ExamPayment';
import ExamsResults from '@screens/Exams/ExamsResults';
import TakeExams from '@screens/Exams/Exams';
import SearchBar from '@apexapp/screens/Search/Search';


const HomeRouter = () => {
  return (
    <MyStack.Navigator screenOptions={{ headerShown: false }}>
      <MyStack.Screen name="Home" component={Home} />
      <MyStack.Screen name="Exam" component={Exam} />
      <MyStack.Screen name="ExamDetail" component={ExamDetail} />
      <MyStack.Screen name="ExamPayment" component={ExamPayment} />
      <MyStack.Screen name="TakeExams" component={TakeExams} />
      <MyStack.Screen name="ExamsResults" component={ExamsResults} />
      <MyStack.Screen name="SearchBar" component={SearchBar}/>
    </MyStack.Navigator>
  );
};

export default HomeRouter;
