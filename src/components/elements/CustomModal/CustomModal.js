/**
 * This is a dropdown Component
 * @param {String} props.type - type of button
 * @param {Function} props.onPress - function to execute on pressing
 * @param {String} props.title - text to display in button
 * @returns {CustomDropdown}- returns a Dropdown Component
 */

import React, { useState, Children, isValidElement, cloneElement, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import Modal from 'react-native-modal';

import styles from '@styles/elements/CustomModal.scss';
import { useNavigation, useRoute } from '@react-navigation/native';

const CustomModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleBackdropPress = () => {
    setOpen(false);
  }

  const handleButtonPress = () => {
    setOpen(true);
  }

  const navigation = useNavigation();
  // const route = useRoute();
  // console.log(route);

  useEffect(() => {
    // console.log("test running")
    // setOpen(false);

    const unsubscribe = navigation.addListener('blur', () => {
      setOpen(false);
    });

    return () => {
      unsubscribe;
    };
  }, 
  []);

  return (
    <View>
      <TouchableOpacity onPress={handleButtonPress}>
        {props.button}
      </TouchableOpacity>
      <Modal
        isVisible={open}
        onBackdropPress={handleBackdropPress}
        onBackButtonPress={handleBackdropPress}
        style={{
          margin: 0,
          // marginTop: HEIGHT / 2,
          // height:300,
          // minHeight:'30%',
          // position: 'absolute',
          // bottom: 0,
          // left: 0,
          // width: '100%',
          // height: '50%'
        }}
      >
        <View style={[styles.container, { height: props.height }]}>

          {/* {props.children} */}

          {
            Children.map(props.children, (child, index) => {
              if (!isValidElement(child)) return null;

              return cloneElement(child, {
                ...child.props,
                closeModal: handleBackdropPress
              })
            })
          }

        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
