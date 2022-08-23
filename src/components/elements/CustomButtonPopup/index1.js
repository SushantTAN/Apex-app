/**
 * This is another filterpopup Component
 
 * @param {Function} props.onPress - function to execute on pressing

 * @returns {CustomButtonPopup1}- returns another filter popup Component
 */

import React, { useState } from 'react';

import CustomButton from '../CustomButton';
import styles from '@styles/elements/CustomButtonPopup1.scss';

import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const CustomButtonPopup1 = (props) => {

    const [checked1, setChecked1] = useState();

    const closeModal = bool => {
        props.changeModalVisible(bool);
    };

    const handlefilter = bool => {
        closeModal(true);
        props.changeModalVisible(bool);
    };
    const handlereset = () => {

        setChecked1(null);
    };
    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.flex1}>
                    <Text style={styles.title}>Filter</Text>
                    <TouchableOpacity
                        onPress={() => props.closeModal(false, 'Cancel')}>
                        <Text style={styles.close}>Close</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.line}></Text>



                <View>
                    <Text style={styles.category}>Category</Text>
                    <View style={styles.category1}>
                        <View style={styles.flex3}>
                            <RadioButton
                                color="#2E3192"
                                value="first"
                                status={checked1 === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked1('first')}
                            />
                            <Text style={styles.category2}>Entrance preparation</Text>
                        </View>
                        <View style={styles.flex3}>
                            <RadioButton
                                color="#2E3192"
                                value="second"
                                status={checked1 === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked1('second')}
                            />
                            <Text style={styles.category3}>Loksewa preparation</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.flex2}>
                    <CustomButton
                        style={styles.CustomButton1}
                        type="white"
                        title={'Reset filter'}
                        onPress={handlereset}
                        color="#000000"

                    />
                    <CustomButton
                        style={styles.CustomButton2}
                        type="theme"
                        title={'Apply filter'}
                        onPress={handlefilter}
                        color="#ffffff"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButtonPopup1;
