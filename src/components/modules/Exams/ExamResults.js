import React, { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions, ScrollView } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from 'react-native-paper';
import RenderHTML from "react-native-render-html";

import HeaderSearch from "@components/elements/HeaderSearch/HeaderSearch";
import styles from '@styles/modules/Exams/ExamResults.scss';
import CustomButton from "@apexapp/components/elements/CustomButton";
import ShowHints from "@apexapp/components/elements/ShowHints/ShowHints";
import { HEIGHT } from "@apexapp/utils/constants";


const getIndex = (index) => {
  switch (index) {
    case 0:
      return 'a. ';

    case 1:
      return 'b. ';

    case 2:
      return 'c. ';

    case 3:
      return 'd. ';

    default:
      return 'a. ';
  }
}


const ExamResults = (props) => {

  const width = useWindowDimensions().width;

  const [questionsInPage, setQuestionsInPage] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const dispatch = useDispatch();
  // const examDetails = useSelector(state => state.examsReducer.examDetail);
  const auth = useSelector(state => state.authReducer);
  const result = useSelector(state => state.examsReducer.examResult);


  const handleNext = () => {
    if ((page + perPage) < result?.exam?.questions?.length) {
      setPage(prevState => prevState + perPage);
    }
  }
  const handlePrevious = () => {
    if ((page - perPage) >= 0) {
      setPage(prevState => prevState - perPage);
    }
  }

  const getSelectedTrue = (question, option) => {
    let currentQueState = {};

    currentQueState = result.question_states.find(el => el.question === question.id);

    if ((option.id === currentQueState?.selected_option)) {
      if (option.correct) {
        return 'selected-true';
      }
      return 'selected-false';
    }
    else {
      if (option.correct) {
        return 'unselected-true';
      }
      return 'unselected-false';
    }
  }

  const getOptionColor = (question, option) => {
    switch (getSelectedTrue(question, option)) {
      case 'selected-true':
        return ['green', styles.selectedOption];
      case 'selected-false':
        return ['red', styles.incorrectSelectedOption];

      case 'unselected-true':
        return ['green', styles.selectedOption];
      case 'unselected-false':
        return ['black', styles.option];
    }
  }


  useEffect(() => {
    setQuestionsInPage(result.exam.questions.slice(page, page + perPage));

  }, [page]);

  return <ScrollView stickyHeaderIndices={[0]}>
    <View>
      <HeaderSearch
        title={result?.exam?.name}
        navigation={props.navigation}
      // backnav="Exam"
      />
      {/* <View style={styles.overviewContainer}><Text>Overview</Text></View> */}
    </View>


    <View style={styles.questionsContainer}>
      <View style={styles.gap}></View>
      {
        questionsInPage.map((question, questionIndex) => <React.Fragment key={questionIndex}>

          <View key={questionIndex} style={styles.questionItem}>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.index}>{questionIndex + 1}.</Text>
              {question.img && <Image
                style={{ height: HEIGHT * 0.2, width: HEIGHT * 0.2 }}
                source={{ uri: question.img }}
              />}


              <RenderHTML
                contentWidth={width}
                baseStyle={styles.question}
                source={{ html: question.detail }}
              />
            </View>

            {question.options.map((option, optionIndex) => <View key={optionIndex} style={getOptionColor(question, option)[1]}>
              <RadioButton
                color={getOptionColor(question, option)[0]}
                style={styles.radio}
                value={'test'}
                status={['selected-true', 'selected-false', 'unselected-true'].includes(getSelectedTrue(question, option)) ? 'checked' : 'unchecked'}
                onPress={() => { }}
              />
              {/* <Text style={styles.a}>{getIndex(optionIndex)}  </Text> */}
              <RenderHTML
                contentWidth={width}
                baseStyle={styles.optionText}
                source={{ html: `<p>${getIndex(optionIndex)}&nbsp;</p>` }}
              />
              <RenderHTML
                contentWidth={width}
                baseStyle={styles.optionText}
                source={{ html: option.detail }}
              />
              {/* <Text>{option.detail}</Text> */}
            </View>)}

            <ShowHints data={question.feedback} />






          </View>
          <View style={styles.gap}></View>
        </React.Fragment>)
      }
      <View style={styles.buttonContainer}>
        {(page - perPage) >= 0 && <CustomButton
          style={{ marginRight: 16, flex: 1 }}
          type="theme"
          title={'Previous'}
          onPress={handlePrevious}
        // color="#000000"
        />}
        {(page + perPage) < result?.exam?.questions?.length && <CustomButton
          style={{ flex: 1 }}
          type="theme"
          title={'Next'}
          onPress={handleNext}
        // color="#000000"
        />}
      </View>
    </View>

  </ScrollView>
}

export default ExamResults