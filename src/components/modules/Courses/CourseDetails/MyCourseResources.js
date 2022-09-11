/**
 * This is a slide for the course Details. This page shows the vides, books, pdfs etc. related to selected course.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {MyCourseResources}- returns a module for Course Resources.
 */

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, } from 'react-native';

// import BookIcon from '@assets/images/BookIcon.svg';
import styles from '@styles/modules/Courses/MyCourseResources.scss';
import { useSelector } from 'react-redux';
import ResourcesCard from '@apexapp/components/elements/ResourceCard';


const MyCourseResources = props => {

  const myCourseDetails = useSelector(state => state.courseReducer.myCoursesDetails);


  return (
    <ScrollView style={styles.container}>
      {/* <Text>Course Resources</Text> */}

      {
        myCourseDetails.notes.map((note, noteIndex) => <Fragment key={noteIndex}><ResourcesCard
          noteIndex={noteIndex}
          item={note}
        />
        </Fragment>
        )
      }
    </ScrollView>
  );
};

export default MyCourseResources;
