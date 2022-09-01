/**
 * This is a template for my courses details. It contains all the modules used in this template to show enrolled course details.
 * @param {Object} props - contains all the propeties of react navigation received from screens.
 * @returns {MyCourseDetailsPage}- returns a course details template to ssho details of course.
 */
import React, { useState, Fragment, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import HeaderSearch from '../elements/HeaderSearch/HeaderSearch';
import MyCourseClasses from '../modules/Courses/CourseDetails/MyCourseClasses';
import MyCourseExams from '../modules/Courses/CourseDetails/MyCourseExams';
import MyCourseOverview from '@modules/Courses/CourseDetails/MyCourseOverView';
import MyCourseResources from '@modules/Courses/CourseDetails/MyCourseResources';
import styles from '@styles/templates/MyCourseDetails.scss';
import TopBar from '../elements/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { myCourseDetailRequest } from '@apexapp/store/actions/course';


const TabItem = (props) => {

  const handleTouch = () => {
    props.callback(props.id);
  }

  return <TouchableOpacity onPress={handleTouch} style={props.id === props.selectedId ? styles.selecetdTabItem : styles.tabItem}>
    <Text style={props.id === props.selectedId ? styles.tabTextSelected : styles.tabText}>{props.title}</Text>
  </TouchableOpacity>
}

const MyCourseDetailsPage = props => {

  const [activeScreen, setActiveSceen] = useState(0);

  const data = [
    { id: 0, name: 'Overview' },
    { id: 1, name: 'Exams' },
    { id: 2, name: 'Class' },
    { id: 3, name: 'Resources' },
  ]

  const renderModule = () => {
    switch (activeScreen) {
      case 0:
        return <MyCourseOverview {...props} />;
      case 1:
        return <MyCourseExams {...props} />;
      case 2:
        return <MyCourseClasses {...props} />;
      case 3:
        return <MyCourseResources {...props} />;
    }
  }

  const myCourseDetails = useSelector(state => state.courseReducer.myCoursesDetails);
  const dispatch = useDispatch();

  const fetchData = () => {
    // console.log(props.route.params)
    dispatch(myCourseDetailRequest(props.route.params.id));
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return <View style={styles.container}>
    {/* <HeaderSearch
      title={'My Course Details'}
      navigation={props.navigation}
    // backnav="Exam"
    /> */}
    <TopBar title={myCourseDetails.name} backIcon={<View></View>} search={false} />

    <ScrollView horizontal contentContainerStyle={{ backgroundColor: 'white', paddingHorizontal: 16 }}>
      {
        data.map((item, index) =>
          <Fragment key={index}>
            <TabItem title={item.name} id={item.id} callback={setActiveSceen} selectedId={activeScreen} />
          </Fragment>
        )
      }
    </ScrollView>

    {renderModule()}
  </View>;
};

export default MyCourseDetailsPage;
