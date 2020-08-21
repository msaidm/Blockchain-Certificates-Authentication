import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import { ngrok } from '../constants'

var invitationFromURL = ' ';

export default function QRScanner({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [wallets, setWallets] = useState({});
  const [connections, setConnections] = useState({});
  var splitted;
  // var userName = 'Home'; // This will be changed will sign up page is ready 
  // var userWalletID;
  const [walletID,setWalletID] = React.useState();
  //const walletID='CeQq0v5QY9g3c8yqzoTQKQVyc5hbzcnH8';


  async function getWalletID()
  {
    await AsyncStorage.getItem('userinfo').then((data) => {
      let dataInfo = JSON.parse(data);
      // console.log(dataInfo)
      if (dataInfo) {
        setWalletID( dataInfo.walletId );
      }
    })
  }
  getWalletID()
  console.log(walletID + "in QR Scanner")


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
        Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
        XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
        Accept: 'application/json',
        "Content-Type": 'application/json',
      }
    });
    res.json().then(res => setWallets(res))

  }

  async function acceptInvitation(Invitation) {
    let data = new FormData();
    data.append("invitation", Invitation);
    var fetchURLForAcceptInvitaion = 'https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections/invitation';
    const res = await fetch(fetchURLForAcceptInvitaion, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
        XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    res.json().then(res => setConnections(res))
    console.log(res.json.toString)
  }
  async function sendAcceptConnectionNotification() {
    const res = await fetch(ngrok + '/webhook', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        "message_type": "new_connection",
        "object_id": "dasdadsasdadasdaddasdtesssst",
        "data": {
          "param1": "value1",
          "param2": "value2"

        }
      }),
    });
    res.json().then(console.log(JSON.stringify(res)))

  }

  function getWalletId() {
    for (let index = 0; index < wallets.length; index++) {
      if (wallets[index].name == userName)
        userWalletID = wallets[index].walletId;
    }
    // console.log(wallets)
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
            //getWalletId();
            acceptInvitation(invitationFromURL);
            // console.log(connections);
            sendAcceptConnectionNotification();
            navigation.navigate("Root");
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