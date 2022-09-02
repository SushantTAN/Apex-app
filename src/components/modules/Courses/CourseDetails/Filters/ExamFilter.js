import React, { useState, Fragment, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import { RadioButton } from 'react-native-paper';

import CustomButton from '@components/elements/CustomButton';
import styles from "@styles/modules/Courses/Filters/ExamFilter.scss";


const ExamFilter = (props) => {
  return <View style={styles.container}>



    {/* <View style={styles.contentContainer}> */}
    <ScrollView contentContainerStyle={styles.category}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity onPress={() => { props.closeModal() }}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHead}>Type</Text>

      <View style={styles.item}>
        <RadioButton
          color="#2E3192"
          value="first"
          status={true ? 'checked' : 'unchecked'}
          onPress={() => { }}
        />
        <Text style={styles.text}>All</Text>
      </View>
      <View style={styles.item}>
        <RadioButton
          color="#2E3192"
          value="second"
          status={false === 'second' ? 'checked' : 'unchecked'}
          onPress={() => { }}
        />
        <Text style={styles.text}>Live</Text>
      </View>
      <View style={styles.item}>
        <RadioButton
          color="#2E3192"
          value="first"
          status={false ? 'checked' : 'unchecked'}
          onPress={() => { }}
        />
        <Text style={styles.text}>Practice</Text>
      </View>
    </ScrollView>

    <View style={styles.buttonsContainer}>
      <CustomButton
        style={[styles.resetButton, { marginRight: 16 }]}
        type="white"
        title={'Reset filter'}
        onPress={() => { }}
        color="#000000"
      />
      <CustomButton
        style={styles.resetButton}
        type="theme"
        title={'Apply filter'}
        onPress={() => { }}
        color="#000000"
      />
    </View>
    {/* </View> */}
  </View>
}

export default ExamFilter;