import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from '@styles/elements/CourseClassCard.scss';
import ZoomMeeting from '@apexapp/components/modules/Pages/zoomMeeting';



const CourseClassCard = (props) => {
  const { item } = props;

  const navigation = useNavigation();

  const handlePress = () => {

  }

  return <View style={[styles.container, { ...props.style }]} onPress={handlePress}>
    <View style={styles.imageContainer}>
      <Image
        source={require('@assets/images/Frame3.png')}
        style={styles.image}
      />
    </View>
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.duration}>{item.duration}</Text>
        <Text style={styles.title}>{item.topic}</Text>
      </View>
      <ZoomMeeting meetingId={item.meeting_id} password={item.password} topic={item.topic} />
    </View>
  </View>
}

export default CourseClassCard;