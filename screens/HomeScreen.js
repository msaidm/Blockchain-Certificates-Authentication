import * as React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, SafeAreaView, Image, AsyncStorage } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Card } from 'react-native-elements';
import socketIOClient from "socket.io-client";

console.disableYellowBox = true;

export default function HomeScreen({ route, navigation }) {

  const [connectionDataArray, setConnectionDataArray] = React.useState([]);
  const [count, setCount] = React.useState(true);
  let dataSize = 0;
  //const [walletID, setWalletID] = React.useState();
  const walletID='CeQq0v5QY9g3c8yqzoTQKQVyc5hbzcnH8';


  async function getWalletID() {
    await AsyncStorage.getItem('userinfo').then((data) => {
      let dataInfo = JSON.parse(data);
      if (dataInfo) {
        setWalletID(dataInfo.walletId);
      }
    })
  }


  React.useEffect(() => {

    const socket = socketIOClient('http://192.168.1.8:5002/');// Change This to your IP Address
    //console.log(socket.connected)

   // getWalletID()
    console.log(walletID + "in Home")
    socket.emit('connection', walletID)
    socket.on("FromAPI", async data => {


      if (dataSize != data.length) {
        setConnectionDataArray(data);
        //console.log("changing")
        if (data.length > 0)
          setCount(true)
        else
          setCount(false)
      }

      dataSize = data.length;
    });
    if (connectionDataArray.length > 0)
      setCount(true)
    else
      setCount(false)



    return () => socket.disconnect();
  }, [walletID]);

  function ItemC({ title, url, credentialId }) { //for credential items
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

  function ItemV({ title, url, verificationId, AttReq }) { //for verification items
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('VerificationRequestDetails',
          {
            Item: AttReq,
            img: url,
            name: title,
            verificationId: verificationId
            ,
          })}
        style={[
          styles.item,
          { backgroundColor: '#ffffff' },
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


  return (
    <View style={styles.container}>
      {count ?
        (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={connectionDataArray}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                if (item.type == "Credential") {
                  return <ItemC title={item.title} url={item.image} credentialId={item.credentialId} />;

                }
                else if (item.type == "Verification") {
                  const atts = { att1: "Name", att2: "Year", att3: "GPA" };
                  //console.log("Printing the whole Item From Home: ");
                  //console.log(item);
                  return <ItemV title={item.title} url={item.image} verificationId={item.verificationId} AttReq={atts} />;
                }
              }

              } />
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

    flexDirection: 'row',
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