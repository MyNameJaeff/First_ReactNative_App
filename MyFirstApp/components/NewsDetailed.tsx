import React from 'react';
import {Text, StyleSheet, View, Pressable, Image, ScrollView} from 'react-native';

const NewsDetailed = ({navigation, route}: {navigation: any; route: any}) => {
  let element = route.params.element;

  return (
    <View style={styles.container}>
      <View style={styles.newsDiv}>
        <View style={styles.newsHeader}>
          <Text style={styles.header}>{element.title}</Text>
        </View>
        <ScrollView style={styles.newsContent}>
          <Text style={styles.content}>{element.content}</Text>
          {element.urlToImage ? (
            <Image
              source={{uri: element.urlToImage}}
              style={{alignSelf: 'center', width: 200, height: 100, marginTop: 20}}
            />
          ) : null}
        </ScrollView>
        <View style={styles.newsFooter}>
          <Text style={styles.footing}>{element.author}</Text>
          <Text style={styles.footing}>{element.publishedAt}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.btnText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  newsDiv: {
    flex: 3,
    margin: 20,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: 25,
    borderRadius: 10,
  },
  newsHeader: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  newsContent: {
    flex: 1,
    alignSelf: 'stretch',
    overflow: 'scroll',
  },
  newsFooter: {
    marginTop: 10,
    borderTopColor: 'black',
    borderTopWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  backButton: {
    backgroundColor: 'lightgrey',
    width: 100,
    height: 75,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    overflow: 'scroll',
    fontSize: 22,
    color: 'black',
  },
  footing: {
    color: 'black',
    fontSize: 15,
  },
});

export default NewsDetailed;
