import * as React from 'react';
import { Header, Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image,Button} from 'react-native';
import { Card } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
export default function VerReqDetailsScreen({ route, navigation }) {
  var walletID = "C4GTBBcbBMDGunfKF7ySUCH8fHibB4VLZ";
  const { Item } = route.params;
  const { image } = route.params
  const { name } = route.params
  const { VerificationId }=route.params
  value1="pending";
  value2="pending";
  value3="pending";
  // const { itemGPA } = route.params;
  // const {itemYear}= route.params;
  //console.log("PRINTING CONTENT OG ITEM SENT TO DETAILS OF VER");
  //console.log(Item);
  
  return (
    <View>
    <Card title="Verification request details">
    <View style={styles.item}>
        <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.title}>{name}</Text>  
          <Text style={styles.paragraph}>{JSON.stringify(Item.att1)}: {JSON.stringify(value1)}</Text>
         
          <Text style={styles.paragraph}>{JSON.stringify(Item.att2)}: {JSON.stringify(value2)}</Text>
          
          <Text style={styles.paragraph}>{JSON.stringify(Item.att3)}: {JSON.stringify(value3)}</Text>
         
      </View> 
      <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            title="Present"
            //onPress={() => acceptButton(walletID, credentialId)}
          />
          <Button
            title="Decline"
            //onPress={() => declineButton()}
          />
        </View>
      </Card>
    </View>

    //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //  <Text>Details: </Text>
    //  <Text>Script Details: {JSON.stringify(Item)}</Text>
    //    </View>
  );

}

async function fetchCredentials() {
  const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/credentials', {
     method: 'GET',
     headers: {
        Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
        XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
        Accept: 'application/json',
     },
  });
  res.json().then(res => setCredentials(res)).then(setArraySize2(credentials.length))
  // //console.log(arraySize2);

  console.log("size: " + arraySize2)
  currArraySize2 = arraySize2;
  for (let index = 0; index < arraySize2; index++) {
     const state = credentials[index].state
     if (state == "Issued") {
        const data = credentials[index].values
        //to add a credential and if condition
        const obj = { id: credentials[index].credentialId, sname: data.Name, sgpa: data.GPA, syear: data.Year, type: data.Type, connID: credentials[index].connectionId }
        //setValues(add(values, credentials[index].credentialId, obj));
        // console.log("values:", values)
     }
  }
 // if(currArraySize2>0)
 //    setEmpty(false)
 // else
 //    setEmpty(true)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
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
