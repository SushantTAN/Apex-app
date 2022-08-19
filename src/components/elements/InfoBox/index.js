import React from 'react'
import { View, Text } from 'react-native'
import styles from '@styles/elements/InfoBox.scss'

const InfoBox = ( props ) => {

    const { icon, title, desc } = props ;

    return (
        <View style={styles.infoBox}>
                <View style={styles.icon}>
                { props.icon }
                </View>
                <View>
                  <Text style={styles.infoTitle}>{title}</Text>
                  <Text style={styles.infoDesc}>
                    {/* {examDetails.sessions[0].start_date.split('T')[0]} */}
                    {desc}
                  </Text>
                </View>
              </View>
    )
}

export default InfoBox
