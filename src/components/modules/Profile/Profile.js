/**
 * This is  page containing the profile and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Profile}- returns a module for profile of the user
 */
import React, { useState } from 'react';

import { View, Image, TouchableOpacity, Modal, Text } from 'react-native';

import CustomButton from '@apexapp/components/elements/CustomButton';
import CustomProfilePopup from '@apexapp/components/elements/CustomProfilePopup';
import CustomProfilePopup1 from '@apexapp/components/elements/CustomProfilePopup/index1';
import CustomProfilePopup2 from '@apexapp/components/elements/CustomProfilePopup/index2';
import styles from '@styles/modules/Profile/Profile';
import EditIcon from '@assets/images/Edit.svg';
import ResetIcon from '@assets/images/Lock.svg';
import LogoutIcon from '@assets/images/Logout.svg'
import { useSelector } from 'react-redux';

const data = {
  name: 'Suman Panday',
  number: '+977-9801202348',
  gmail: 'abc@gmail.com',
};

const Profile = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const auth = useSelector(state => state.authReducer.user);
  // console.log(auth);

  const changeModalVisible2 = bool => {
    setIsModalVisible2(bool);
  };

  const handleEditInfo = () => {
    changeModalVisible2(true);
  };

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const handlelogout = () => {
    changeModalVisible(true);
  };

  const changeModalVisible1 = bool => {
    setIsModalVisible1(bool);
  };

  const handlereset = () => {
    changeModalVisible1(true);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.head}>Profile</Text>
        <View style={styles.gap} />
        <View style={styles.img}>
          <Image source={require('@assets/images/ProfileDefault.jpg')} style={{ width: 80, height: 80 }} />

          <View style={styles.txt}>
            <View>
              <Text style={styles.name}>{auth.full_name}</Text>
              <Text style={styles.number}>{auth.username}</Text>
              <Text style={styles.gmail}>{auth.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.gap} />
        <View style={styles.div}>
          <Text style={styles.p}>Your preference</Text>
          <View style={styles.card}>
            <Text style={styles.title1}>Loksewa</Text>
            <Text style={styles.title2}>Banking</Text>
          </View>
        </View>
        <View style={styles.gap} />
        <View style={styles.buttons}>
          {/* <CustomButton
            onPress={handleEditInfo}
            // type="theme"
            title={'Edit info'}
            style={styles.button}
            color="white"
            icon={<EditIcon style={styles.icon} />}
          />
          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible2}
            nRequestClose={() => changeModalVisible2(true)}>
            <CustomProfilePopup2
              data={data}
              changeModalVisible2={changeModalVisible2}
            />
          </Modal> */}
          <CustomButton
            onPress={handlelogout}
            // type="theme"
            title={'Logout'}
            style={styles.button}
            color="white"
            icon={<LogoutIcon style={styles.icon} />}
          />

          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            nRequestClose={() => changeModalVisible(true)}>
            <CustomProfilePopup
              data={data}
              navigation={props.navigation}
              changeModalVisible={changeModalVisible}
            />
          </Modal>
          <CustomButton
            onPress={handlereset}
            // type="theme"
            title={'Reset password?'}
            style={styles.button}
            color="white"
            icon={<ResetIcon style={styles.icon} />}
          />

          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible1}
            nRequestClose={() => changeModalVisible1(true)}>
            <CustomProfilePopup1
              navigation={props.navigation}
              data={data}
              changeModalVisible1={changeModalVisible1}
            />
          </Modal>
        </View>
        <View style={styles.footer}></View>
      </View>
    </>
  );
};
export default Profile;
