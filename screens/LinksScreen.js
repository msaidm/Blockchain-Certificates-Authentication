import * as React from 'react';
import { Header, Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import arrow from '../assets/images/simple-down-arrow.png';


const Tab = createMaterialTopTabNavigator();

FlatListItemSeparator = () => {
   return (
      <View
         style={{
            height: 1,
            width: "100%",
            backgroundColor: "darkgray",
         }}
      />
   );
}


function add(arr, myID, object) {
   // const { length } = arr;
   // const id = length + 1;
   const found = arr.some(el => el.id == myID);
   if (!found) {
      arr.push(object);
   }
   return arr;
}

var connectionName;
var connectionsArray = [""];
var currArraySize = 0;
var currArraySize2 = 0;
var connectionsData = [];

function CredentialsScreen({ navigation }) {
   var walletID = "C2FNRchcvdq1c3dY9bvvAoE3RvxgrUnnS";

   //var connectionID = "d418f248-33a4-428c-aff1-1eeb00079e52";

   const [credentials, setCredentials] = React.useState([]);
   const [arraySize2, setArraySize2] = React.useState(0);
   const [values, setValues] = React.useState([]);


   function Item({ objectt }) {
      var img, title;
      var connId = objectt.connID;
      for (i = 0; i < connectionsData.length; i++) {
         if (connectionsData[i].id == connId) {
            img = connectionsData[i].image
            title = connectionsData[i].title
         }
      }
      return (
         <TouchableOpacity
            onPress={() => navigation.navigate('Details',
               {
                  Item: objectt,
                  image: img,
                  name: title,
               })}
            style={[
               styles.item,
            ]}
         >
            <Text style={styles.title}>{objectt.type}</Text>
            <Image source={arrow} style={{ width: 20, height: 20, alignSelf: 'flex-end' }} />
         </TouchableOpacity>
      );
   }

   React.useEffect(() => {
      (async () => {
         fetchCredentials();
      })();
   }, [credentials]);

   async function fetchCredentials() {
      const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/credentials', {
         method: 'GET',
         headers: {
            Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
            XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
            Accept: 'application/json',
         },
      });
      res.json().then(res => setCredentials(res)).then(setArraySize2(credentials.length))
      // //console.log(arraySize2);

      console.log("size: " + arraySize2)
      currArraySize2 = arraySize2;
      for (let index = 0; index < arraySize2; index++) {
         const state = credentials[index].state
         if (state == "Issued") {
            const data = credentials[index].values
            //to add a credential and if condition
            const obj = { id: credentials[index].credentialId, sname: data.Name, sgpa: data.GPA, syear: data.Year, type: data.Type, connID: credentials[index].connectionId }
            setValues(add(values, credentials[index].credentialId, obj));
            // console.log(connectionsData)
         }

         else {

         }
      }
   }


   return (
      <SafeAreaView style={styles.container}>
         <FlatList
            data={values}
            renderItem={({ item }) => <Item objectt={item} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={FlatListItemSeparator}

         />
      </SafeAreaView>
   );
}

function ConnectionsScreen() {

   var walletID = "C2FNRchcvdq1c3dY9bvvAoE3RvxgrUnnS";

   const [wallets, setWallets] = React.useState([]);
   const [connectionName, setConnectionName] = React.useState("");
   const [arraySize, setArraySize] = React.useState(0);
   const [DATA, setData] = React.useState([]);
   var index = 0;


   function Item({ title, url }) {
      return (
         <View style={styles.item}>
            <Image source={{ uri: url }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
         </View>
      );
   }

   const setWalletsAndFetch = (wallets) => {
      setWallets(wallets);
      fetchConnections(wallets);
   }

   React.useEffect(() => {
      (async () => {
         // //console.log("HELLOOO00");
         fetchConnections();
      })();
   }, [setWalletsAndFetch]);

   async function fetchConnections() {

      await Font.loadAsync({
         Josefin: require('../assets/fonts/JosefinSans-SemiBold.ttf'),
      });

      const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections', {
         method: 'GET',
         headers: {
            Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
            XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
            Accept: 'application/json',
         },
      });
      res.json().then(res => setWallets(res)).then(setConnectionName(wallets[0].name)).then(setArraySize(wallets.length))
      if (arraySize > currArraySize) {
         currArraySize = arraySize;
         for (let index = 0; index < arraySize; index++) {
            const credentialsData = wallets[index]
            const obj = { id: credentialsData.connectionId, title: credentialsData.name, image: credentialsData.imageUrl };
            setData(add(DATA, obj.id, obj))
            connectionsData = add(connectionsData, obj.id, obj)
            ///to make the index with the connectionID
         }
      }
      // //console.log(DATA);
   }

   return (
      <SafeAreaView style={styles.container}>
         <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} url={item.image} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={FlatListItemSeparator}
         />
      </SafeAreaView>
   );
}

function MyTabs() {
   return (
      <Tab.Navigator
         initialRouteName="Credentials"
         tabBarOptions={{
            activeTintColor: 'royalblue',
            labelStyle: { fontSize: 14 },
            style: { backgroundColor: 'white' },
         }}
      >
         <Tab.Screen
            name="Credentials"
            component={CredentialsScreen}
            options={{ tabBarLabel: 'Credentials' }}
         />
         <Tab.Screen
            name="Connections"
            component={ConnectionsScreen}
            options={{ tabBarLabel: 'Connections' }}
         />
      </Tab.Navigator>
   );
}

const Stack = createStackNavigator();

export default function LinksScreen({ navigation }) {
   return (
      <MyTabs />
      // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      //    <OptionButton
      //       icon="md-school"
      //       label={connectionName}
      //       onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      //    />

      //    <OptionButton
      //       icon="md-compass"
      //       label="Read the React Navigation documentation"
      //       onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      //    />

      //    <OptionButton
      //       icon="ios-chatboxes"
      //       label="Ask a question on the forums"
      //       onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
      //       isLastOption
      //    />
      // </ScrollView>
   );
}



function OptionButton({ icon, label, onPress, isLastOption }) {
   return (
      <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
         <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
               <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
            </View>
            <View style={styles.optionTextContainer}>
               <Text style={styles.optionText}>{label}</Text>
            </View>
         </View>
      </RectButton>
   );
}

const styles = StyleSheet.create({
   // container: {
   //    flex: 1,
   //    backgroundColor: '#fafafa',
   // },
   container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
   },
   contentContainer: {
      paddingTop: 15,
   },
   optionIconContainer: {
      marginRight: 12,
   },
   option: {
      backgroundColor: '#fdfdfd',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: '#ededed',
   },
   lastOption: {
      borderBottomWidth: StyleSheet.hairlineWidth,
   },
   optionText: {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginTop: 1,
   },
   item: {
      backgroundColor: '#ff00ff00',
      padding: 5,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
   },
   title: {
      fontSize: 20,
      padding: 5,
      fontFamily: "Josefin",
   },
   image: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      overflow: "hidden",
      // borderWidth: 3,
      // borderColor: "black"
   },
});