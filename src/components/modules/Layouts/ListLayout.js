/**
 * This is a component containing a list with load more feature.
 * @param {Object} props.navigation - contains all the propeties of react navigation
 * @returns {Exams}- returns a module for Exams
 */

import { errorAlert } from '@utils/functions';
import { GET } from '@utils/api';
import React, { Fragment, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import CustomButton from '@apexapp/components/elements/CustomButton';
import styles from '@styles/modules/Layouts/ListLayout.scss';
import { useDispatch } from 'react-redux';
import { setLoading } from '@apexapp/store/actions/loading';
import ExamCard from '@apexapp/components/elements/ExamCard';
import { useNavigation } from '@react-navigation/native';

const ListLayout = (props) => {
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchData = async (url) => {
    try {
      dispatch(setLoading(true));
      // console.log("url", url)
      const response = await GET(`api/exams/list/?page=${page}&page_size=${limit}`);
      // console.log("exam list response", response)

      const resJson = await response.data;
      // console.log("exam list", resJson)

      if (resJson) {
        dispatch(setLoading(false));
        setList(resJson.results);
        setCount(resJson.count);
        // return resJson.results;
      }
      if (response.status === 400) {
      }
    } catch (error) {
      console.log('err', error);
      errorAlert("Error Occured", "Please try again.");

    }
    dispatch(setLoading(false));

  }

  const handleLoadMore = async () => {
    if (list.length !== count) {
      try {
        dispatch(setLoading(true));
        // let newpage = prevState
        // console.log("url", `api/exams/list/?page=${(page + 1)}&page_size=${limit}`)
        const response = await GET(`api/exams/list/?page=${(page + 1)}&page_size=${limit}`);
        // console.log("exam list response", response)

        const resJson = await response.data;
        // console.log("exam list", resJson)

        if (resJson) {
          dispatch(setLoading(false));
          // return resJson.results;
          setList(prevlist => [...prevlist, ...resJson.results]);
          setCount(resJson.count);
        }
        if (response.status === 400) {
        }

      } catch (error) {
        console.log('err', error);
        errorAlert("Error Occured", "Please try again.");

      }
      dispatch(setLoading(false));


      setPage(prevState => {
        return prevState + 1
      })
    }
  }

  useEffect(() => {
    // const callData = async () => {
    fetchData();
    // setList(testlist);
    // }

    // callData();

  }, []);

  const examCardInfo = [
    { title: "Live" },
    { title: "Practice" },
  ]

  const handleToDetail = (id) => {
    navigation.navigate('ExamDetail', { id: id });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }


  return <ScrollView
    nestedScrollEnabled={true}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >

    {list.map((item, index) => {
      return (
        <Fragment key={index}>
          <ExamCard status={item.status} tags={examCardInfo} name={item.name} actionPress={() => handleToDetail(item.id)} price={item.price} duration={item.template.duration} handleExamDetailsLink={() => handleExamDetailsLink(item.id)} />
        </Fragment>
      );
    })}

    {count !== list.length && <CustomButton
      type="white"
      title={'Load More'}
      style={styles.button}
      onPress={handleLoadMore}
    />}
  </ScrollView>
}

export default ListLayout;