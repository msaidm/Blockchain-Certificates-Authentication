import * as React from 'react';
import { Header, Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, SafeAreaView, Image, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
// import { Card } from 'react-bootstrap';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import socketIOClient from "socket.io-client";
import { IP_address } from '../constants'

export default function CredsForVers({ route, navigation }) {
   const { Values } = route.params;

   const bachelorSchemaId = "KP7yEkAopJJK3HFVLmZFyg:2:Computer Bachelor Degree:1.1";
   const BachelorType = "Bachelor Degree";
   const [credentialDataArray, setCredentialDataArray] = React.useState([]);

   async function chooseTheRightCred() {
      var Creds = [];
      for (var i = 0; i < Values.length; i++) {
         if (Values[i].type == BachelorType && Values[i].schemaId == bachelorSchemaId) {
            Creds.push(Values[i])
         }
      }
      console.log("Choose The Rght CRed")
      console.log(Creds)
      setCredentialDataArray(Creds)
      return Creds;
   }

   // var possibleCreds = chooseTheRightCred();
   var chosenCred;
   var empty = true;
   const waitFor = 2000;
   //console.log("ana hona")
   //console.log(credentialDataArray)

   if (credentialDataArray.length > 0) {
      empty = false;
      // possibleCreds = chooseTheRightCred()
   }



   function whenCredPressed(givenID) {
      chosenCred = givenID
      navigation.navigate('VerificationRequestDetails', {
         ChosenCredID: chosenCred,
      })


   }
   function Item({ name, year, gpa, ID, type }) {
      return (
         <TouchableOpacity
            onPress={() =>
               whenCredPressed(ID)

            }
            style={[
               styles.itemPressed,
            ]}
         >
            <View style={styles.container}>
               <Card title={type}>
                  <Text style={styles.paragraph}>Name: {name}</Text>
                  <Text style={styles.paragraph}>Graduation Year: {year}</Text>
                  <Text style={styles.paragraph}>GPA: {gpa}</Text>
               </Card>
            </View>
            {/* <Text style={styles.paragraph1}>{type}</Text>
            <Text style={styles.paragraph}>Name: {name}</Text>
            <Text style={styles.paragraph}>Graduation Year: {year}</Text>
            <Text style={styles.paragraph}>GPA: {gpa}</Text> */}

         </TouchableOpacity>
      );
   }
   function useInterval(callback, delay) {
      const savedCallback = React.useRef();

      // Remember the latest function.
      React.useEffect(() => {
         savedCallback.current = callback;
      }, [callback]);

      // Set up the interval.
      React.useEffect(() => {
         function tick() {
            savedCallback.current();
         }
         if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
         }
      }, [delay]);
   }

   useInterval(() => {
      // Your custom logic here
      chooseTheRightCred();
      console.log("gowa el presnt")
      console.log(credentialDataArray)
   }, waitFor);

   return (
      <View style={styles.horizontal}>
         {
            empty ?
               (
                  <ActivityIndicator size="large" />
                  // <Text style={styles.paragraph1}>Loading Credentials</Text>
               )
               :
               (
                  <SafeAreaView style={styles.container}>
                     <Text style={styles.paragraph1}> Available Credentials</Text>
                     <FlatList
                        data={credentialDataArray}
                        renderItem={({ item }) => <Item name={item.sname} year={item.syear} gpa={item.sgpa} ID={item.id} type={item.type} />}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={FlatListItemSeparator}
                     />
                     <View style={styles.alternativeLayoutButtonContainer}>

                     </View>
                  </SafeAreaView>
               )

         }
      </View>

   );
}
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
const styles = StyleSheet.create({
   // container: {
   //    flex: 1,
   //    backgroundColor: '#fafafa',
   // },
   container: {
      flex: 1,
      justifyContent: "center",
      // alignItems: 'center',
      // marginTop: Constants.statusBarHeight,
   },
   paragraph1: {
      // textAlign: 'left',
      marginRight: 'auto',
      margin: 24,
      fontSize: 25,
      marginTop: 5,
      marginBottom: 5,
   },
   contentContainer: {
      paddingTop: 15,
   },
   welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
   },
   welcomeImage: {
      width: 150,
      height: 180,
      resizeMode: 'contain',
      marginTop: 100,
      marginLeft: -10,
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
      fontSize: 30,
      padding: 5,
      //fontFamily: "Josefin",
   },
   paragraph: {
      margin: 24,
      fontSize: 15,
      marginTop: 5,
      marginBottom: 5,
      padding: 10,
      color: 0x555,
      //fontFamily: "Josefin",
   },
   itemPressed: {
      backgroundColor: '#ADD8E6',
      padding: 5,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
   },
   image: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      overflow: "hidden",
      // borderWidth: 3,
      // borderColor: "black"
   },
   horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      // marginTop:240,
   },
});

