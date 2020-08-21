import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { IP_address } from '../constants'
import socketIOClient from "socket.io-client";
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";



export default function DetailsScreen({ route, navigation }) {
  const { Item } = route.params;
  const { image } = route.params
  const { name } = route.params
  const [masterDegree, setMasterDegree] = React.useState(false);

  console.log(Item)
  React.useEffect(() => {

    const socket = socketIOClient(IP_address);// Change This to your IP Address
    //console.log(socket.connected)



    socket.on("masterDegreeNotif", async data => {
      console.log("msater de" + data)
      setMasterDegree(data);
      console.log(masterDegree)
    });


    return () => socket.disconnect();
  }, [masterDegree]);


  const htmlContent =
    `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pdf Content</title>
    <style>
    url('https://fonts.googleapis.com/css?family=Saira+Condensed:700');
    hr {
      background-color: #be2d24;
      height: 3px;
      margin: 5px;
    }
    
    div#cert-footer {
      position: absolute;
      width: 90%;
      top: 550px;
      text-align: center;
    }
    
    #cert-stamp, #cert-ceo-sign {
      width: 60%;
      display: inline-block;
    }
    
    div#cert-issued-by, div#cert-ceo-design {
      width: 40%;
      display: inline-block;
      float: left;
    }
    
    div#cert-ceo-design {
      
      margin-left: 10%;
    }
    
    h1 {
      font-family: 'Saira Condensed', sans-serif;
      margin: 5px 0px;
    }
    
    body {
      width: device-width;
      height: 690px;
      position: absolute;
      left: 30px;
      top: 30px;
      
    }
    
    p {
      font-family: 'Arial', sans-serif;
      font-size: 18px;
      margin: 5px 0px;
    }
    
    html {
      display: inline-block;
      width: device-width;
      height: 768px;
      
      background: #eee url("https://images.all-free-download.com/images/graphicthumb/simple_lace_texture_background_vector_288270.jpg") no-repeat; background-size: 100%;
    }
    
    h1#cert-holder {
      font-size: 50px;
      color: #be2d24;
    }
    
    p.smaller {
      font-size: 17px !important;
    }
    
    div#cert-desc {
      width: 70%;
    }
    
    p#cert-from {
      color: #be2d24;
      font-family: 'Saira Condensed', sans-serif;
    }
    
    div#cert-verify {
      opacity: 1;
      position: absolute;
      top: 680px;
      left: 60%;
      font-size: 12px;
      color: grey;
    }
    </style>
</head>
<body><!DOCTYPE html>
<html lang="en">
<head>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1 id="cert-title" style="text-align: center;"><span style="color: #0000ff;">Ain Shams University</span></h1>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://eng.asu.edu.eg/archive/download/68238" alt="logo" width="140" height="140" /></p>
<p id="cert-declaration" class="smaller" style="padding-left: 30px;">This is certify that <span style="color: #3366ff;">${Item.sname}</span> has successfully completed <br> the Bachelor degree of computer engineering</p>
<p id="cert-course" class="smaller" style="padding-left: 30px;"><strong>Degree: </strong>${Item.sgpa}</p>
<p id="cert-issued" class="smaller" style="padding-left: 30px;"><strong>Issued on:</strong> 25/08/2020.</p>
<div id="cert-footer" style="padding-left: 30px;">
<div id="cert-issued-by" style="padding-left: 30px;"><img id="cert-stamp" src="data:image/jpeg;base64,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" /><hr />
<p>Ain Shams Unversity Dean</p>
</div>
<div id="cert-ceo-design"><img id="cert-ceo-sign" " src="https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl=https://www.mrc-productivity.com/techblog/?p=1172" />
<p>&nbsp;</p>
</div>
</div>
<div id="cert-verify">&nbsp;</div>
</body>
</html>
`;

  const createAndSavePDF = async (html) => {
    try {
      //console.log(html)
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

  const copyFromAssets = async (asset) => {
    try {
      await Asset.loadAsync(asset);
      const { localUri } = Asset.fromModule(asset);
      return localUri;
    } catch (error) {
      console.log(error);
      throw err;
    }
  }
  console.log("ana fe det" + masterDegree)

  return (

    <View style={styles.container}>
      {masterDegree ?

        (
          <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Image source={{ uri: image }} style={styles.image} />
            <Card title="Masters Degree ">
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
            <Card title={JSON.stringify(Item.type)} >
              <Text style={styles.paragraph}>Student name: {JSON.stringify(Item.sname)}</Text>
              <Text style={styles.paragraph}>Cummilative GPA: {JSON.stringify(Item.sgpa)}</Text>
              <Text style={styles.paragraph}>Graduation Year: {JSON.stringify(Item.syear)}</Text>
              <Button
                title="Download PDF" type="outline" onPress={() => createAndSavePDF(htmlContent)} />
            </Card>
          </View>
        )
      }
    </View>

  );

};





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