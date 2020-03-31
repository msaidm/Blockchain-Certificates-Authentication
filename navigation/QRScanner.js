import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';

var invitationFromURL = ' ';

export default function QRScanner({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [wallets, setWallets] = useState({});
  const [connections, setConnections] = useState({});
  var splitted;
  var userName = 'marina'; // This will be changed will sign up page is ready 
  var userWalletID;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      fetchData();
    })();
  }, []);


  async function fetchData() {
    const res = await fetch('https://api.streetcred.id/custodian/v1/api/wallets', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
        XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
        Accept: 'application/json',
        "Content-Type": 'application/json',
      }
    });
    res.json().then(res => setWallets(res))

  }

  async function acceptInvitation(walletID, Invitation) {
    let data = new FormData();
    data.append("invitation", Invitation);
    var fetchURLForAcceptInvitaion = 'https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections/invitation';
    const res = await fetch(fetchURLForAcceptInvitaion, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
        XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    res.json().then(res => setConnections(res))
  }


  function getWalletId() {
    for (let index = 0; index < wallets.length; index++) {
      if (wallets[index].name == userName)
        userWalletID = wallets[index].walletId;
    }
    console.log(wallets)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    splitted = data.split('=');
    invitationFromURL = splitted[1];

    // const saveUserId = async (Key,invitationFromURL) => {
    //   try {
    //     await AsyncStorage.setItem(Key, invitationFromURL);
    //   } catch (error) {
    //     // Error retrieving data
    //     console.log(error.message);
    //   }
    // };

    //saveUserId('invitationFromURL',invitationFromURL);
    Alert.alert(
      'New Connection Request ',
      'Do you want to connect?',
      [
        {
          text: 'YES', onPress: () => {
            //saveUserId('Alert','Yes') 
            getWalletId();
            acceptInvitation(userWalletID, invitationFromURL);
            console.log(connections);
            navigation.navigate("Offers");
          }
        },
        {
          text: 'NO', onPress: () => {
            //saveUserId('Alert', 'No')
            navigation.navigate("Root");
          }
        }

      ]
    );

  };


  // async function getInvitation( walletID, invitation )
  //  {
  //    console.log(walletID+"inside" )
  //    console.log(invitation+"inside")
  //   var fetchURLForAcceptInvitaion='https://api.streetcred.id/custodian/v1/api/'+walletID+'/connections/invitation';
  //   const res = await fetch(fetchURLForAcceptInvitaion, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
  //       XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //         "walletId": walletID,
  //         "invitation": invitation
  //     }),
  //   });
  //   res.json().then(res => setConnections(res))
  //  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}


        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}