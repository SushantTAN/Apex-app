import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
// import BackIcon from '@assets/images/back.svg'
import styles from '@styles/elements/TopBar.scss'
import Search from '@assets/images/Search.svg'
import { useNavigation } from '@react-navigation/native'

const TopBar = ( props ) => {

    const navigation = useNavigation()

    const [searchValue, setSearchValue] = useState('')

    console.log(searchValue, "search")

    const { title, icon, backIcon, filterHandler, search=true } = props;

    return (
        <View style={styles.topbar}>
            <View style={styles.topbarContainer}>
                <View style={styles.topbarTextContainer}>
                    { backIcon && 
                    <TouchableOpacity onPress={()=> navigation.goBack() } >
                        {backIcon}
                    </TouchableOpacity>
                    
                    }
                    {title && <Text style={styles.topbarHeaderTitle} >{title}</Text>}
                </View>
                { icon &&  
                <TouchableOpacity onPress={filterHandler} >
                    { icon }
                </TouchableOpacity>
                }

            </View>
            { search &&  
            <View style={styles.searchbar}>
                <Search />
                <TextInput onChangeText={setSearchValue}
                    value={searchValue}
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    style={styles.searchInput} />
            </View>
            }
        </View>
    )
}

export default TopBar
