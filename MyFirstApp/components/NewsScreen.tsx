import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import axios from 'axios';

const GetNews = ({
  newsObject,
  navigation,
}: {
  newsObject: any;
  navigation: any;
}) => {
  if (newsObject) {
    return (
      <View style={styles.newsContainer}>
        <Text style={styles.newsHeader}>Latest News</Text>
        <ScrollView style={{flex: 1}}>
          {newsObject.articles.map((element: any) => {
            return (
              <Pressable
                key={element.title}
                style={styles.newsArticle}
                onPress={() => {
                  navigation.navigate('NewsDetails', {element});
                }}>
                <Text style={styles.articleText}>{element.title}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  } else {
    return <Text>No news or loading news...</Text>;
  }
};

const NewsScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=04590fb6ca404953aa035c85580659a8`;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await axios(url, {
          signal: abortController.signal,
        });
        if (result.status === 200) {
          setIsLoading(false);
          setNews(result.data);
          return;
        } else {
          throw new Error('Could not fetch data');
        }
      } catch (error) {
        if (abortController.signal.aborted) {
          console.log('Data fetching cancelled');
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading && !hasError && (
        <GetNews newsObject={news} navigation={navigation}></GetNews>
      )}
      <View style={styles.homeBtnDiv}>
        <Pressable style={styles.homeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Home</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  newsContainer: {
    marginTop: 20,
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: 350,
  },
  newsHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  homeBtnDiv: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  homeBtn: {
    backgroundColor: 'lightgrey',
    width: 150,
    height: 100,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  newsArticle: {
    marginTop: 20,
    paddingBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  articleText: {
    fontSize: 15,
    color: 'black',
  },
});

export default NewsScreen;
