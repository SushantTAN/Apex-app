/**
 * This is  page containing the Exam and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Exam}- returns a module for Exam
 */

import React, { useEffect, useState } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import CustomButton from '@apexapp/components/elements/CustomButton';
import CustomButtonPopup from '@apexapp/components/elements/CustomButtonPopup';
import CustomTextInput from '@apexapp/components/elements/CustomTextInput';
import { examsFullListRequest } from '@apexapp/store/actions/exam';
import NoteIcon from '@assets/images/note.svg';
import styles from '@styles/modules/Pages/Exam';
import SearchIcon from '@assets/images/Search.svg'
import FilterIcon from '@assets/images/Filter.svg';
import BackIcon from '@assets/images/back.svg';
import ExamCard from '../ExamCard';
import TopBar from '@elements/TopBar/index'

let preparation = [
  {
    id: 1,
    name: '',
  },
];

const data = [
  {
    icon: '',
    title: 'LIVE',
    title1: 'RBB',
    text: 'Loksewa Mock Test - 1',
    amount: `Rs.500 \u2022 60 min`,
  },

  {
    icon: '',
    title: 'LIVE',
    title1: 'RBB',
    text: 'Loksewa Mock Test - 1',
    amount: `Rs.500 \u2022 60 min`,
  },

  {
    icon: '',
    title: 'LIVE',
    title1: 'RBB',
    text: 'Loksewa Mock Test - 1',
    amount: `Rs.500 \u2022 60 min`,
  },
  {
    icon: '',
    title: 'LIVE',
    title1: 'RBB',
    text: 'Loksewa Mock Test - 1',
    amount: `Rs.500 \u2022 60 min`,
  },
  {
    icon: '',
    title: 'LIVE',
    title1: 'RBB',
    text: 'Loksewa sMock Test - 1',
    amount: `Rs.500 \u2022 60 min`,
  },
];

// const dispatch = useDispatch();
// const examsList = useSelector(state => state.examsReducer.examsList);
// const examDetail = useSelector (state => state.examsReducer.examsDetail);

// useEffect(()=>{
// dispatch( examsListRequest ());
//dispatch( examsDetailRequest ());

// },[])


const Exam = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const onChange = item => {
    setSelectedItem(item.id);
    setShow(true);
  };

  const dispatch = useDispatch();
  const examList = useSelector(state => state.examsReducer.examsFullList);
  // console.log('exam lis', examList);

  const handleArrow = () => {
    props.navigation.navigate('Home');
  };

  const handleFilter = () => {
    changeModalVisible(true);
  };

  const handleToDetail = (id) => {
    props.navigation.navigate('ExamDetail', { id: id });
  };

  useEffect(() => {
    dispatch(examsFullListRequest());
  }, []);

  const examCardInfo = [
    { title: "Live" },
    { title: "Practice" },
  ]


  return (
    <View style={styles.maincontainer}>
      <TopBar filterHandler={handleFilter}  icon={<FilterIcon/>} backIcon={<BackIcon />} title="Exams" />
      {/* <View style={styles.filterDiv}>
        <TouchableOpacity onPress={handleArrow} style={styles.left}>
          <BackIcon/>
          <Text style={styles.p}>Exams</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFilter}>
         <FilterIcon/>
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.searchandfilter}>
        <TouchableOpacity style={styles.search}>
        <SearchIcon/>
        </TouchableOpacity>

        <CustomTextInput
          style={styles.CustomTextInput}
          value={selectedItem}
          data={preparation}
          onChange={onChange}
          placeholder="Search here"
          color="#000000"
        /> 

        
      </View> */}

      <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisible(false)}>

          <CustomButtonPopup
            changeModalVisible={changeModalVisible} />
        </Modal>

      <View style={styles.line}></View>

      <ScrollView  nestedScrollEnabled={true} contentContainerStyle={{flexGrow:1,paddingBottom:370}}>
        <View >
          {examList.map((item, index) => {
            return (
              // <TouchableOpacity onPress={() => handleToDetail(item.id)} style={styles.main} key={index}>
              //   <View style={styles.card}>
              //     <View style={styles.icon}>
              //       <NoteIcon style={styles.examIcon}/>
              //     </View>
              //     <Text style={styles.title}>LIVE</Text>
              //     <Text style={styles.title1}>PRACTICE</Text>
              //   </View>

              //   <View>
              //     <Text style={styles.text}>{item.name}</Text>
              //     <Text style={styles.amount}>{item.price}  {'\u2022'}  {item.template.duration} {'\u2022'} 2079-0-11 </Text>
              //   </View>
              // </TouchableOpacity>
                      <ExamCard tags={examCardInfo} name={item.name} actionPress={()=>handleToDetail(item.id)} price={item.price} duration={item.template.duration} handleExamDetailsLink={()=>handleExamDetailsLink(item.id)} />

            );
          })}
        </View>

        <View>
          <CustomButton
            type="white"
            title={'Load More'}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Exam;
