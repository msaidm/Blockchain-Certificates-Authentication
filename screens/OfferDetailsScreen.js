import * as React from 'react';
import { StyleSheet, AsyncStorage,Text, View, Button,Image } from 'react-native';
import { Card } from 'react-native-elements';
import { WALLET_ID } from '../constants'


export default function OfferDetailsScreen({ route, navigation }) {
  const { name } = route.params;
  const { img } = route.params;
  const { credentialId } = route.params;

  const [walletID,setWalletID] = React.useState();

  async function getWalletID()
  {
    await AsyncStorage.getItem('userinfo').then((data) => {
      let dataInfo = JSON.parse(data);
      //console.log(dataInfo)
      if (dataInfo) {
        setWalletID( dataInfo.walletId );
      }
    })
  }
  getWalletID()
  console.log(walletID+"In offer details Screen")
  
  //console.log(Item.credentialId);
 // var walletID = WALLET_ID;


  async function sendAcceptOfferNotification() {
    const res = await fetch('http://8d6d8dcec062.ngrok.io/webhook', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        "message_type": "credential_request"
      }),
    });
    res.json().then(console.log(JSON.stringify(res)))

  }

  async function acceptButton(walletID, credentialID) {
    var fetchURLForAcceptInvitaion = 'https://api.streetcred.id/custodian/v1/api/' + walletID + '/credentials/' + credentialID;
    const res = await fetch(fetchURLForAcceptInvitaion, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
        XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        "walletId": walletID,
        "credentialId": credentialID
      }),
    })
    sendAcceptOfferNotification();
    navigation.navigate("Root");
  }


  function declineButton() {

    navigation.navigate("Root");
  }


  return (
    <View>
      <Card title="Credential Offer Details">
      <View style={styles.item}>
          <Image source={{ uri: img }} style={styles.image} />
            <Text style={styles.title}>{name}</Text> 
         </View>   
         <Text style={styles.paragraph}>You have a new credential offer</Text>  
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            title="Accept"
            onPress={() => acceptButton(walletID, credentialId)}
          />
          <Button
            title="Decline"
            onPress={() => declineButton()}
          />
        </View>
      </Card>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  title: {
    fontSize: 20,
    padding: 5,
    
 },
 item: {
  backgroundColor: '#ff00ff00',
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
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

