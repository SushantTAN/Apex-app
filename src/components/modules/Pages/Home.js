/**
 * This is  page containing the Home and other components of the organization.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Home}- returns a module for Home
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
  Alert,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import NoteIcon from '@assets/images/note.svg'

import CustomButton from '@apexapp/components/elements/CustomButton';
import {
  coursesEntranceRequest,
  examLiveRequest,
  examPracticeRequest,
} from '@apexapp/store/actions/home';
import NavBar from '@apexapp/components/elements/Navbar/Navbar';
import styles from '@styles/modules/Pages/Home.scss';
import { WIDTH } from '@apexapp/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import ExamCard from '../ExamCard';
import { examsFullListRequest, examsListRequest } from '@apexapp/store/actions/exam';
import { useFocusEffect } from '@react-navigation/native';
import { errorAlert, getDuration } from '@apexapp/utils/functions';
import { logout, refreshToken } from '@apexapp/store/actions/auth';
import Entrancepic from "@assets/images/Entrance.svg";
import Loksewapic from "@assets/images/Loksewa.svg";


const Home = props => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [activeSlides, setActiveSlides] = useState(0);

  const [activeSlidess, setActiveSlidess] = useState(0);

  const [activeSlidesss, setActiveSlidesss] = useState(0);

  const [data, setData] = useState([
    {
      file: '',
      title: 'Live',
      title1: 'RBB',
      text: 'Loksewa Mock Test - 1',
      amount: `Rs.500 \u2022   60 min`,
    },
    {
      file: '',
      title: 'Live',
      title1: 'RBB',
      text: 'Loksewa Mock Test - 1',
      amount: `Rs.500 \u2022  60 min`,
    },
    {
      file: '',
      title: 'Live',
      title1: 'RBB',
      text: 'Loksewa Mock Test - 1',
      amount: `Rs.500 \u2022 60 min`,
    },
    {
      file: '',
      title: 'Live',
      title1: 'RBB',
      text: 'Loksewa Mock Test - 1',
      amount: `Rs.500 \u2022  60 min`,
    },
    {
      file: '',
      title: 'Live',
      title1: 'RBB',
      text: 'Loksewa Mock Test - 1',
      amount: `Rs.500 \u2022 60 min`,
    },
  ]);

  const dispatch = useDispatch();
  const examsLiveList = useSelector(state => state.homeReducer.examsLiveList);
  const examsPracticeList = useSelector(state => state.homeReducer.examsPracticeList,);
  const coursesList = useSelector(state => state.homeReducer.coursesList);
  const auth = useSelector(state => state.authReducer);


  const [refreshing, setRefreshing] = useState(false);

  const [searchText, setSearchText] = useState('')

  const CarouselRef = useRef(null);
  const CarouselReff = useRef(null);
  const CarouselRefff = useRef(null);
  const CarouselReffff = useRef(null);

  useEffect(() => {
    dispatch(examLiveRequest());
    dispatch(examPracticeRequest());
    dispatch(coursesEntranceRequest());
  }, []);

  useFocusEffect(
    React.useCallback(async () => {
      // console.log("use focus effect dahsboard")
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          // errorAlert("Hold on!", "Are you sure you want to go back?");
          Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        },
      );

      const unsubscribe = props.navigation.addListener('blur', () => {
        backHandler.remove();
      });
      return unsubscribe;
    }, [props.route]),
  );

  const handleExamDetailsLink = (id) => {
    props.navigation.navigate('ExamDetail', { id });
  };

  const examCardInfo = [
    { title: "Live" },
    { title: "Practice" },
  ]

  const searchHandler = (value) => {

    setSearchText(value)
  }

  useEffect(() => {
    var timer;

    console.log(getDuration(auth.access_token_expiration))

    timer = setInterval(() => {
      // if (getDuration(auth.refresh_token_expiration) > 5) {
      console.log("test timer");
      dispatch(refreshToken(auth));
      // }
      // else{
      // dispatch(logout(props.navigation));
      // }
    }, (getDuration(auth.access_token_expiration) - 5) * 1000);
  }, []);



  const _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <>

        <ExamCard tags={examCardInfo} name={item.name} price={item.price} duration={item.template.duration} actionPress={() => handleExamDetailsLink(item.id)} />
      </>
    );
  };
  const _renderItemWithParallax1 = ({ item, index }, parallaxProps) => {
    return (
      <>
        {/* <TouchableOpacity activeOpacity={1} onPress={handleExamDetailsLink} style={styles.cards}>
          <View style={styles.card}>
            <View style={styles.file}>
            <NoteIcon style={styles.icon} />
            </View>

            <Text style={styles.title1}>Practice </Text>
          </View>

          <View>
            <Text style={styles.text}>{item.name}</Text>

            <Text style={styles.amount}>
              Rs. {item.price}
              {' \u2022'} {item.template.duration}
            </Text>
          </View>
        </TouchableOpacity> */}
        <ExamCard tags={examCardInfo} name={item.name} price={item.price} duration={item.template.duration} actionPress={() => handleExamDetailsLink(item.id)} />

      </>
    );
  };
  const _renderItemWithParallax2 = ({ item, index }, parallaxProps) => {
    return (
      <>
        {/* {console.log(item)} */}
        <View style={styles.cards}>
          <View style={styles.img}>
            <Image
              style={styles.image}
              source={require('@assets/images/home.jpeg')}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.main}>IOM </Text>

            <Text style={styles.main1}>Multiple Session</Text>
          </View>

          <View>
            <View>
              <Text style={styles.info}>{item.name}</Text>
            </View>

            <Text style={styles.date}>{item.date}</Text>

            <Text style={styles.data}>{item.data}</Text>
          </View>
        </View>
        {/* <ExamCard tags={examCardInfo} name={item.name} price={item.price} duration={item.template.duration} actionPress={() => handleExamDetailsLink(item.id)} /> */}

      </>
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(examLiveRequest());
    await dispatch(examPracticeRequest());
    await dispatch(coursesEntranceRequest());
    setRefreshing(false);
  }

  // console.log(searchText, "search")


  return (
    <>
      <View style={styles.division}>
        <View styles={styles.navbar}>
          <NavBar navigation={props.navigation} value={searchText} searchHandler={searchHandler} />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 180 }} style={styles.scrollView} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View>
            <View style={styles.gap} />
            <View style={styles.txt}>
              <Text style={styles.p}>Live exams</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Carousel
                  ref={CarouselRef}
                  data={examsLiveList.results}
                  renderItem={_renderItemWithParallax}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH}
                  onSnapToItem={index => setActiveSlide(index)}
                />

                <View style={styles.paginationContainers}>
                  <Pagination
                    dotsLength={examsLiveList.results.length}
                    activeDotIndex={activeSlide}
                    containerStyle={styles.pagiStyle}
                    dotColor={'#2E3192'}
                    dotStyle={[
                      styles.pagiDot,
                      { width: WIDTH / examsLiveList.results.length - 20 },
                    ]}
                    inactiveDotColor={'#EAEAEA'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={1}
                    inactiveDotStyle={[
                      styles.inactDotStyle,
                      { width: WIDTH / examsLiveList.results.length - 20 },
                    ]}
                    carouselRef={CarouselRef}
                    tappableDots={!!CarouselRef}
                  />
                </View>
                <CustomButton
                  type="white"
                  onPress={() => {
                    props.navigation.navigate('Exam');
                  }}
                  title={'Explore all'}
                  style={styles.button}
                  color="#000000"
                />
              </View>
            </View>
          </View>
          <View>
            <View style={styles.gap} />

            {/* <View style={styles.div}>
              <View style={styles.txt}>
                <Text style={styles.p}>Practice exams</Text>
              </View>
              <View style={styles.textContainer}>
                <Carousel
                  ref={CarouselReff}
                  data={examsPracticeList.results}
                  renderItem={_renderItemWithParallax1}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH}
                  onSnapToItem={index => setActiveSlides(index)}
                />
                <View style={styles.paginationContainers}>
                  <Pagination
                    dotsLength={examsPracticeList.results.length}
                    activeDotIndex={activeSlides}
                    containerStyle={[styles.pagiStyle]}
                    dotColor={'#2E3192'}
                    dotStyle={[
                      styles.pagiDot,
                      { width: WIDTH / examsPracticeList.results.length - 20 },
                    ]}
                    inactiveDotColor={'#EAEAEA'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={1}
                    inactiveDotStyle={[
                      styles.inactDotStyle,
                      { width: WIDTH / examsPracticeList.results.length - 20 },
                    ]}
                    carouselRef={CarouselReff}
                    tappableDots={!!CarouselReff}
                  />
                </View>
                <CustomButton
                  type="white"
                  onPress={() => {
                    props.navigation.navigate('Exam');
                  }}
                  title={'Explore all'}
                  style={styles.button}
                  color="#000000"
                />
              </View>
            </View> */}
          </View>
          <View style={styles.gap} />

          <View style={styles.div}>
            <View>
              <View style={styles.txt}>
                <Text style={styles.p}>Entrance preparation</Text>
              </View>

              <View style={styles.div1}>
                <View style={styles.textContainer}>
                  {/* <Carousel
                    ref={CarouselRefff}
                    data={coursesList.results}
                    renderItem={_renderItemWithParallax2}
                    sliderWidth={WIDTH}
                    itemWidth={WIDTH}
                    onSnapToItem={index => setActiveSlidess(index)}
                  />
                  <View style={styles.paginationContainez}>
                    <Pagination
                      dotsLength={coursesList.results.length}
                      activeDotIndex={activeSlidess}
                      containerStyle={styles.pagiStyle}
                      dotColor={'#2E3192'}
                      dotStyle={styles.pagiDot}
                      inactiveDotColor={'#EAEAEA'}
                      inactiveDotOpacity={0.4}
                      inactiveDotScale={1}
                      inactiveDotStyle={styles.inactDotStyle}
                      carouselRef={CarouselRefff}
                      tappableDots={!!CarouselRefff}
                    />
                  </View> */}
                  {/* <CustomButton
                    type="white"
                    title={'Explore all'}
                    style={styles.button}
                    color="#000000"
                  /> */}
                  <Image
                    style={{
                      margin: 16,
                      width: WIDTH - 32,
                      borderRadius: 8,
                      height: 120,
                    }}
                    source={require("@assets/images/entrance2x.png")}
                  />
                  {/* <Text style={{ fontFamily: 'OpenSans-SemiBold', padding: 16, fontSize: 16 }}>Coming Soon</Text> */}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.gap} />

          <View style={styles.div}>
            <View>
              <View style={styles.txt}>
                <Text style={styles.p}>Loksewa preparation</Text>
              </View>

              <View style={styles.div1}>
                <View style={styles.textContainer}>
                  {/* <Carousel
                    ref={CarouselReffff}
                    data={data2}
                    renderItem={_renderItemWithParallax2}
                    sliderWidth={WIDTH}
                    itemWidth={WIDTH}
                    onSnapToItem={index => setActiveSlidesss(index)}
                  />
                  <View style={styles.paginationContainez}>
                    <Pagination
                      dotsLength={data.length}
                      activeDotIndex={activeSlidesss}
                      containerStyle={styles.pagiStyle}
                      dotColor={'#2E3192'}
                      dotStyle={styles.pagiDot}
                      inactiveDotColor={'#EAEAEA'}
                      inactiveDotOpacity={0.4}
                      inactiveDotScale={1}
                      inactiveDotStyle={styles.inactDotStyle}
                      carouselRef={CarouselReffff}
                      tappableDots={!!CarouselReffff}
                    />
                  </View> */}

                  {/* <CustomButton
                    type="white"
                    title={'Explore all'}
                    style={styles.button}
                    color="#000000"
                  /> */}
                  <Image
                    style={{
                      margin: 16,
                      width: WIDTH - 32,
                      borderRadius: 8,
                      height: 120,
                    }}
                    source={require("@assets/images/loksewa2x.png")}
                  />
                  {/* <Text style={{ fontFamily: 'OpenSans-SemiBold', padding: 16, fontSize: 16 }}>Coming Soon</Text> */}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.gap} />

        </ScrollView>
      </View>
    </>
  );
};

export default Home;
