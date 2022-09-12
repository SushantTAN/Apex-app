import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
// import BackIcon from '@assets/images/back.svg'
import styles from '@styles/elements/TopBar.scss'
import Search from '@assets/images/Search.svg'
import { useNavigation } from '@react-navigation/native'
import SearchBar from '../SearchBar'
// import Filtericon from '@assets/images/Filter.svg'
import CustomModal from '../CustomModal/CustomModal'
import CustomButtonPopup from '../CustomButtonPopup'
const TopBar = (props) => {

    const navigation = useNavigation()


    const { title, icon, backIcon, filterHandler, search = true, searchDesign, newBackIcon, newIcon } = props;



    return (
        <View style={styles.topbar}>
            <View style={styles.topbarContainer}>
                <View style={styles.topbarTextContainer}>
                    <View style={styles.topBarTextHeader} >
                        {backIcon &&
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                                paddingVertical: 5,
                                paddingRight: 8,
                            }}>
                                {backIcon}
                            </TouchableOpacity>

                        }

                        {title && <Text style={styles.topbarHeaderTitle} >{title}</Text>}
                    </View>
                    {icon &&
                        <CustomModal
                            height="60%"
                            button={<View style={styles.button}>
                                {/* <Filtericon style={styles.filter} /> */}
                            </View>}

                        >
                            <CustomButtonPopup
                            // changeModalVisible={changeModalVisible}
                            />
                        </CustomModal>
                        // <TouchableOpacity style={styles.icon} onPress={filterHandler} >
                        //     {icon}
                        // </TouchableOpacity>
                    }
                </View>


            </View>
            {search &&
                <View style={styles.searchContainer}>
                    <SearchBar navigation={navigation} />
                </View>

            }


        </View>
    )
}

export default TopBar
