/**
 * This is a component containing the contents of the Resourse card.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {ResourcesCard}- returns a module for Resources card.
 */

import React, { useState } from 'react';

import { Image, Text, TouchableOpacity, View } from 'react-native';

import BookIcon from '@assets/images/BookIcon.svg';
import styles from '@styles/elements/ResourcesCard.scss';

const ResourcesCard = props => {

  return (
    <View key={props.noteIndex} style={styles.noteItem}>
      <View style={styles.iconContainer}>
        <BookIcon />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text>DOWNLOAD</Text>
      </View>
    </View>
  );
};

export default ResourcesCard;
