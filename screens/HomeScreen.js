import * as React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, SafeAreaView, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Card } from 'react-native-elements';
import useAsyncEffect from 'use-async-effect';
import useForceUpdate from 'use-force-update';


var currArraySize2 = 0;
//var data = [];


export default function HomeScreen({ route, navigation }) {


  var walletID = "CrtAMYWLD5ZdkowDdHreNz9goN3kLDsUC";
  const [credentials, setCredentials] = React.useState([]);
  const [offeredCredentials, setOfferedCredentials] = React.useState([]);
  const [arraySize2, setArraySize2] = React.useState(0);
  const [connectionDetailsArray, setConnectionDetailsArray] = React.useState([]);
  //const [connectionDataArray, setConnectionDataArray] = React.useState([]);
  const [connectionDetailsArraySize, setConnectionDetailsArraySize] = React.useState(0);
  const [count, setCount] = React.useState(false);
  const [offeredCredentialsArraySize, setOfferedCredentialsArraySize] = React.useState(0);
  var connectionDataArray = [{
    // id:"test",
    // credentialId:"",
    // title:"",
    // image:""
  }]
  // const obj = { id: connectionDetailsArray.connectionId,credentialId:offeredCredentials[index].credentialId, title: connectionDetailsArray.name, image: connectionDetailsArray.imageUrl }; 
  useInterval(() => {
    // Your custom logic here
    try {
      const fetchAllCredentials = async () => {

        const data = await fetchCredentials();
        setCredentials(data);
        //console.log(data.length+"so?")
        setArraySize2(data.length);
        details = await fetchOfferedCredentials(data);
        setConnectionDetailsArray(details);
        setConnectionDetailsArraySize(Object.keys(details).length);
        //fetchOfferedCredentials();
        //console.log("This should be printed after the fetch")
      }
      fetchAllCredentials();
      removeIssuedCredential();

    } catch (error) {

    }

  }, 8000);

  function useInterval(callback, delay) {
    const savedCallback = React.useRef();
    React.useEffect(() => {
      savedCallback.current = callback;
      const isFocused = navigation.isFocused();
      // const fetchAllCredentials = async() => {
      //   try {
      //    const data= await fetchCredentials();
      //    setCredentials(data);
      //     //console.log(data.length+"so?")
      //     setArraySize2(data.length);
      //     details=await fetchOfferedCredentials(data);
      //     setConnectionDetailsArray(details);
      //     setConnectionDetailsArraySize(Object.keys(details).length);
      //  //fetchOfferedCredentials();
      // console.log("This should be printed after the fetch")
      //   } catch (error) {
      //     console.log(error)
      //   }  


      //   
    }, [callback]);

    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);

  }

  fillConnectionDataArray();
  //console.log(connectionDataArray);





  function Item({ title, url, credentialId }) {
    //console.log("render");


    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OfferDetails',
          {
            img: url,
            name: title,
            credentialId: credentialId
            ,
          })}
        style={[
          styles.item,
          { backgroundColor: '#ffffff' },
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

  function add(array, object) {
    array.push(object);
    return array;
  }


  function addConnectionDetails(arr, myID, object) {
    // const { length } = arr;
    // const id = length + 1;

    const found = arr.some(el => el.id == myID);
    if (!found) {
      //console().log("BOOOM NOT found")
      //console.log(myID);
      arr.push(object);
    }
    // else {//console().log("BOOOM found")}
    return arr;
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
    var cred = await res.json();
    //setCredentials(cred);

    //console.log(count);

    return cred;
  }

  async function fetchOfferedCredentials(data) {

    // if(count<=5){
    //   setCount(count +1);}

    currArraySize2 = arraySize2;
    for (let index = 0; index < data.length; index++) {
      if (data[index].state == "Offered") {
        //console.log(data[index]+"dah mafrod crediial [index]");

        setOfferedCredentials(addConnectionDetails(offeredCredentials, data[index].credentialId, data[index]));
        let tempConnectionID = data[index].connectionId;
        const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections/' + tempConnectionID, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
            XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
            Accept: 'application/json',
          },
        });
        setOfferedCredentialsArraySize(offeredCredentials.length);
        let details = res.json();
        return details
      }
    }

  }

  function fillConnectionDataArray() {
    try {
      console.log(connectionDetailsArray)
      if (connectionDetailsArraySize > 0) {
        //console.log("kda da5lt")
        console.log(offeredCredentials.length + "size gowa")
        for (let index = 0; index < offeredCredentials.length; index++) {
          // console.log("da gowa el for ");
          //console.log(connectionDetailsArray.connectionId);
          if (connectionDetailsArray.connectionId !== null) {
            const obj = { id: connectionDetailsArray.connectionId, credentialId: offeredCredentials[index].credentialId, title: connectionDetailsArray.name, image: connectionDetailsArray.imageUrl };
            connectionDataArray = addConnectionDetails(connectionDataArray, obj.id, obj);
            //console.log(obj);
          }
        }

      }
    } catch (error) {
      console.log(error)
    }


  }

  // }
  //         //console.log(offeredCredentials);
  //       // console.log(connectionDetailsArray);
  //         console.log(connectionDetailsArray.connectionId);
  //         const obj = { id: connectionDetailsArray.connectionId,credentialId:offeredCredentials[index].credentialId, title: connectionDetailsArray.name, image: connectionDetailsArray.imageUrl };    
  //         setConnectionDataArray(addConnectionDetails(connectionDataArray,obj.id,obj)); 
  //         console.log("connectionDataArray");
  //         console.log(connectionDataArray);
  //             }
  //     }  
  //   }

  //   for (let index = 0; index < offeredCredentials.length; index++)
  //   {   


  //   }


  //   // if(count<50)
  //   // setOfferedCredentialsArraySize(count+1);
  //   // if(currArraySize2!=arraySize2)
  //   // setCount(count+1);
  //   console.log(offeredCredentials.length+"deh?"); 

  // }
  //   const innerFunction = useCallback(() => {
  //     // do something!
  // });


  //fetchOfferedCredentials(data);

  function removeIssuedCredential() {
    for (let index = 0; index < arraySize2; index++) {
      if (credentials[index].state == "Issued") {
        for (let index2 = 0; index2 < offeredCredentials.length; index2++) {
          if (offeredCredentials[index2].credentialId == credentials[index].credentialId) {
            //console.log("here")
            offeredCredentials.splice(index2, 1)
            setOfferedCredentialsArraySize(offeredCredentials.length);
          }
        }

      }
    }
    if (offeredCredentialsArraySize > 0) {
      setCount(true)
    }
    else
      setCount(false)

    console.log(count)
    console.log(offeredCredentialsArraySize)
  }


  return (
    <View style={styles.container}>
      {count ?
        (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={connectionDataArray}
              keyExtractor={item => item.id}
              extraData={offeredCredentialsArraySize}
              initialNumToRender={1}

              renderItem={({ item }) => <Item title={item.title} url={item.image} credentialId={item.credentialId} />}
            />
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
      <View style={styles.tabBarInfoContainer}>
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
    backgroundColor: '#fff',
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
