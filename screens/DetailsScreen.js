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
  console.log(image)
  console.log(Item)
  React.useEffect(() => {

    const socket = socketIOClient(IP_address);// Change This to your IP Address
    //console.log(socket.connected)


    //sets the array that of master data upon receiving the signal to be loaded
    socket.on("masterDegreeNotif", async data => {
      console.log("msater de" + data)
      setMasterDegree(data);
      console.log(masterDegree)
    });


    return () => socket.disconnect();
  }, [masterDegree]);

//html for the pdf
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
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="data:image/jpeg;base64,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" alt="logo" width="140" height="140" /></p>
<p id="cert-declaration" class="smaller" style="padding-left: 30px;">This is certify that <span style="color: #3366ff;">${Item.sname}</span> has successfully completed <br> the Bachelor degree of computer engineering</p>
<p id="cert-course" class="smaller" style="padding-left: 30px;"><strong>Degree: </strong>${Item.sgpa}</p>
<p id="cert-issued" class="smaller" style="padding-left: 30px;"><strong>Issued on:</strong> 25/08/2020.</p>
<div id="cert-footer" style="padding-left: 30px;">
<div id="cert-issued-by" style="padding-left: 30px;"><img id="cert-stamp" src="data:image/jpeg;base64,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" /><hr />
<p>Ain Shams Unversity Dean</p>
</div>
<div id="cert-ceo-design"><img id="cert-ceo-sign" " src="https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl=https://eng.asu.edu.eg/" />
<p>&nbsp;</p>
</div>
</div>
<div id="cert-verify">&nbsp;</div>
</body>
</html>
`;
//creating a PDF containing credential details and a QR code linking to the issuer (college) website
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
              <Text style={styles.paragraph}>Cumulative GPA: {JSON.stringify(Item.sgpa)}</Text>
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
              <Text style={styles.paragraph}>Cumulative GPA: {JSON.stringify(Item.sgpa)}</Text>
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