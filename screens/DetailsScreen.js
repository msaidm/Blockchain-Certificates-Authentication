import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Router } from 'react-router-dom';
import { IP_address } from '../constants'
import socketIOClient from "socket.io-client";

export default function DetailsScreen({ route, navigation }) {
  const { Item } = route.params;
  const { image } = route.params
  const { name } = route.params
  const { masterDe} = route.params
  const [masterDegree, setMasterDegree] = React.useState(false);


  React.useEffect(() => {

    const socket = socketIOClient(IP_address);// Change This to your IP Address
    //console.log(socket.connected)
    
     

     socket.on("masterDegreeNotif", async data => {
       console.log("msater de"+data)
      setMasterDegree(data);
      console.log(masterDegree)
      });

  
    

    return () => socket.disconnect();
 }, [masterDegree]);

  console.log("ana fe det"+masterDegree )

  return (
    
    <View style={styles.container}>
      { masterDegree ?
  
      (
        <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Card title={JSON.stringify(Item.type)}>
        <Text style={styles.paragraph}>Student name: {JSON.stringify(Item.sname)}</Text>
        <Text style={styles.paragraph}>Cummilative GPA: {JSON.stringify(Item.sgpa)}</Text>
        <Text style={styles.paragraph}>Graduation Year: {JSON.stringify(Item.syear)}</Text>
        <Text style={styles.paragraph}>Master Degree GPA: 3.85</Text>
        <Text style={styles.paragraph}>Master Degree Year: 2020</Text>
      </Card> 
      </View>
      
      )
  
      : 

      (
        <View style={styles.container}>
       
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Card title={JSON.stringify(Item.type)}>
        <Text style={styles.paragraph}>Student name: {JSON.stringify(Item.sname)}</Text>
        <Text style={styles.paragraph}>Cummilative GPA: {JSON.stringify(Item.sgpa)}</Text>
        <Text style={styles.paragraph}>Graduation Year: {JSON.stringify(Item.syear)}</Text>
      </Card>
      </View>
      )

    }
  
    </View>
    
      
    
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
});

