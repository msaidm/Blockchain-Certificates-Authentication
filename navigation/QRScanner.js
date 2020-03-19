import React, { useState, useEffect,Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';




export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  var splitted;
  var userName='testMohammed'; // This will be changed will sign up page is ready 
  var invitation='d';
  var userWalletID;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

   const [hasError, setErrors] = useState(false);
    const [wallets, setWallets] = useState({});
    async function fetchData() {
      const res = await  fetch('https://api.streetcred.id/custodian/v1/api/wallets', {
        method: 'GET',
        headers: {
                Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
                XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
      });
      res
        .json()
        .then(res => setWallets(res))
        .catch(err => setErrors(err));
    }
  
    useEffect(() => {
      fetchData();
    }, []);
    
    console.log(wallets)
 


  

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    splitted = data.split('=');
    invitation=splitted[1];
    console.log('Invite  '+splitted[1]);
  };
  

  for (let index = 0; index < wallets.length; index++) {
    
    if (wallets[index].name=="testMohammed")
        userWalletID=wallets[index].walletId;
    
  }
  console.log('ID=  '+userWalletID);
  
  function AcceptInvitation( walletID, invitation )
   {
    
    fetch('https://api.streetcred.id/custodian/v1/api/connections/invitation', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
        XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "walletId": walletID,
          "invitation": invitation
      }),
    });
    walletIsCreated=true;

   };

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
