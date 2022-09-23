/**
 * This is a slide for the course Details. This page shows the classes related to selected course.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {MyCourseClasses}- returns a module for Course Classes.
 */

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, StyleSheet, NativeEventEmitter, TouchableOpacity } from 'react-native';

import styles from '@styles/modules/Courses/MyCourseClasses.scss';
import { useSelector } from 'react-redux';
import CourseClassCard from '@apexapp/components/elements/Class/CourseClassCard';
import ZoomUs, { ZoomUsVideoView, ZoomEmitter } from 'react-native-zoom-us';
import { HEIGHT, WIDTH } from '@apexapp/utils/constants';


const MyCourseClasses = props => {
  const [showScreenShare, setShowScreenShare] = useState(false);

  const [meetingOn, setMeetingOn] = useState(false);


  const myCoursesDetails = useSelector(state => state.courseReducer.myCoursesDetails);
  // console.log(",ycourse details", myCoursesDetails.course_enroll.selected_session.meetings);
  const meetings = myCoursesDetails?.course_enroll?.selected_session?.meetings || [];

  const activeConfig = {
    kind: 'active',
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };

  const activeShareConfig = {
    kind: 'active-share',
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };

  const Item = ({ item, index }) => {
    return <View style={{
      width: '50%',
      paddingRight: index % 2 === 0 ? 8 : 0,
      paddingLeft: index % 2 === 0 ? 0 : 8
    }}>
      <CourseClassCard item={item} meetingOn={meetingOn} setMeetingOn={setMeetingOn} />
    </View>;
  };

  const loadSettings = async () => {
    await ZoomUs.connectAudio();
  }

  useEffect(() => {
    // if (!isInitialized) {
    //   return;
    // }

    // For more see https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/EVENTS.md
    const zoomEmitter = new NativeEventEmitter(ZoomEmitter);
    const eventListener = zoomEmitter.addListener(
      'MeetingEvent',
      ({ event, status, ...params }) => {
        console.log({ event, status, params }); //e.g.  "endedByHost" (see more: https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/EVENTS.md)

        if (status === 'MEETING_STATUS_CONNECTING') {
          setMeetingOn(true);
        }

        if (status === 'MEETING_STATUS_DISCONNECTING') {
          // Once it is set it is good to render
          setMeetingOn(false);
        }
      },
    );

    return () => eventListener.remove();
  }, []);

  return (
    <View style={[styles.container, { padding: 0 }]}>

      {/* {
        meetings.map((meeting, meetingIndex) => <Fragment key={meetingIndex}>
          <CourseClassCard item={meeting} />
        </Fragment>)
      } */}
      {!meetingOn && <FlatList
        data={[...meetings]}
        numColumns={2}
        renderItem={Item}
        contentContainerStyle={{}}
        style={{}}
        ItemSeparatorComponent={() => <View style={{ width: 20, height: 16 }} />}
        columnWrapperStyle={{
          justifyContent: "space-between"
        }}
        keyExtractor={(item, index) => index}
      />}



      {/* <View style={{ flex: 1 }}> */}
      {/* {<ZoomUsVideoView
        style={{ width: WIDTH - 32, height: 200 }}
        layout={[
          // The active speaker
          // { kind: 'active', x: 0, y: 0, width: 1, height: 1 },
          showScreenShare ? activeShareConfig : activeConfig,
          // Selfcamera preview
          {
            kind: 'preview',
            // The percent of video view (required)
            x: 0.73,
            y: 0.73,
            width: 1,
            height: 1,
            // Enable border (optional)
            border: true,
            // Disable show user name (optional)
            showUsername: false,
            // Show audio off (optional)
            showAudioOff: true,
            // Background color (optional)
            background: '#ccc',
          },
          // active speaker's share
          // {
          //   kind: 'active-share',
          //   x: 0.73, y: 0.73, width: 0.25, height: 0.20,
          // },
          // // share video
          // {
          //   kind: 'share',
          //   x: 0.73, y: 0.73, width: 0.25, height: 0.20,
          //   // The index of user list (required)
          //   userIndex: 0,
          // },
          // // Specify attendee
          // {
          //   kind: 'attendee',
          //   x: 0.73, y: 0.73, width: 0.25, height: 0.20,
          //   // The index of user list (required)
          //   userIndex: 0,
          // },
          // {
          //   kind: 'attendee',
          //   x: 0.73, y: 0.73, width: 0.25, height: 0.20,
          //   userIndex: 0,
          // },
        ]}
      />} */}
      {/* </View> */}

      {/* <TouchableOpacity onPress={async () => {
        await ZoomUs.leaveMeeting()
      }}>
        <Text>
          Leave
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default MyCourseClasses;
