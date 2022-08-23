import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
// import BackIcon from '@assets/images/back.svg'
import styles from '@styles/elements/TopBar.scss'
import Search from '@assets/images/Search.svg'
import { useNavigation } from '@react-navigation/native'
import SearchBar from '../SearchBar'
import Filter from "@assets/images/Filter.svg";
import CustomModal from '../CustomModal/CustomModal'
import CustomButtonPopup1 from '../CustomButtonPopup/index1'

const TopBar = (props) => {

    const navigation = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false);


    const { title, icon, backIcon, filterHandler, search = true, searchDesign, newBackIcon, newIcon } = props;
    const changeModalVisible = bool => {
        setIsModalVisible(bool);
    };


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
                            height="50%"
                            button={<View style={styles.button}>
                                <Filter style={styles.filter} />
                            </View>}

                        >
                            <CustomButtonPopup1
                                changeModalVisible={changeModalVisible}
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
                    <SearchBar />
                </View>

            }


        </View>
    )
}

export default TopBar
