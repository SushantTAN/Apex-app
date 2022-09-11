/**
 * This is a template for Class screen. It contains all the modules used in this template.
 * @param {Object} props - contains all the propeties of react navigation received from screens.
 * @returns {ClassPage}- returns a template
 */

import React, { useState, Fragment } from 'react';
import { ScrollView, View } from 'react-native';

// import { useBottomTabBarHeight } from '@react-navigation/material-bottom-tabs';

import styles from '@styles/templates/Class.scss';
import TabItem from '../elements/TabItem';
import TopBar from '../elements/TopBar';
import Classes from '../modules/Class/Classes';
import Attendance from '../modules/Class/Attendance';
import QR from '../modules/Class/Qr';
import { HEIGHT } from '@apexapp/utils/constants';



// const tabBarHeight = useBottomTabBarHeight();

const ClassPage = props => {
  const [activeScreen, setActiveSceen] = useState(0);

  const renderModule = () => {
    switch (activeScreen) {
      case 0:
        return <Classes {...props} />;
      case 1:
        return <Attendance {...props} />;
      case 2:
        return <QR {...props} />;
      default:
        return null;
    }
  }

  const headerData = [
    { id: 0, name: 'Classes' },
    { id: 1, name: 'Attendance' },
    { id: 2, name: 'QR' },
  ];

  return <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{minHeight: HEIGHT - 55}}>
    <View style={styles.headerContainer}>
      <TopBar title="Class" backIcon={<View></View>} search={false} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ backgroundColor: 'white', paddingHorizontal: 16, marginBottom: 8 }}>
        {
          headerData.map((item, index) =>
            <Fragment key={index}>
              <TabItem title={item.name} id={item.id} callback={setActiveSceen} selectedId={activeScreen} />
            </Fragment>
          )
        }
      </ScrollView>
    </View>

    {renderModule()}
  </ScrollView >;
};

export default ClassPage;
