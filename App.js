import React, { useState, useEffect } from "react"; 
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
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
import OfferDetailsScreen from './screens/OfferDetailsScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerRequestDetails from './screens/VerRequestDetailsScreen';
import CredsForVers from './screens/CredsForVers';
import socketIOClient from "socket.io-client";



const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [INITIAL_ROUTE_NAME, setInitialRouteName]=React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  //AsyncStorage.removeItem('userinfo')

  AsyncStorage.getItem('userinfo').then((data) => {
    let walletcreated = JSON.parse(data);
    // console.log(walletcreated)
    if (walletcreated) {
      setInitialRouteName('Root')
    }
    else
      setInitialRouteName('Register')
  })
    

  //  if(!walletIsCreated)
  //  {createWallet();}
   
   
  
      
  //Delete
  //     var fetchURLForDellet='https://api.streetcred.id/custodian/v1/api/wallets?walletId=';
  //     //console.log(fetchURLForDellet)
      
  //     for (let index = 0; index < wallets.length; index++) {
  //       fetchURLForDellet='https://api.streetcred.id/custodian/v1/api/wallets?walletId='+wallets[index].walletId;
  //       //console.log(fetchURLForDellet) 
      
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
          <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="QRScanner" component={QRScanner} />
            <Stack.Screen name="Links" component={LinksScreen}/>
            <Stack.Screen name="Credential Details" component={DetailsScreen}/>
            <Stack.Screen name="Offer Details" component={OfferDetailsScreen}/>
            <Stack.Screen name="Verification Request Details" component={VerRequestDetails}/>
            <Stack.Screen name="Credentials" component={CredsForVers}/>
            <Stack.Screen name="Home" 
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
