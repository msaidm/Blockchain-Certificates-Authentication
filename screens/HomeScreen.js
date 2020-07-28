import * as React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, SafeAreaView,Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Card, SearchBar } from 'react-native-elements';
import socketIOClient from "socket.io-client";

console.disableYellowBox = true;

export default function HomeScreen({ route, navigation }) {

  const [connectionDataArray, setConnectionDataArray] = React.useState([]);
  const [count, setCount] = React.useState(true);
  let dataSize = 0;

  React.useEffect(() => {
    
    const socket = socketIOClient('http://192.168.1.4:5002/');
    socket.on("FromAPI", data => {
      
      if(dataSize!=data.length)
      {
        setConnectionDataArray(data);
        console.log("changing")
      }  
      setCount(true)
      dataSize = data.length;
    });
    if(connectionDataArray.length>0)
        setCount(true)
      else
        setCount(false)  
    return () => socket.disconnect();
  }, []);

  function ItemC({ title, url,credentialId }) { //for credential items
    return (
       <TouchableOpacity
          onPress={() => navigation.navigate('OfferDetails',
          {
             img : url , 
             name : title,
             credentialId:credentialId
          ,})}
          style={[
             styles.item,
             { backgroundColor:'#ffffff' },
          ]}        
       >
        <Card title="Credential Offer">
        <View style={styles.item}>
          <Image source={{ uri: url }} style={styles.image} />
            <Text style={styles.title}>{title}</Text> 
         </View>   
         <Text style={styles.paragraph}>You have a new credential offer</Text>  
        </Card>
       </TouchableOpacity>
    );
  }

  function ItemV({ title, url,verificationId,}) { //for verification items
    return (
       <TouchableOpacity
          onPress={() => navigation.navigate('VerificationRequestDetails',
          {
             img : url , 
             name : title,
             verificationId:verificationId
          ,})}
          style={[
             styles.item,
             { backgroundColor:'#ffffff' },
          ]}        
       >
        <Card title="Verification Request">
        <View style={styles.item}>
          <Image source={{ uri: url }} style={styles.image} />
            <Text style={styles.title}>{title}</Text> 
         </View>   
         <Text style={styles.paragraph}>You are required to verify this information</Text>  
        </Card>
       </TouchableOpacity>
    );
  }




  // function fillConnectionDataArray()
  // {
  //   try {
  //       if(VerificationDetailsArraySize>0)
  //       {
  //         for (let index = 0; index < requestedVerifications.length; index++) {
  //           for (let index2 = 0; index2 < VerificationDetailsArray.length; index2++) {
  //             if( VerificationDetailsArray[index2].connectionId === requestedVerifications[index].connectionId){
  //             const objj = { id: VerificationDetailsArray[index2].connectionId,verificationId:requestedVerifications[index].verificationId, title: VerificationDetailsArray[index2].name, image: VerificationDetailsArray[index2].imageUrl , type:'Verification' }; 
  //             connectionDataArray=addConnectionDetails(connectionDataArray,objj.id,objj); 
  //           }
  //         }
  //     }
  //   catch (error) {
  //       console.log(error)
  //   }   
  // }
    
  // async function fetchVerifications() {
  //   const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/verifications', {
  //      method: 'GET',
  //      headers: {
  //       Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
  //       XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
  //         Accept: 'application/json',
  //      },
  //   });
  //   var ver = await res.json();
  //  return ver;   
  // }

  // async function fetchRequestedVerifications(dataVer)
  // { 
  //     currArraySizeVer= arraySizeVer ;
  //     for (let index = 0; index < dataVer.length ; index++) 
  //     {
  //       if(dataVer[index].state=="Requested")
  //       {
  //         setrequestedVerifications(addConnectionDetails(requestedVerifications,dataVer[index].verificationId ,dataVer[index]));
  //         let tempVerConnectionID= dataVer[index].connectionId;
  //         const res = await fetch('https://api.streetcred.id/custodian/v1/api/'+walletID+'/connections/'+tempVerConnectionID, {
  //           method: 'GET',
  //           headers: {
  //             Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
  //             XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
  //               Accept: 'application/json',
  //           },
  //         });
          
  //         var ver = await res.json();
  //         detailsOfVer2 = addConnectionDetails(detailsOfVer,ver.connectionId,ver)
  //         setOfferedCredentialsArraySize(offeredCredentials.length);
  //         setRequestedVerificationsArraySize(requestedVerifications.length);
  //       }
  //     }
  //     return detailsOfVer2;
  // }
  
  // function removeIssuedCredential(){
  //   var temArray=[]; 
  //   setOfferedCredentials(temArray);
  //   for (let index = 0; index < arraySize2; index++) 
  //   {
  //     if(credentials[index].state=="Issued")
  //       {
  //         for (let index2 = 0; index2 < connectionDataArray.length; index2++) {
  //             if(connectionDataArray[index2].credentialId == credentials[index].credentialId)
  //             {
  //               connectionDataArray.splice(index2,1)
  //               setOfferedCredentialsArraySize(offeredCredentials.length);
  //             }
  //         }    
  //       }
  //   }
  //   if(connectionDataArray.length>0){
  //     setCount(true)
  //   }
  //   else
  //     setCount(false)  
  // }

  // function removeRequestedVerification(){
  //   var tempArray=[]; 
  //   setrequestedVerifications(tempArray);
  //   for (let index = 0; index < arraySizeVer; index++) 
  //   {
  //     if(credentials[index].state=="Accepted")
  //       {
  //         for (let index3 = 0; index3 < connectionDataArray.length; index3++) {
  //             if(connectionDataArray[index3].verificationId == Verifications[index].verificationId)
  //             {
  //               connectionDataArray.splice(index2,1)
  //               setrequestedVerifications(requestedVerifications.length);
  //             }
  //         }    
  //       }
  //   }
  //   if(connectionDataArray.length>0){
  //     setCount(true)
  //   }
  //   else
  //     setCount(false)  
  //   }


  return (
    <View style={styles.container}>    
    {count ?
        (
          <SafeAreaView style={styles.container}>
            <FlatList
                data={connectionDataArray}
                keyExtractor={item => item.id}
                renderItem={({ item }) => { 
                if (item.type =="Credential")
                  { 
                    return <ItemC  title={item.title} url={item.image} credentialId={item.credentialId} />;

                }
                else if(item.type =="Verification")
                  {
                    return <ItemV  title={item.title} url={item.image} verificationId={item.verificationId} />;
                }
              }
              
        }/>
          </SafeAreaView>)
        :
          (<View style={styles.welcomeContainer}> 
             <Image
            source={
              __DEV__
                ? require('../assets/images/barcode.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
          </View>)
    }
     <View  style={styles.tabBarInfoContainer}> 
           <Button 
            title="SCAN CODE" type="outline" onPress={() => navigation.navigate('QRScanner')} />  
       </View>
       
    </View>
  );
  }
HomeScreen.navigationOptions = {
  header: null,
  
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
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
  linearGradient: {
    
    flexDirection:'row',
    marginTop: 230,
    borderRadius: 5,
    
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
});
