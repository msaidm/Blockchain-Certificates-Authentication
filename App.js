import React, { useState, useEffect } from "react";

import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import QRScanner from './navigation/QRScanner';
import LinksScreen from "./screens/LinksScreen";
import DetailsScreen from "./screens/DetailsScreen";
import HomeScreen from './screens/HomeScreen';
import OfferList from './screens/OfferList';

//import listWallets from './components/listWallets.js'


const Stack = createStackNavigator();
var walletIsCreated=false;
var userName;

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  
   function createWallet()
   {
    
    fetch('https://api.streetcred.id/custodian/v1/api/wallets', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
        XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "ownerName": "testMohammed"
      }),
    });
    walletIsCreated=true;

   };  

   
    

  //  if(!walletIsCreated)
  //  {createWallet();}
   
   
  
      
  //Delete
  //     var fetchURLForDellet='https://api.streetcred.id/custodian/v1/api/wallets?walletId=';
  //     console.log(fetchURLForDellet)
      
  //     for (let index = 0; index < wallets.length; index++) {
  //       fetchURLForDellet='https://api.streetcred.id/custodian/v1/api/wallets?walletId='+wallets[index].walletId;
  //       console.log(fetchURLForDellet) 
      
  //     fetch(fetchURLForDellet, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
  //       XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //         "walletId": "c4w1AlUuL055Y41yeQjmumdI0stBZ4Gt"
  //     }),
  //   });
  // }
  //Delete 

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="Offers" component={OfferList}/>
            <Stack.Screen name="QRScanner" component={QRScanner} />
            <Stack.Screen name="Links" component={LinksScreen}/>
            <Stack.Screen name="Details" component={DetailsScreen}/>
            <Stack.Screen name="HomeScreen" 
            component={HomeScreen} 
            initialParams={{ text: 'Ya Rab' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
