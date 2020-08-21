import * as React from 'react';
import { Header, Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, SafeAreaView, Image, Button, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import socketIOClient from "socket.io-client";
import { IP_address, ngrok2 } from '../constants'
import verArray from '../VerificationArray.json'

export default function VerReqDetailsScreen({ route, navigation }) {
    const [walletID, setWalletID] = React.useState();
    const [credentialDataArray, setCredentialDataArray] = React.useState([]);
    const [count, setCount] = React.useState(true);
    let dataSize = 0;
    //const walletID = 'CeQq0v5QY9g3c8yqzoTQKQVyc5hbzcnH8';
    const { Item } = route.params;
    const { image } = route.params;
    const { name } = route.params;
    const { verificationId } = route.params;
    console.log(verificationId)
    // console.log("Printing current Ver ID: "+ verificationId);
    const { ChosenCredID } = route.params;
    //console.log("Printing Chosen Credential ID: " + ChosenCredID);

    var value1 = "pending credential";
    var value2 = "pending credential";
    var value3 = "pending credential";
    const PolicyName = "Name";
    var credentialId = ChosenCredID;
    const Name_req = "Name"
    const Year_req = "Year";
    const GPA_req = "GPA";
    const True = "true";
    const False = "false";
    var verificationPolicyCredentialParametersArray = [];
    var object1 = { credentialId: ChosenCredID, policyName: Name_req }
    var object2 = { credentialId: ChosenCredID, policyName: Year_req }
    var object3 = { credentialId: ChosenCredID, policyName: GPA_req }
    verificationPolicyCredentialParametersArray.push(object1);
    verificationPolicyCredentialParametersArray.push(object2);
    verificationPolicyCredentialParametersArray.push(object3);

    // ==============================================================================
    var verificationArray = JSON.stringify([
        {
            "policyName": "Name",
            "credentialId": ChosenCredID
        },
        {
            "policyName": "GPA",
            "credentialId": ChosenCredID
        },
        {
            "policyName": "Year",
            "credentialId": ChosenCredID
        }
    ])
    // console.log(arr)

    // console.log("PRINTING THE SUBMIT ARRAY HEREEEEE");
    //console.log(verificationPolicyCredentialParametersArray);


    function updatingValuesPending() {
        if (ChosenCredID != null && credentialDataArray != null) {
            for (var i = 0; i < credentialDataArray.length; i++) {
                if (credentialDataArray[i].id == ChosenCredID) {
                    value1 = credentialDataArray[i].sname;
                    value2 = credentialDataArray[i].syear;
                    value3 = credentialDataArray[i].sgpa;
                }
                else
                    console.log("Credential not present");
            }
        }
    }
    function isSubmitDisabled(str) {
        if (str == "pending credential")
            return true;
        else
            return false;
    }

    updatingValuesPending();

    async function getWalletID() {
        await AsyncStorage.getItem('userinfo').then((data) => {
            let dataInfo = JSON.parse(data);
            //console.log(dataInfo)
            if (dataInfo) {
                setWalletID(dataInfo.walletId);
            }
        })
    }

    React.useEffect(() => {

        const socket = socketIOClient(IP_address);// Change This to your IP Address
        console.log(socket.connected)

        getWalletID()
        //console.log(walletID + " in VerReqDetails")
        // socket.emit('connection', walletID)
        socket.on("IssuedCred", async data => {
            // console.log("GOWA EL ISSUEDDD")
            // console.log("before data " + data.length)
            // console.log("before original " + dataSize)
            // console.log(data)

            if (dataSize < data.length) {
                setCredentialDataArray(data);
                // console.log(data)
                //console.log("changing2")
                // console.log(credentialDataArray)
                if (data.length > 0)
                    setCount(true)
                else
                    setCount(false)
            }

            dataSize = data.length;
            //console.log(credentialDataArray)
        });

        if (credentialDataArray.length > 0)
            setCount(true)
        else
            setCount(false)

        //console.log("ana zehe2ttt")
        //console.log(credentialDataArray)


        return () => socket.disconnect();
    }, [credentialDataArray]);

    function add(arr, myID, object) {
        // const { length } = arr;
        // const id = length + 1;
        const found = arr.some(el => el.id == myID);
        if (!found) {
            arr.push(object);
        }
        return arr;
    }

    // console.log(verArray)

    async function SubmitVerificationData() {
        console.log("I ENTER THE SUBMIT FUNCTIONNNN");
        // console.log(verificationId)
        const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/verifications/' + verificationId, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
                XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
            body: verificationArray
            ,
        });
        if (!res.ok) {
            res.text().then(text => { throw Error(text) }).catch(err => {
                console.log('caught it!', err);
            })
        }
        else if (res.ok) {
            sendAcceptVerificationNotification()
        }
        res.json().then(console.log(JSON.stringify(res)))

    }

    async function sendAcceptVerificationNotification() {
        const res = await fetch(ngrok2 + '/webhook', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                "message_type": "verification_request"
            }),
        });
        res.json().then(console.log(JSON.stringify(res)))
    }


    return (
        <View>
            <Card title="Verification Request Details">
                <View style={styles.item}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.paragraph}>{name} is requesting the following attributes:</Text>
                    <Text style={styles.paragraph}>{Item.att1}:</Text>
                    {isSubmitDisabled(value1) ?
                        (<ActivityIndicator />)
                        :
                        (<Text style={styles.text}> {JSON.stringify(value1)}</Text>)
                    }

                    <Text style={styles.paragraph}>{Item.att2}:</Text>
                    {isSubmitDisabled(value1) ?
                        (<ActivityIndicator />)
                        :
                        (<Text style={styles.text}> {JSON.stringify(value2)}</Text>)
                    }

                   <Text style={styles.paragraph}>{Item.att3}:</Text>
                    {isSubmitDisabled(value1) ?
                        (<ActivityIndicator />)
                        :
                        (<Text style={styles.text}> {JSON.stringify(value3)}</Text>)
                    }
                </View>
                {/* <View style={styles.alternativeLayoutButtonContainer}> */}
                <View style={styles.oneButton}>
                    <Button
                        title="Find a Credential"
                        onPress={() => navigation.navigate("CredsForVers",
                            {
                                Values: credentialDataArray
                            })}
                    />
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Button
                        disabled={isSubmitDisabled(value1)}
                        title="Present"
                        onPress={() => SubmitVerificationData()}
                    />
                    <Button
                        title="Decline"
                        onPress={() => navigation.navigate("HomeScreen")}
                    />
                </View>



                {/* </View> */}
            </Card>
        </View >

        //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //  <Text>Details: </Text>
        //  <Text>Script Details: {JSON.stringify(Item)}</Text>
        //    </View>
    );

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
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#34495e',
    },
    title: {
        color: '#0D47A1',
        fontWeight: "bold",
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
        // margin: 20,
        // paddingRight:20,
        // paddingLeft:20,
        // marginLeft:30,
        // flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    oneButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20,
    },
    text: {
        marginTop: 25,
        fontSize: 15,
        fontWeight: 'bold',
        // textAlign: 'left',
        color: '#0D47A1',
        // flexDirection: 'row',
        // flexWrap:'wrap'
    }
});