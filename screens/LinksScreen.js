import * as React from 'react';
import { Header, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
var walletID = "C44H0ImYvrWRpsBVcCHLfjU53UbPUNQiV";
var connectionName;

function CredentialsScreen() {
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Feed!</Text>
      </View>
   );
}

function ConnectionsScreen() {

   const [wallets, setWallets] = React.useState([]);
   const [connectionName, setConnectionName] = React.useState("");

   const setWalletsAndFetch = (wallets) => {
      setWallets(wallets);
      fetchConnections(wallets);
   }

   React.useEffect(() => {
      (async () => {
         console.log("HELLOOO00");
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
      res.json().then(res => setWallets(res)).then(setConnectionName(wallets[0].name))

   }

   return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
         <OptionButton
            icon="md-school"
            label={connectionName}
            onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
         />
{/* 
         <OptionButton
            icon="md-compass"
            label="Read the React Navigation documentation"
            onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
         />

         <OptionButton
            icon="ios-chatboxes"
            label="Ask a question on the forums"
            onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
            isLastOption
         /> */}

      </ScrollView>
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



export default function LinksScreen() {

   // const [wallets, setWallets] = React.useState([]);
   // const [connectionName, setConnectionName] = React.useState("");

   // const setWalletsAndFetch = (wallets) => {
   //    setWallets(wallets);
   //    fetchConnections(wallets);
   // }

   // React.useEffect(() => {
   //    (async () => {
   //       console.log("HELLOOO00");
   //       fetchConnections();
   //    })();
   // }, [setWalletsAndFetch]);

   // async function fetchConnections() {

   //    const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections', {
   //       method: 'GET',
   //       headers: {
   //          Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
   //          XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
   //          Accept: 'application/json',
   //       },
   //    });
   //    res.json().then(res => setWallets(res)).then(setConnectionName(wallets[0].name))

   // }

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
   container: {
      flex: 1,
      backgroundColor: '#fafafa',
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
});


// import React, { Component } from 'react'
// import { View, Text } from 'react-native'

// var walletID = "C44H0ImYvrWRpsBVcCHLfjU53UbPUNQiV"
// let jsondata;  
// let data = [];

// class HttpExample extends Component {
//    state = {
//       data: ''
//    }
//    componentDidMount = () => {
//       fetch('https://api.streetcred.id/custodian/v1/api/'+ walletID + '/connections', {
//          method: 'GET',
//          headers: {
//           Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
//           XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       })
//       .then((response) => response.json())
//       .then((responseJson) => {
//          console.log(responseJson);
//          // jsondata = responseJson.values;
//          this.setState({
//             data: responseJson
//          })
//       })
//       .catch((error) => {
//          console.error(error);
//       });
//       console.log("HII "+ jsondata)
//    }
//    render() {
//       return (
//          <View>
//             <Text>
//                hi
//                {this.state.data.Text}
//             </Text>
//          </View>
//       )
//    }
// }
// export default HttpExample