import * as React from 'react';
import { StyleSheet, Text ,View,Button} from 'react-native';
import { Card } from 'react-native-elements';


export default function OfferDetailsScreen({route , navigation}) {
  const {Item} = route.params;
  //console.log(Item.credentialId);
  var walletID = "C2FNRchcvdq1c3dY9bvvAoE3RvxgrUnnS";


  async function sendAcceptOfferNotification() {
    const res = await fetch('http://fa6e7fb7.ngrok.io/webhook', {
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

  async function acceptButton(walletID,credentialID)
  {
    var fetchURLForAcceptInvitaion = 'https://api.streetcred.id/custodian/v1/api/'+walletID+'/credentials/'+credentialID;
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
           "credentialId":credentialID
       }),
     })
     sendAcceptOfferNotification();
     navigation.navigate("Home");
    }


  function declineButton()
  {

    navigation.navigate("Home");
  }


  return (
        <View>
          <Card title="Credential Offer Details">
              <Text style={styles.paragraph}>
              You have a new credential offer. {"\n"}
              Would you like to connect or refuse?
              </Text>
              <View style={styles.alternativeLayoutButtonContainer}>
                <Button
                  title="Accept"
                  onPress={() => acceptButton(walletID,Item.credentialId)}
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
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

