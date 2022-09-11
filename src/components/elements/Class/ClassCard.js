import React from "react";
import { View, Image, Text } from "react-native";

import styles from '@styles/elements/ClassCard.scss';
import CustomButton from "../CustomButton";
import VideoCamera from '@assets/images/VideoCamera.svg';

const ClassCard = (props) => {
  return <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        source={require('@assets/images/Frame3.png')}
        style={styles.image}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>Live 00:01:30</Text>
      </View>
    </View>

    <View style={styles.contentContainer}>
      <Text style={styles.date}>17 Feb, 2022</Text>

      <Text style={styles.title} numberOfLines={2}>Title goes here</Text>

      <CustomButton
        style={styles.joinButton}
        type="red"
        icon={<VideoCamera />}
        title={'Join now'}
        onPress={() => { }}
      // color="#000000"
      />
    </View>
  </View>
}

export default ClassCard;