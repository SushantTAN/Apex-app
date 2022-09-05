/**
 * This is  page containing the Exams and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Exams}- returns a module for Exams
 */

import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, useWindowDimensions } from 'react-native';

import RenderHtml from 'react-native-render-html';
import { RadioButton } from 'react-native-paper';
// import { WebView } from 'react-native-webview';

// import HTMLView from 'react-native-htmlview';

import CustomButton from '@apexapp/components/elements/CustomButton';
import HeaderSearch from '@apexapp/components/elements/HeaderSearch/HeaderSearch';
import { HEIGHT } from '@apexapp/utils/constants';
import { PATCH } from '@utils/api';
import styles from '@styles/modules/Exams/Exams.scss';
import { submitExam, takeExamDetailRequest } from '@apexapp/store/actions/exam';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@apexapp/store/actions/loading';





const getIndex = (index) => {
  switch (index) {
    case 0:
      return 'a.';

    case 1:
      return 'b.';

    case 2:
      return 'c.';

    case 3:
      return 'd.';

    default:
      return 'a.';
  }
}

var ansGlobal = {
  question_states: [],
  submitted: true,
};

const TakeExamsWithPerPage = props => {
  const { id, enrollId } = props.route.params;
  const width = useWindowDimensions().width;

  const [checkedList, setCheckedList] = useState([]);
  const [answers, setAnswers] = useState({
    question_states: [],
    submitted: true,
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  const [page, setpage] = useState(0);
  const [queList, setQueList] = useState([]);

  const [timer, setTimer] = useState("00:00:00");


  const details = useSelector(state => state.examsReducer.takeExamDetails);
  const auth = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  console.log("taking exams page,", typeof (details?.template?.display_num_questions));


  const checklistInit = (list) => {
    // console.log(list)
    let templist = [];
    list.forEach((el, index) => {
      templist.push(0);
    })

    setCheckedList(templist);
  }

  const handleSubmit = () => {
    console.log("before function submit answers", ansGlobal);
    dispatch(submitExam(details.exam_enroll, { ...ansGlobal }, auth.access_token, props.navigation.navigate, id, props.navigation))
  }

  const findIfSelected = (que, option) => {
    let test = answers.question_states.find(el => el.question === que && el.selected_option === option);
    console.log("test", test);
    if (test) {
      return 'checked';
    } else {
      return 'unchecked';
    }
  }

  const getIndexOfQuestion = (question) => {
    let test = details.questions.indexOf(question);
    return test + 1;
  }

  useEffect(() => {
    console.log(typeof (details?.template?.display_num_questions))

    if (details?.template?.display_num_questions) {
      setQueList(details.questions.slice(page, page + details.template.display_num_questions));
    }
  }, [details?.template?.display_num_questions, page]);

  useEffect(() => {
    setCheckedList([]);
    const subscribe = props.navigation.addListener('focus', () => {
      setCheckedList([]);
      dispatch(takeExamDetailRequest(id, auth.access_token, checklistInit, answers, setAnswers, setCurrentQuestion));
    });

    return subscribe;
  }, []);




  //for setting timer
  useEffect(() => {
    var timer;

    if (details.exam_enroll.selected_session.end_date !== '') {
      let endTime = (new Date(details.exam_enroll.selected_session.end_date).getTime() - 1000 * 30);
      // console.log(endTime - 1000 * 30);

      timer = setInterval(() => {
        let currentTime = new Date().getTime();

        let diff = Math.floor((endTime - currentTime) / 1000);

        // console.log("aaaa", diff, currentTime, endTime);

        let test = new Date(diff * 1000).toISOString().slice(11, 19);

        if (diff > 0) {
          setTimer(test);
        }

        if (diff === 1) {
          clearInterval(timer);
          handleSubmit();
        }
      }, 1000);

    }

    const subscribe = props.navigation.addListener('focus', () => {
      // if (details.exam_enroll.selected_session.end_date !== '') {
      //   let endTime = new Date(details.exam_enroll.selected_session.end_date).getTime();

      //   timer = setInterval(() => {
      //     let currentTime = new Date().getTime();

      //     let diff = Math.floor((endTime - currentTime) / 1000);

      //     console.log("aaaa", diff, currentTime, endTime);

      //     let test = new Date(diff * 1000).toISOString().slice(11, 19);

      //     setTimer(test);

      //     if (diff === 0) {
      //       clearInterval(timer);
      //       handleSubmit();
      //     }
      //   }, 1000);

      // }
    });

    const unsubscribe = props.navigation.addListener('blur', () => {
      clearInterval(timer);
    });

    return () => {
      subscribe;
      unsubscribe;
    };

  }, [details, props.navigation]);

  return (
    <>
      <ScrollView stickyHeaderIndices={[0]} style={styles.maincontainer} >
        {console.log("answers", answers)}
        <View style={styles.main}>
          <HeaderSearch
            title={details.name}
            navigation={props.navigation}
            backnav="Exam"
          />

          <View style={styles.card}>
            <Text style={styles.title1}>LIVE {timer}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.text5}>

            <Fragment>

              {/* <View style={styles.img}>
                <Text style={styles.num}>{currentQuestion + 1}.</Text>

                <View style={{}}>
                  {details?.questions[currentQuestion]?.img && <Image
                    style={[styles.image, { height: HEIGHT * 0.2, width: HEIGHT * 0.2 }]}
                    source={{ uri: details?.questions[currentQuestion]?.img }}
                  />}
                  <View style={styles.txt}>

                    <RenderHtml
                      contentWidth={width}
                      baseStyle={styles.text}
                      source={{ html: details?.questions[currentQuestion]?.detail }}
                    />

                  </View>
                </View>
              </View>

              {
                details?.questions[currentQuestion]?.options.map((item, index) => <View key={index} style={styles.txt1}>
                  <RadioButton
                    color="#2E3192"
                    style={styles.radi01}
                    value={item.id}
                    status={checkedList[currentQuestion] === item.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      // setChecked(item.id);

                      //to display selected dots.
                      let tempCheck = [...checkedList];
                      tempCheck[currentQuestion] = item.id;
                      setCheckedList(tempCheck);


                      setAnswers(prevState => {
                        let tempAnswers = { ...prevState };
                        let findArray = tempAnswers.question_states.find(el => {
                          // console.log("el", el.question)
                          return el.question === details?.questions[currentQuestion].id
                        });
                        // console.log("findArray", findArray);
                        if (findArray) {
                          let itemIndex = 0;
                          tempAnswers.question_states.forEach((itemTemp, indexTemp) => {
                            // console.log(itemTemp.question, indexTemp);
                            if (itemTemp.question === findArray.question) {
                              itemIndex = indexTemp;
                            }
                          });
                          tempAnswers.question_states[itemIndex].selected_option = item.id

                          // console.log("g", itemIndex);

                        } else {
                          // console.log("f")
                          tempAnswers.question_states.push({
                            question: details?.questions[currentQuestion]?.id,
                            selected_option: item.id,
                          });
                        }

                        ansGlobal = tempAnswers;

                        return tempAnswers;

                      });
                    }}
                  />

                  <Text style={styles.a}>{getIndex(index)}</Text>

                  <RenderHtml
                    contentWidth={width}
                    baseStyle={styles.text1}
                    source={{ html: item.detail }}
                  />

                </View>
                )} */}

              {/* <Text style={styles.hint}>SHOW HINTS</Text> */}

              {
                queList.map((question, queIndex) =>
                  <Fragment key={queIndex}>
                    <View style={styles.img} >
                      <Text style={styles.num}>{getIndexOfQuestion(question)}.</Text>

                      <View style={{}}>
                        {question.img && <Image
                          style={[styles.image, { height: HEIGHT * 0.2, width: HEIGHT * 0.2 }]}
                          source={{ uri: question.img }}
                        />}
                        <View style={styles.txt}>

                          <RenderHtml
                            contentWidth={width}
                            baseStyle={styles.text}
                            source={{ html: question.detail }}
                          />

                        </View>
                      </View>
                    </View>

                    {
                      question.options.map((option, optionIndex) => <View key={optionIndex} style={styles.txt1}>
                        <RadioButton
                          color="#2E3192"
                          style={styles.radi01}
                          value={option.id}
                          status={findIfSelected(question.id, option.id)}
                          onPress={() => {
                            // setChecked(option.id);

                            //to display selected dots.
                            let tempCheck = [...checkedList];
                            tempCheck[currentQuestion] = option.id;
                            setCheckedList(tempCheck);


                            setAnswers(prevState => {
                              let tempAnswers = { ...prevState };
                              let findArray = tempAnswers.question_states.find(el => {
                                // console.log("el", el.question)
                                return el.question === question.id
                              });
                              // console.log("findArray", findArray);
                              if (findArray) {
                                let itemIndex = 0;
                                tempAnswers.question_states.forEach((itemTemp, indexTemp) => {
                                  // console.log(itemTemp.question, indexTemp);
                                  if (itemTemp.question === findArray.question) {
                                    itemIndex = indexTemp;
                                  }
                                });
                                tempAnswers.question_states[itemIndex].selected_option = option.id

                                // console.log("g", itemIndex);

                              } else {
                                // console.log("f")
                                tempAnswers.question_states.push({
                                  question: question.id,
                                  selected_option: option.id,
                                });
                              }

                              ansGlobal = tempAnswers;

                              return tempAnswers;


                            });
                          }}
                        />

                        <Text style={styles.a}>{getIndex(optionIndex)}</Text>

                        <RenderHtml
                          contentWidth={width}
                          baseStyle={styles.text1}
                          source={{ html: option.detail }}
                        />

                      </View>
                      )}
                  </Fragment>)
              }
            </Fragment>

          </View>
        </View>
        <View style={{ height: HEIGHT * 0.15 }}></View>
        <View style={styles.gap}></View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.txts}>
          <Text style={styles.fottertext}>Questions</Text>
          <Text style={styles.fottertexts}>{currentQuestion + 1}/{Math.ceil(details.questions.length / details?.template?.display_num_questions)}</Text>
        </View>
        <View style={styles.nextContainer}>
          {/* {currentQuestion > 0 && <CustomButton
             type="theme"
             title={'Previous'}
             onPress={() => {
               if (currentQuestion - 1 > -1) {
                 setCurrentQuestion(prevState => prevState - 1);
                 setCurrentQuestionId(details?.questions[currentQuestion - 1].id)
               }
             }}
 
             style={styles.button}
             color="white"
             font-size="600"
           />} */}
          {currentQuestion + 1 !== Math.ceil(details.questions.length / details?.template?.display_num_questions) && <CustomButton
            type="theme"
            title={'Next'}
            onPress={async () => {
              if (currentQuestion + 1 <= details.questions.length) {
                try {
                  dispatch(setLoading(true));
                  // console.log("data", { ...answers, submitted: false });
                  const response = await PATCH('api/enrollments/exam/submit/' + details.exam_enroll.id, { ...answers, submitted: false }, auth.access_token);
                  // console.log("submit exma", response)
                  const resJson = await response.json();
                  // console.log("submit exam", resJson)
                  if (response.status === 200) {

                  }
                  if (response.status === 400) {
                  }
                } catch (error) {
                  console.log('err', error);
                }
                dispatch(setLoading(false));
                setCurrentQuestion(prevState => prevState + 1);
                setCurrentQuestionId(details?.questions[currentQuestion + 1].id);
                setpage(prevState => prevState + details?.template?.display_num_questions);
              }
            }}
            style={styles.button}
            color="white"
            font-size="600"
          />}

          {currentQuestion + 1 === Math.ceil(details.questions.length / details?.template?.display_num_questions) && <CustomButton
            type="theme"
            title={'Submit'}
            onPress={handleSubmit}
            style={styles.button}
            color="white"
            font-size="600"
          />}
        </View>
      </View>

    </>
  );
};

export default TakeExamsWithPerPage;
