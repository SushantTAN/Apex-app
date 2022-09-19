import React from 'react'
import { View, Text } from 'react-native'
import styles from '@styles/elements/Tag.scss';

const Tag = (props) => {

    const { title } = props;

    let color = '';
    // console.log(title)
    switch (title) {
        case "LIVE":
            color = "#F4777C"
            break;
        case "Happening now":
            color = "#F4777C"
            break;

        case "practice":
            color = '#EAEAEA'
            break;
        case "practice exam":
            color = '#EAEAEA'
            break;
        case 'multiple section':
            color = "#F4777C"

        default:
            color = "#EAEAEA"

    }


    return (
        <View style={{ ...styles.tagContainer, backgroundColor: color }} >
            <Text style={styles.tag} > {props.title} </Text>
        </View>
    )
}

export default Tag
