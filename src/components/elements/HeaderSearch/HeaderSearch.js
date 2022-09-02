/**
 * This is  page containing the HeaderSearch and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {HeaderSearch}- returns a module for HeaderSearch
 */

import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Modal } from 'react-native';

import { CommonActions } from '@react-navigation/native';

import CustomButtonPopup1 from '@apexapp/components/elements/CustomButtonPopup/index1';
import CustomTextInput from '@apexapp/components/elements/CustomTextInput';
import styles from '@styles/elements/HeaderSearch/HeaderSearch.scss';
import Filtericon from '@assets/images/Filter.svg'
import BackIcon from '@assets/images/back.svg'
import CustomModal from '../CustomModal/CustomModal';

let information = [
  {
    id: 1,
    name: '',
  },
];

const HeaderSearch = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };
  const handlefilter = () => {
    changeModalVisible(true);
  };

  const onChange = () => {
    props.searchfunc();
  };

  // const backnav = () => {
  //   props.navigation.navigate(props.backnav);
  // };

  const handleArrow = () => {
    props.navigation.dispatch(CommonActions.goBack());
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.filterDiv}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleArrow} >
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.p} >
              {props.title}
            </Text>
          </View>
          {/* <Filtericon/> */}

          {/* {props.showFilterButton ? (
            <TouchableOpacity onPress={handlefilter}>
              <Filtericon />
            </TouchableOpacity>
          ) : null} */}

          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            nRequestClose={() => {
              changeModalVisible(false);
            }}>
            <CustomButtonPopup1 changeModalVisible={changeModalVisible} />
          </Modal> */}

          <CustomModal
            height="60%"
            button={<Filtericon />}
          >
            {props.filterComponent ? props.filterComponent : <CustomButtonPopup1 changeModalVisible={changeModalVisible} />}
          </CustomModal>
        </View>

        <View style={styles.searchandfilter}>
          {props.showSearchButton ? (
            <>
              <TouchableOpacity style={styles.search}>
                <Image
                  style={styles.searchicon}
                  source={require('@assets/images/search-interface-symbol.png')}
                />
              </TouchableOpacity>
              <CustomTextInput
                style={styles.CustomTextInput}
                data={information}
                onChange={onChange}
                placeholder="Search here"
                color="#000000"
              />
            </>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default HeaderSearch;
