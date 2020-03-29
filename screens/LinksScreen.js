import * as React from 'react';
import { Header, Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';
import DetailsScreen from './DetailsScreen';

const Tab = createMaterialTopTabNavigator();

FlatListItemSeparator = () => {
   return (
      <View
         style={{
            height: 1,
            width: "100%",
            backgroundColor: "#000",
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

function CredentialsScreen({ navigation }) {
   var walletID = "Cwj31Hq5pNLcBjRZwCeaL5peopxRsEzEI";

   //var connectionID = "d418f248-33a4-428c-aff1-1eeb00079e52";

   const [credentials, setCredentials] = React.useState([]);
   const [arraySize2, setArraySize2] = React.useState(0);
   const [values, setValues] = React.useState([]);

   function Item({ title }) {
      return (
         <TouchableOpacity
            onPress={() => navigation.navigate('Details')}
            style={[
               styles.item,
               { backgroundColor:'#6e3b6e' },
            ]}
         >
            <Text style={styles.title}>{title}</Text>
         </TouchableOpacity>
      );
   }

   const setCredentialsAndFetch = (credentials) => {
      setCredentials(credentials);
      fetchCredentials(credentials);
   }

   React.useEffect(() => {
      (async () => {
         console.log("HELLOOO0 2");
         fetchCredentials();
      })();
   }, [credentials]);

   async function fetchCredentials() {
      const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/credentials', {
         method: 'GET',
         headers: {
            Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
            XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
            Accept: 'application/json',
         },
      });
      res.json().then(res => setCredentials(res)).then(setArraySize2(credentials.length))
      console.log(arraySize2);

      if (arraySize2 > currArraySize2) {
         console.log("hena")
         currArraySize2 = arraySize2;
         for (let index = 0; index < arraySize2; index++) {

            const data = credentials[index].values
            //to add a credential and if condition
            const obj = { id: credentials[index].credentialId, sname: data.Name, sgpa: data.GPA, syear: data.Year }
            setValues(add(values, credentials[index].credentialId, obj));
            console.log("index " + index)
            console.log(values)
         }
      }
      // console.log(credentials[0].values.GPA);
   }


   return (
      <SafeAreaView style={styles.container}>
         <FlatList
            data={values}
            renderItem={({ item }) => <Item title={item.sname} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={FlatListItemSeparator}
         />
      </SafeAreaView>
   );
}

function ConnectionsScreen() {

   var walletID = "C44H0ImYvrWRpsBVcCHLfjU53UbPUNQiV";

   const [wallets, setWallets] = React.useState([]);
   const [connectionName, setConnectionName] = React.useState("");
   const [arraySize, setArraySize] = React.useState(0);
   const [DATA, setData] = React.useState([]);
   var index = 0;


   function Item({ title }) {
      return (
         <View style={styles.item}>
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
         // console.log("HELLOOO00");
         fetchConnections();
      })();
   }, [setWalletsAndFetch]);

   async function fetchConnections() {
      const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections', {
         method: 'GET',
         headers: {
            Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
            XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
            Accept: 'application/json',
         },
      });
      res.json().then(res => setWallets(res)).then(setConnectionName(wallets[0].name)).then(setArraySize(wallets.length))
      // console.log(arraySize);
      if (arraySize > currArraySize) {
         currArraySize = arraySize;
         for (let index = 0; index < arraySize; index++) {
            const obj = { id: index, title: wallets[index].name };
            setData(add(DATA, index, obj))
            ///to make the index with the connectionID
         }
      }
      // console.log(DATA);
   }

   return (
      <SafeAreaView style={styles.container}>
         <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
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
            activeTintColor: '#e91e63',
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: 'lavenderblush' },
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
   },
   title: {
      fontSize: 22,
   },
});

