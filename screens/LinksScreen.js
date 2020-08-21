import * as React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import arrow from '../assets/images/simple-down-arrow.png';
import { SearchBar } from 'react-native-elements';
import { IP_address } from '../constants'
import socketIOClient from "socket.io-client";

var dataSize = 0;
var dataSize2 = 0
var connectionsData = [];
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


function CredentialsScreen({ navigation }) {

   const [credentials, setCredentials] = React.useState([]);
   const [searchText, setSearchText] = React.useState("");
   const [empty, setEmpty] = React.useState(true);

   React.useEffect(() => {

      const socket = socketIOClient(IP_address);// Change This to your IP Address
      //console.log(socket.connected)
      socket.on("disconnect", () => {
         // console.log("Cred Client disconnected");
       });
       
       socket.emit('loadOldIssu', "walletID")
       
      socket.on("IssuedCred", async data => {

         if (dataSize2 != data.length) {
            setCredentials(data);
            // console.log(credentials)
            // console.log("changing4")

            if (data.length > 0)
               setEmpty(false)
            else
               setEmpty(true)

         }
         //console.log(credentials.length)
         dataSize2 = data.length;
      });
      if (credentials.length > 0)
         setEmpty(false)
      else
         setEmpty(true)

      return () => socket.disconnect();
   }, []);


   // console.log(walletID+"In Credentials Screen")

   const searchFilterFunction = (text, arrayholder) => {
      setSearchText(text);
      // console.log("arrayholder: ", arrayholder)
      const newData = arrayholder.filter(function (item) {
         //applying filter for the inserted text in search bar
         const itemData = item.type ? item.type.toUpperCase() : ''.toUpperCase();
         // console.log("itemData: ", itemData)

         const textData = text.toUpperCase();
         // console.log("textData: ", textData)

         return itemData.indexOf(textData) > -1;
      });

      // console.log("newData: ", newData)

      setCredentials(newData);
   };


   function Item({ objectt }) {
      var img, title, masterDegree;
      var connId = objectt.connID;
      var masterDegreeAfterNotifi = masterDegree;
      for (let i = 0; i < connectionsData.length; i++) {
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
                  masterDe: masterDegreeAfterNotifi
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

   return (
      <View style={styles.container}>
         {
            empty ?
               (
                  <View style={styles.welcomeContainer}>
                     <Image
                        source={
                           __DEV__
                              ? require('../assets/images/credentials.jpg')
                              : require('../assets/images/robot-prod.png')
                        }
                        style={styles.welcomeImage} />
                  </View>
               )
               :
               (
                  <SafeAreaView style={styles.container}>
                     {/* <SearchBar
                        lightTheme
                        round
                        onChangeText={text => searchFilterFunction(text, credentials)}
                        onClear={text => searchFilterFunction('', credentials)}
                        // autoCorrect={false}
                        value={searchText}
                        showLoading={false}
                        placeholder="Type Here..." /> */}
                     <FlatList
                        data={credentials}
                        renderItem={({ item }) => <Item objectt={item} />}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={FlatListItemSeparator} />
                  </SafeAreaView>
               )
         }
      </View>

   );
}

function ConnectionsScreen() {

   const [connectionsDataArray, setConnectionsDataArray] = React.useState([]);
   const [empty, setEmpty] = React.useState(true);

   React.useEffect(() => {

      const socket = socketIOClient(IP_address);// Change This to your IP Address
      //console.log(socket.connected)

      socket.emit('loadOldConn', "walletID")
      //console.log('ba3at eny a load')
      socket.on("disconnect", () => {
         //console.log("Connection Client disconnected");
       });
      socket.on("ConnectionData", async data => {
         //console.log("gali new connection")
        //console.log(data)

         if (dataSize != data.length) {
            setConnectionsDataArray(data);
            //console.log("changing3")

            if (data.length > 0)
               setEmpty(false)
            else
               setEmpty(true)

         }
         //console.log(connectionsDataArray.length)
         dataSize = data.length;
      });
      if (connectionsDataArray.length > 0)
         setEmpty(false)
      else
         setEmpty(true)

      //return () => socket.disconnect();
   }, []);



   function Item({ title, url }) {
      return (
         <View style={styles.item}>
            <Image source={{ uri: url }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         {
            empty ?
               (
                  <View style={styles.welcomeContainer}>
                     <Image
                        source={
                           __DEV__
                              ? require('../assets/images/connections3.jpeg')
                              : require('../assets/images/robot-prod.png')
                        }
                        style={styles.welcomeImage} />
                  </View>
               )
               :
               (
                  <SafeAreaView style={styles.container}>
                     <FlatList
                        data={connectionsDataArray}
                        renderItem={({ item }) => <Item title={item.title} url={item.image} />}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={FlatListItemSeparator}
                     />
                  </SafeAreaView>
               )
         }
      </View>
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
      // resizeMode: 'cover', // or 'stretch'
      // marginTop: Constants.statusBarHeight,
   },
   contentContainer: {
      paddingTop: 15,
   },
   welcomeContainer: {
      alignItems: 'center',
      // marginTop: 10,
      // // marginBottom: 20,
      // flex: 1,
      // resizeMode: 'stretch', // or 'stretch'
      // width: null,
      // height: null,
   },
   welcomeImage: {
      // width: 300,
      // height: 550,
      margin:0,
      height:'100%',
      width:'100%',
      resizeMode: 'cover',
      // marginTop: 100,
      // marginLeft: -10,
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