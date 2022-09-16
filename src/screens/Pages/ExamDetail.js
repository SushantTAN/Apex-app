import React from 'react';

import { View } from 'react-native';

import ExamDetailPage from '@apexapp/components/templates/ExamDetail';

const ExamDetail = props => {
    return (
        <View style={{ flex: 1 }}>
            <ExamDetailPage {...props} />
        </View>
    );
};

export default ExamDetail;
