import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import Search from '@assets/images/Search.svg'
import styles from '@styles/elements/SearchBar'

const SearchBar = ( props ) => {

const { searchHandler, value } = props ;

console.log(props.navigation,"navigation")

const onSubmitEditing = () => {
    if (value) {
    props.navigation.navigate("SearchBar",{ query:value })
    }
}

    return (
        <View style={{...styles.searchbar,...props.style}}>
        <Search  />
        <TextInput onChangeText={searchHandler}
            value={value}
            onSubmitEditing={onSubmitEditing}
            placeholder="Search here"
            placeholderTextColor="#000"
            style={styles.searchInput} />
    </View>
    )
}

export default SearchBar
