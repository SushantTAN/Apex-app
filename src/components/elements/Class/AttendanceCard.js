import React from "react";
import { View, Image, Text } from "react-native";

import styles from '@styles/elements/AttendanceCard.scss';
import CustomButton from "../CustomButton";
import SuccessIcon from '@assets/images/CheckCircle.svg';

const AttendanceCard = (props) => {
  return <View style={styles.container}>
    <View style={{flexDirection: 'row'}}>
      <SuccessIcon style={{ color: "#fff" }} />
      <View style={styles.contentContainer}>
        <Text style={styles.date}>July 11, 2022</Text>
        <Text style={styles.status}>Class Attended</Text>
      </View>

      
    </View>

    <Text style={styles.videos}>Watch Videos</Text>
  </View>
}

export default AttendanceCard;