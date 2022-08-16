import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '@styles/modules/CourseCard.scss'
import DateIcon from '@assets/images/date.svg';
import UserIcon from '@assets/images/User.svg';
import Tag from '@components/elements/Tag';

const CourseCard = (props) => {

  const { name, tags, actionPress, date, numberOfEnroll } = props;

  return (

    <TouchableOpacity
      onPress={actionPress}
      style={styles.cards}>
      <View style={styles.img}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('@assets/images/course.png')}
        />
      </View>
      <View style={styles.cardContainer}>


        <View style={styles.card}>
          {tags.length > 0 && tags.map((tag, index) => {
            return (
              <Tag key={index} title={tag} />
            )
          })}
        </View>

        <View>
          <View>
            <Text style={styles.infos}>{name}</Text>
          </View>

          <View style={styles.tagContainer}>
            <DateIcon style={styles.icon} width={14} height={14} />
            <Text style={styles.data}>{date}</Text>
          </View>

          <View style={styles.tagContainer}>
            <UserIcon style={styles.icon} width={14} height={14} />
            <Text style={styles.data}>{numberOfEnroll}</Text>
          </View>

        </View>
      </View>
    </TouchableOpacity>

  )
}

export default CourseCard
