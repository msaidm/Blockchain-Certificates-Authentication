import * as React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image,Button } from 'react-native';
import { Card } from 'react-native-elements';
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

export default function DetailsScreen({ route, navigation }) {
  const { Item } = route.params;
  const { image } = route.params
  const { name } = route.params
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
               
            }
            p{
              text-align: center;
              color: rgb(0, 0, 255);
            }
            h1 {
                text-align: center;
                color: rgb(0, 0, 0);
            }
        </style>
    </head>
    <body>
        <h1> Ain Shams University </h1>
        <p> Student Name: ${Item.sname} </p>
        <p> CummIlative GPA: ${Item.sgpa} </p>
        <p> Graduation Year: ${Item.syear} </p>
    </body>
    </html>
`;
  // const { itemGPA } = route.params;
  // const {itemYear}= route.params;

  const createAndSavePDF = async (html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Card title={JSON.stringify(Item.type)}>
        <Text style={styles.paragraph}>Student name: {JSON.stringify(Item.sname)}</Text>
        <Text style={styles.paragraph}>Cummilative GPA: {JSON.stringify(Item.sgpa)}</Text>
        <Text style={styles.paragraph}>Graduation Year: {JSON.stringify(Item.syear)}</Text>
        <Button
            title="Create PDF"
            onPress={() => createAndSavePDF(htmlContent)}
          />
      
      </Card>
    </View>

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