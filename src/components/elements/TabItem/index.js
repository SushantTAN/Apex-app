import React from "react";
import { TouchableOpacity, Text } from "react-native";

import styles from '@styles/elements/TabItem.scss';


const TabItem = (props) => {

  const handleTouch = () => {
    props.callback(props.id);
  }

  return <TouchableOpacity onPress={handleTouch} style={props.id === props.selectedId ? styles.selecetdTabItem : styles.tabItem}>
    <Text style={props.id === props.selectedId ? styles.tabTextSelected : styles.tabText}>{props.title}</Text>
  </TouchableOpacity>
}

export default TabItem;