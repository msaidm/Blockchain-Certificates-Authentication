import * as React from 'react';
import { Header, Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, Button, AsyncStorage } from 'react-native';
//import { Card } from 'react-native-elements';
//import { RectButton, ScrollView } from 'react-native-gesture-handler';
//import { NavigationContainer } from '@react-navigation/native';
//import socketIOClient from "socket.io-client";

export default function CredsForVers({ route, navigation }) {
    const { Values } = route.params;

    const bachelorSchemaId= "WqHxTAtrKbPsEqkhHDEJK:2:Computer Bachelor Degree 3:1.1";
    const BachelorType= "Bachelor Degree";
    var possibleCreds=[];

    function chooseTheRightCred()
    {
        for(i=0;i<Values.length;i++)
        {
         if(Values[i].type == BachelorType && Values[i].schemaId==bachelorSchemaId)
         {
            possibleCreds.push(Values[i])
         }
        }
        return possibleCreds;
    }
    function Item({ name, year,gpa }) {
      return (
         <View style={styles.item}>
             <Text style={styles.paragraph}>Credential</Text>
            <Text style={styles.NormalText}>{name}</Text>
            <Text style={styles.NormalText}>{year}</Text>
            <Text style={styles.NormalText}>{gpa}</Text>
         </View>
      );
   }
return (
    <View style={styles.container}>
    {
     <SafeAreaView style={styles.container}>
        <FlatList
            data={Values}
            renderItem={({ item }) => <Item name={item.sname} year={item.syear} gpa={item.sgpa}/>}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={FlatListItemSeparator}
          />
           <View style={styles.alternativeLayoutButtonContainer}>
            <Button
                title="done"
       // onPress={() => navigation.navigate('CredsForVers',
       // {
       //   Values: credentialDataArray,
       // })}
    />
    
      </View>
    </SafeAreaView>
   
  
    }
    </View>
     
);
FlatListItemSeparator = () => {
    return (
       <View
          style={{
             height: 1,
             width: "100%",
             backgroundColor: "darkgray",
          }}
       />
    );
 }
const styles = StyleSheet.create({
    // container: {
    //    flex: 1,
    //    backgroundColor: '#fafafa',
    // },
    container: {
       flex: 1,
       // marginTop: Constants.statusBarHeight,
    },
    contentContainer: {
       paddingTop: 15,
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
    item: {
       backgroundColor: '#ff00ff00',
       padding: 5,
       marginVertical: 8,
       marginHorizontal: 16,
       flexDirection: 'row',
       flexWrap: 'wrap',
    },
    title: {
       fontSize: 30,
       padding: 5,
       fontFamily: "Josefin",
    },
    NormalText:{
      fontSize: 20,
      padding: 5,
      fontFamily: "Josefin",
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

}