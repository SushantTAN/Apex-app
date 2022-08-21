import React, { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions, ScrollView, TouchableOpacity, Button } from "react-native";

import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import CheckIcon from '@assets/images/check.svg';
import styles from '@styles/elements/SubmittingModal.scss';


const SubmittingModal = (props) => {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const showSubmitting = useSelector(state => state.examsReducer.showSubmitting);
  const submitting = useSelector(state => state.examsReducer.submitting);

  return (
    <View>
      <Modal isVisible={showSubmitting}>
        <View style={styles.container}>

          <View style={[styles.headerContainer, { borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }]}>
            <Text style={styles.header}> Submission</Text>
          </View>

          <View style={styles.spinnerContainer}>
            { open && showSubmitting && submitting !== 'submitted'&& <ActivityIndicator

              visible={true}
              overlayColor='rgba(0, 0, 0, 0.2)'
              textStyle={{ color: '#000' }}
              color="#673ab7"
              animation='slide'
              size="large"
              dotRadius={12}
              animating={true}
            />}
            { submitting === 'submitted' && <CheckIcon style={{color : '#673ab7'}}/>}
            <Text style={styles.header}>
              {submitting === 'submitting' && 'Submitting' }
              {submitting === 'auto' && 'Auto Submitting' }
              {submitting === 'submitted' && 'Submitted' }
              </Text>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SubmittingModal