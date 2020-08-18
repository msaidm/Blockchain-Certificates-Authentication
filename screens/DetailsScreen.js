import * as React from 'react';
import { StyleSheet, Text, View, Image,Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Router } from 'react-router-dom';
import { IP_address } from '../constants'
import socketIOClient from "socket.io-client";
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";
//import asuLogo from "../assets/images/logo192.jpeg"


export default function DetailsScreen({ route, navigation }) {
  const { Item } = route.params;
  const { image } = route.params
  const { name } = route.params
  const { masterDe} = route.params
  const [masterDegree, setMasterDegree] = React.useState(false);
  const [mySrc, setMysrc] = React.useState();


  React.useEffect(()  =>  {

    const socket = socketIOClient(IP_address);// Change This to your IP Address
    //console.log(socket.connected)
    
     

     socket.on("masterDegreeNotif", async data => {
       console.log("msater de"+data)
      setMasterDegree(data);
      console.log(masterDegree)
      });
      // const asset = asuLogo;
      // let src =  copyFromAssets(asset);
      // if(Platform.OS === 'ios') {
      //     src =  processLocalImageIOS(src);
      //     console.log("src "+src[0])
      // }
      // setMysrc(src[0]);

  
    

    return () => socket.disconnect();
 }, [masterDegree]);
 
//  const htmlContent = async () => {

//   try {

//     const myHtml=  `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Pdf Content</title>
//         <style>
//             body {
//                 font-size: 16px;
//                 color: rgb(255, 196, 0);
//             }
//             h1 {
//                 text-align: center;
//             }
//         </style>
//     </head>
//     <body>
//         <h1>Hello, UppLabs!</h1>
        
//     </body>
//     </html>
// `;

//       const asset = asuLogo;
//       let src = await copyFromAssets(asset);
//       if(Platform.OS === 'ios') {
//           src = await processLocalImageIOS(src);
//          // console.log("src "+src)
//       }
//       return myHtml
//   } catch (error) {
//       console.log(error);
//   }
// }

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
          width: 60%;
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
    <body>
    <h1 id="cert-title">
    Certificate of Proficiency
  </h1>
  <br><br><br><br>
  
  <p class="smaller" id="cert-declaration">
    THIS IS TO CERTIFY THAT
  </p>
  
  <h1 id="cert-holder">
    Firstname Surname
  </h1>
  
  <p class="smaller" id='cert-completed-line'>
    has successfully completed the
  </p>
  
  <h2 id="cert-course">
    Course in Question
  </h2>
  
  <div id="cert-desc"
    <p class="smaller" id='cert-details'>
      which includes the knowledge of English for Technical Conversations, Applied Mathematics, General Robotics Science, Basic Computing, Web & Mobile Development and Basic User Interface Design.
    </p>
  </div>
  
  <br>
  <p id="cert-from" class="smaller">
    &nbsp; from www.companywebsite.com
  </p>
  
  <br>
  <p class="smaller" id='cert-issued'>
   <b>Issued on:</b> {{date}}.
  </p>
  
  <div id="cert-footer">
    <div id="cert-issued-by">
      <img id="cert-stamp" src="https://i7.pngguru.com/preview/585/794/452/paper-rubber-stamp-postage-stamps-company-seal-seal-thumbnail.jpg">
      <hr>
      <p>Issued by<br>THE COMPANY S.L.</p>
    </div>
    <div id="cert-ceo-design">
      <img id="cert-ceo-sign" src="https://i7.pngguru.com/preview/585/794/452/paper-rubber-stamp-postage-stamps-company-seal-seal-thumbnail.jpg">
      <hr>
      <p>Company Ceo<br>CEO of The Company</p>
    </div>
  </div>
  
  <div id="cert-verify">
      Verify at companywebsite.ai/verify/XYZ12ER56129F. <br> 
      Company has confirmed the participation of this individual in the course.
    </div>
    </body>
    </html>
`;

const createAndSavePDF = async (html) => {
  try {
    console.log(html)
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
};
const processLocalImageIOS = async (imageUri) => {
  try {
    const uriParts = imageUri.split(".");
    const formatPart = uriParts[uriParts.length - 1];
    let format;
    if (formatPart.includes("png")) {
      format = "png";
    } else if (formatPart.includes("jpg") || formatPart.includes("jpeg")) {
      format = "jpeg";
    }
    const { base64 } = await ImageManipulator.manipulateAsync(
      imageUri,
      [],
      { format: format || "png", base64: true }
    );
    return `data:image/${format};base64,${base64}`;
  } catch (error) {
    console.log(error);
    throw error
  }
};

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
        <Button
          title="Gernerate PDF" type="outline" onPress={() => createAndSavePDF(htmlContent)} />
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