/**
 * This is  page containing the Navbar and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Navbar}- returns a module for navbar
 */

import React, { useState } from 'react';

import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from '@styles/elements/NavBar/Navbar.scss';
import SearchIcon from '@assets/images/Search.svg';
import SearchBar from '../SearchBar';
import CustomTextInput from '@apexapp/components/elements/CustomTextInput';

let preparation = [
  {
    id: 1,
    name: '',
  },
];

const NavBar = props => {
  const { searchHandler, value } = props ;
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const onChange = item => {
    setSelectedItem(item.id);
    setShow(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('@assets/images/apexLogo.png')}
        />
        {/* <View style={styles.flex}>

          <TouchableOpacity style={styles.search}>
            <Image
              style={styles.searchicon}
              source={require('@assets/images/search-interface-symbol.png')}
            />
          </TouchableOpacity>

          <CustomTextInput
            style={styles.CustomTextInput}
            data={preparation}
            onChange={onChange}
            placeholder="Search here"
            color="#000000"
          />
        </View> */}
        <SearchBar navigation={props.navigation} value={value} searchHandler={searchHandler} style={styles.homeSearch}/>
      </View>
    </>
  );
};

export default NavBar;
