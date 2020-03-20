import * as React from 'react';
import {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

// funtion HttpExample extends Component {
//   state = {
//      data: ''
//   }
//   componentDidMount = () => {
//      fetch('https://api.streetcred.id/custodian/v1/api/C44H0ImYvrWRpsBVcCHLfjU53UbPUNQiV/connections', {
//         method: 'GET',
//         headers: {
//           Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
//           XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
//           Accept: 'application/json',
//      }})
//      .then((response) => response.json())
//      .then((responseJson) => {
//         console.log(responseJson);
//         this.setState({
//            data: responseJson
//         })
//      })
//      .catch((error) => {
//         console.error(error);
//      });
//   }
//   render() {
//      return (
//         <View>
//            <Text>
//               {this.state.data.body}
//            </Text>
//         </View>
//      )
//   }
// }
//export default HttpExample

export default function LinksScreen() {
  console.log(getMoviesFromApi());

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="md-school"
        label="Read the Expo documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />
    </ScrollView>
  );
}

async function getMoviesFromApi() {
  try {
    let response = await fetch('https://reactnative.dev/movies.json');
    let responseJson = await response.json();
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
