/**
 * This is another profilepopup Component

 * @param{Function} props.onPress - function to execute on pressing

 * @returns{CustomProfilePopup1}- returns a reset popup Component
 */

import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import CustomButton from '@apexapp/components/elements/CustomButton';
import styles from '@styles/elements/CustomProfilePopup';

const CustomProfilePopup1 = props => {
  const handlereset = () => {
    props.changeModalVisible1(false);
    props.navigation.navigate('VerifyNumber');
  };

  const closeModal = bool => {
    props.changeModalVisible1(bool);
  };
  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.flex1}>
          <Text style={styles.title}>Reset Password</Text>
          <TouchableOpacity onPress={() => closeModal(false, 'Cancel')}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.line}></Text>
        </View>
        <View>
          <Text style={styles.head}>Do you want to reset your password?</Text>
        </View>
        <View>
          <Text style={styles.subhead}>
            You will be redirect to reset password process.
          </Text>
        </View>

        <CustomButton
          onPress={handlereset}
          style={styles.CustomButton}
          type="theme"
          title={'Reset'}
          color="#ffffff"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomProfilePopup1;
