const express = require("express");
const http = require("http");
var parser = require('body-parser');
var cors = require('cors');
const socketIo = require("socket.io");
const fetch = require('node-fetch');


const port = process.env.PORT || 5002;
const index = require("./index");

const app = express();
app.use(index);
app.use(cors());
app.use(parser.json());

const server = http.createServer(app);

const io = socketIo(server);

let intervalOldCred;
let intervalConnData;
let intervalIssued;
let intervalVerOffer;

let CredOffer;
let NewConn;
let NewCredInterval;
let NewVerInterval;

var connectionDataArray = []
var verDataArray = []
var issuedCredentials = [];
var issuedBachelorCredentials = []
var connectionDetailsArray = []
let walletID;


app.post('/webhook', async function (req, res) {
  try {
      //console.log("got webhook" + req + "   type: " + req.body.message_type);
      if (req.body.message_type === 'MasterDegree_offer') {
            console.log("new Master Degree notif");
            interval = setInterval(() => io.emit("masterDegreeNotif",true), 2000);

            
            console.log("ba3at master deg")
            
      }

      if (req.body.message_type === 'Cred_offer') {
        console.log("new Cred offer notif");
        
        let timesRun = 0;
        CredOffer = setInterval(() => {
          fetchCredentials(walletID);
          //console.log("waled id fe cred offer"+ walletID)
          timesRun += 1;
          console.log(timesRun+"New CRed offer nofti")
          if(timesRun > 5){
            console.log("da5lt el cond")
           clearInterval(CredOffer);
          }
        io.emit("CredOfferNotif",connectionDataArray)}, 3000);

        
        
      } 

      if (req.body.message_type === 'NewConnection') {
        console.log("NewConnection");
        
        let timesRun = 0;
        NewConn = setInterval(() => {
          console.log("walletID "+walletID)
          fetchConnections(walletID);
          timesRun += 1;
          console.log(timesRun+" new Conn")
          if(timesRun > 5){
            
           clearInterval(NewConn);
          }
          console.log(connectionDetailsArray.length)
        io.emit("ConnectionData",connectionDetailsArray)}, 3000);  
        
      }

      if (req.body.message_type === 'NewCred') {
        console.log("NewCred");
        
        let timesRun = 0;
        NewCredInterval = setInterval(() => {
          fetchCredentials(walletID);
          timesRun += 1;
          if(timesRun > 5){
           clearInterval(NewCredInterval);
          }
        io.emit("IssuedCred",issuedCredentials)}, 2000);  
      }

      if (req.body.message_type === 'NewVer') {
        console.log("NewVer");
        
        let timesRun = 0;
        NewVerInterval = setInterval(() => {
          fetchVerifications(walletID);
          timesRun += 1;
          if(timesRun > 5){
           clearInterval(NewVerInterval);
          }
        io.emit("NewVerOffer",verDataArray)}, 2000);  
      }

      


  }
  catch (e) {
      console.log(e.message || e.toString());
  }
});


io.on("connection", (socket) => {
  
  console.log("Client connected");
  socket.on('sendWalletIDOnConnection', data => {
    console.log('wallet Id from the client'+ data);
    walletID = data;
  });

  socket.on('removeOffer', data => {
    console.log("offer yetshal")
    var timesRunOfferedData = 0;
    intervalOfferedData = setInterval(() => {
          
          fetchCredentials(walletID);
          timesRunOfferedData += 1;
          console.log(timesRunOfferedData + " remove offer")
          if(timesRunOfferedData > 5){
           clearInterval(intervalOfferedData);
           console.log("Inside remove offer")
          
          }
        //socket.emit("test","ANA AY DATA")
        socket.emit("CredOfferNotif",connectionDataArray)}, 2000);
  });

  // var timesRunOldCredOffer = 0;
  //       intervalOldCred = setInterval(() => {
  //         fetchVerifications(walletID);
  //         timesRunOldCredOffer += 1;
  //         console.log(timesRunOldCredOffer)
  //         if(timesRunOldCredOffer > 5){
  //           console.log("???")
  //          clearInterval(intervalOldCred);
  //          clearInterval(intervalOldCred);
  //         }
  //         console.log(verDataArray)
  //       socket.emit("oldCredOffers",verDataArray)}, 3000);

  // socket.on('loadOldCred', data => {
  //   console.log("!!")
    
  // });

  socket.on('loadOldConn', data => {
    console.log("gat")
    var timesRunConnData = 0;
  intervalConnData = setInterval(() => {
          
          fetchConnections(walletID);
          timesRunConnData += 1;
          console.log("Connections"+timesRunConnData)
          if(timesRunConnData > 5){
            console.log("???")
           clearInterval(intervalConnData);
          }
        socket.emit("ConnectionData",connectionDetailsArray)}, 2000);
  });

  socket.on('loadOldIssu', data => {
    //console.log("Issued")
    var timesIssuedCred = 0;
        intervalIssued = setInterval(() => {
          
          fetchCredentials(walletID);
          
          timesIssuedCred += 1;
          console.log("Isssued"+timesIssuedCred)
          if(timesIssuedCred > 5){
            console.log("???")
           clearInterval(intervalIssued);
          }
        
        socket.emit("IssuedCred",issuedCredentials)}, 3000);
  });

  
  //fetchCredentials();
  // if (interval) {
  //   clearInterval(interval);
  // }
  //interval = setInterval(() => fetchCredentials(socket), 2000);
  //
  
 // console.log(connectionDataArray);
  
        
        // var timesRunNewVer = 0;
        // intervalVerOffer = setInterval(() => {
        //   fetchVerifications(walletID)
        //   timesRunNewVer += 1;
        //   console.log(timesRunNewVer)
        //   if(timesRunNewVer > 5){
        //     console.log("???")
        //    clearInterval(intervalVerOffer);
        //   }
        
        // socket.emit("NewVerOffer",verDataArray)}, 3000);

        

        

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

function addConnectionDetails(arr, myID, object) {
  const found = arr.some(el => el.id == myID);
  if (!found) {
    arr.push(object);
  }
  return arr;
}

async function fetchVerifications(walletID) {
  var requestedVerifications = []
  var verificationDetails = []
  const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/verifications', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
      XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
      Accept: 'application/json',
    },
  });
  var ver = await res.json();
  for (let index = 0; index < ver.length; index++) {
    if (ver[index].state == "Requested") {
      requestedVerifications.push(ver[index])
      let tempVerConnectionID = ver[index].connectionId;
      const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections/' + tempVerConnectionID, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
          XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
          Accept: 'application/json',
        },
      });

      var details = await res.json();
      verificationDetails.push(details);

      if (verificationDetails.length > 0) {
        for (let index = 0; index < requestedVerifications.length; index++) {
          for (let index2 = 0; index2 < verificationDetails.length; index2++) {
            if (verificationDetails[index2].connectionId === requestedVerifications[index].connectionId) {
              const objj = { id: verificationDetails[index2].connectionId, verificationId: requestedVerifications[index].verificationId, title: verificationDetails[index2].name, image: verificationDetails[index2].imageUrl, type: 'Verification' };
              verDataArray = addConnectionDetails(verDataArray, objj.id, objj);
            }
          }
        }
      }
    }
  }

  for (let index = 0; index < ver.length; index++) {
    if (ver[index].state == "Accepted") {
      for (let index3 = 0; index3 < verDataArray.length; index3++) {
        if (verDataArray[index3].verificationId == ver[index].verificationId) {
          verDataArray.splice(index3, 1)
        }
      }
    }
  }
}

async function fetchConnections(walletID) {

  const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
      XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
      Accept: 'application/json',
    },
  });
  var connections = await res.json()
  //console.log(JSON.stringify(res))

  if (connections.length > 0) {
    for (let index = 0; index < connections.length; index++) {
      const obj = { id: connections[index].connectionId, title: connections[index].name, image: connections[index].imageUrl };
      // setData(add(DATA, obj.id, obj))
      connectionDetailsArray = addConnectionDetails(connectionDetailsArray, obj.id, obj)
      //console.log(connectionDetailsArray)
      ///to make the index with the connectionID
    }
  }
}
const fetchCredentials = async (walletID) => {
  // fetchVerifications();
  // fetchConnections(walletID);

  var offeredCredentials = []
  var connectionDetails = []
  const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/credentials', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
      XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
      Accept: 'application/json',
    },
  });
  var cred = await res.json();

  for (let index = 0; index < cred.length; index++) {
    if (cred[index].state == "Offered") {
      offeredCredentials.push(cred[index])
      let tempConnectionID = cred[index].connectionId;
      const res = await fetch('https://api.streetcred.id/custodian/v1/api/' + walletID + '/connections/' + tempConnectionID, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
          XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
          Accept: 'application/json',
        },
      });
      var connection = await res.json();
      connectionDetails.push(connection);

    }
    else if (cred[index].state == "Issued") {
      if (cred[index].values.Type == "Bachelor Degree") {
    
        const data = cred[index].values
        const obj = { id: cred[index].credentialId, sname: data.Name, sgpa: data.GPA, syear: data.Year, type: data.Type, connID: cred[index].connectionId, schemaId: cred[index].schemaId, date: cred[index].issuedAtUtc }
        
        issuedBachelorCredentials = addConnectionDetails(issuedBachelorCredentials, obj.id, obj);

      }
      const data = cred[index].values
      const obj = { id: cred[index].credentialId, sname: data.Name, sgpa: data.GPA, syear: data.Year, type: data.Type, connID: cred[index].connectionId, schemaId: cred[index].schemaId, date: cred[index].issuedAtUtc }
  
      issuedCredentials = addConnectionDetails(issuedCredentials, obj.id, obj);
      //console.log(issuedBachelorCredentials.length + "dah lenghth el issued cred")
      // for (let index2 = 0; index2 < connectionDataArray.length; index2++) {
      //   if (connectionDataArray[index2].credentialId == cred[index].credentialId) {
      //     connectionDataArray.splice(index2, 1)
      //   }

      // }
    }
  }

  // console.log(offeredCredentials.length)
  // console.log(connectionDetails.length)

  if (connectionDetails.length > 0) {
    for (let index = 0; index < offeredCredentials.length; index++) {
      for (let index2 = 0; index2 < connectionDetails.length; index2++) {
        if (connectionDetails[index2].connectionId === offeredCredentials[index].connectionId) {
          const obj = { id: connectionDetails[index2].connectionId, credentialId: offeredCredentials[index].credentialId, title: connectionDetails[index2].name, image: connectionDetails[index2].imageUrl, type: 'Credential' };
          connectionDataArray = addConnectionDetails(connectionDataArray, obj.id, obj);
        }
      }
    }
  }

  for (let index = 0; index < cred.length; index++) {
    if (cred[index].state == "Issued") {
      // console.log("hena")
      for (let index2 = 0; index2 < connectionDataArray.length; index2++) {
        if (connectionDataArray[index2].credentialId == cred[index].credentialId) {
          connectionDataArray.splice(index2, 1)
        }
      }
    }
  }




  //  console.log(issuedCredentials)
  //console.log(connectionDataArray.length)
  //socket.emit("FromAPI", connectionDataArray);
  // socket.emit("IssuedCred", issuedCredentials);
  // socket.emit("BachelorCreds", issuedBachelorCredentials)
  // socket.emit("ConnectionsData", connectionDetailsArray);
  //console.log("My wallet"+walletID)


}

server.listen(port, () => console.log(`Listening on port ${port}`));
