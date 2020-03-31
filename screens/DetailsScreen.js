import * as React from 'react';
import { Header, Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import LinksScreen from './LinksScreen';

export default function DetailsScreen({route , navigation}) {
    const { Item } = route.params;
   // const { itemGPA } = route.params;
   // const {itemYear}= route.params;
    return (
        <Card title="Transcript Details">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>Student name: {JSON.stringify(Item.sname)}</Text>
          <Text style={styles.paragraph}>Cummilative GPA: {JSON.stringify(Item.sgpa)}</Text>
          <Text style={styles.paragraph}>Graduation Year: {JSON.stringify(Item.syear)}</Text>
        </Card>
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
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

