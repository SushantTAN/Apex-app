/**
 * This is a slide for the classes. This page shows the classes enrolled.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {Classes}- returns a module for Course Classes.
 */

import React, { useEffect, useRef, useState, Fragment } from 'react';
import { FlatList, Text, View, } from 'react-native';

import styles from '@styles/modules/Class/Classes.scss';
import ClassCard from '@apexapp/components/elements/Class/ClassCard';


const Classes = props => {

  const data = [
    { id: 0, title: "test" },
    { id: 1, title: "gggg" },

  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Classes</Text>

      {
        data.map((item, index) => <Fragment key={index}>
          <ClassCard data={item} />
        </Fragment>)
      }
    </View>
  );
};

export default Classes;
