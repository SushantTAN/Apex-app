import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import SearchBar from '@components/elements/SearchBar';
import TopBar from '@components/elements/TopBar';
import ExamCard from '@apexapp/components/elements/ExamCard/index';
import BackIcon from '@assets/images/back.svg'
import FilterIcon from '@assets/images/Filter.svg'
import SearchIcon from '@assets/images/Search.svg';
import { useSelector, useDispatch } from 'react-redux';
import { examsListRequest } from '@apexapp/store/actions/exam';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CustomButton from '@apexapp/components/elements/CustomButton';
import { WIDTH } from '@apexapp/utils/constants';
import styles from '@styles/modules/Pages/Search.scss'
import CourseCard from '@apexapp/components/elements/CourseCard';
import { coursesEntranceRequest } from '@apexapp/store/actions/home';



const Search = (props) => {

  const { navigation, route } = props;
  const query = route.params.query
  const CarouselRef = useRef(null);

  const examCardInfo = [
    { title: "Live" },
    { title: "Practice" },
  ]

  const data = [
    {
      image: '',
      tags: ["IOm", "Multiple Section"],
      main1: 'Multiple  Section',
      info: 'Medical Entrance (ME-CEE) with multiple line ',
      date: 'Starting on Feb ,2022 (4 month)',
      data: '200+ students enrolled',
    },
    {
      image: '',
      tags: ["IOm", "Multiple Section"],
      main1: 'Multiple Section',
      info: 'Medical Entrance  (ME-CEE) with multiple line ',
      date: 'Starting on Feb ,2022 (4 month)',
      data: '200+ students enrolled',
    },
  ];


  const dispatch = useDispatch()
  const examsList = useSelector(state => state.examsReducer.examsList)
  const coursesList = useSelector(state => state.homeReducer.coursesList)
  console.log(coursesList, "listtt")


  const [searchValue, setSearchValue] = useState(query)
  const [activeSlide, setActiveSlide] = useState(0);



  const searchHandler = (value) => {
    setSearchValue(value)
  }

  const handleArrow = id => {
    props.navigation.navigate('CourseOverview', { test: id });
  };

  const handleExamDetailsLink = (id) => {
    props.navigation.navigate('ExamDetail', { id });
  };


  useEffect(() => {
    dispatch(examsListRequest(searchValue))
    dispatch(coursesEntranceRequest(searchValue))
  }, [searchValue])

  const _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <>

        <ExamCard tags={examCardInfo} name={item.name} price={item.price} duration={item.template.duration} actionPress={() => handleExamDetailsLink(item.id)} />
      </>
    );
  };


  return (
    <View style={styles.searchContainer}>
      <View style={styles.topbar}>

        <View style={styles.search}>

          <TouchableOpacity style={{ marginRight: 8 }} onPress={() => navigation.goBack()} >
            <BackIcon />
          </TouchableOpacity>



          <SearchBar searchHandler={searchHandler} value={searchValue} style={{ flex: 1 }} navigation={props.navigation} />
          {/* <TextInput onChangeText={searchHandler}
                    value={searchText}
                    placeholder="Search here"
                    placeholderTextColor="#000"
                style={styles.searchInput} /> */}


          <TouchableOpacity style={{ marginLeft: 8 }} >
            <FilterIcon />
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.searchMainContainer}>
        <ScrollView style={{ height: "88%" }}>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <View style={styles.txt}>
                <Text style={styles.p}>Exams</Text>
              </View>
              <Carousel
                ref={CarouselRef}
                data={examsList.results}
                renderItem={_renderItemWithParallax}
                sliderWidth={WIDTH}
                itemWidth={WIDTH}
                onSnapToItem={index => setActiveSlide(index)}
              />

              <View style={styles.paginationContainers}>
                <Pagination
                  dotsLength={examsList.results.length}
                  activeDotIndex={activeSlide}
                  containerStyle={styles.pagiStyle}
                  dotColor={'#2E3192'}
                  dotStyle={[
                    styles.pagiDot,
                    { width: WIDTH / examsList.results.length - 20 },
                  ]}
                  inactiveDotColor={'#EAEAEA'}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={1}
                  inactiveDotStyle={[
                    styles.inactDotStyle,
                    { width: WIDTH / examsList.results.length - 20 },
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

          <View style={styles.container}>
            <View style={styles.textContainer}>
              <View style={styles.txt}>
                {/* <Text style={styles.p}>Courses</Text> */}
              </View>
              {data.map((item, index) => {
                return (
                  <>

                    {/* <TouchableOpacity
                  onPress={() => handleArrow(item.id)}
                  style={styles.cards}>
                  <View style={styles.img}>
                    <Image
                      style={styles.image}
                      resizeMode="contain"
                      source={require('@assets/images/course.png')}
                    />
                  </View>
                  <View style={styles.cardContainer}>

                 

                  <View>
                    <View>
                      <Text style={styles.infos}>{item.info}</Text>
                    </View>

                  <View style={styles.tagContainer}>
                  <DateIcon style={styles.icon} width={14} height={14} />
                    <Text style={styles.date}>{item.date}</Text>
                  </View>

                  <View style={styles.tagContainer}>
                    <UserIcon style={styles.icon} width={14} height={14} />
                    <Text style={styles.data}>{item.data}</Text>
                    </View>

                  </View>
                  </View>
                </TouchableOpacity> */}

                    {/* <CourseCard tags={item.tags} actionPress={() => handleArrow(item.id)} date={item.date} name={item.info} numberOfEnroll={item.data} /> */}
                  </>
                );
              })}
            </View>
          </View>

        </ScrollView>
      </View>

    </View>
  )
}

export default Search
