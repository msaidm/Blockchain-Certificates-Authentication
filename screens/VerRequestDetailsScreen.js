import * as React from 'react';
import { Header, Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
export default function VerReqDetailsScreen({ route, navigation }) {
  const { Item } = route.params;
  const { image } = route.params
  const { name } = route.params
  const { VerificationId }=route.params
  value1="pending";
  value2="pending";
  value3="pending";
  value4="pending";
  value5="pending";
  // const { itemGPA } = route.params;
  // const {itemYear}= route.params;
  console.log("PRINTING CONTENT OG ITEM SENT TO DETAILS OF VER");
  console.log(Item);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Card title={JSON.stringify(Item.type)}>
        <Text style={styles.paragraph}>just trying the page</Text>
      </Card>
    </View>

    //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //  <Text>Details: </Text>
    //  <Text>Script Details: {JSON.stringify(Item)}</Text>
    //    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
});
