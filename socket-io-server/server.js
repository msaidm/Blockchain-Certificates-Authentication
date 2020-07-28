const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fetch = require('node-fetch');


const port = process.env.PORT || 5002;
const index = require("./index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); 

let interval; 
var connectionDataArray =[]

let walletID;





io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on('connection', data => {
    console.log('hey', data);
    walletID=data;
  });
    fetchCredentials(socket);
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => fetchCredentials(socket), 1000);
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

 async function fetchVerifications() {
  var requestedVerifications=[]
  var verificationDetails=[]
    const res = await fetch('https://api.streetcred.id/custodian/v1/api/'+walletID+'/verifications', {
       method: 'GET',
       headers: {
        Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
        XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
          Accept: 'application/json',
       },
    });
    var ver = await res.json();
    for (let index = 0; index < ver.length ; index++) 
        {
          if(ver[index].state=="Requested")
          {
            requestedVerifications.push(ver[index])
            let tempVerConnectionID= ver[index].connectionId;
            const res = await fetch('https://api.streetcred.id/custodian/v1/api/'+walletID+'/connections/'+tempVerConnectionID, {
              method: 'GET',
              headers: {
                Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
                XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
                  Accept: 'application/json',
              },
            });
            
            var details = await res.json();
            verificationDetails.push(details);

            if(verificationDetails.length>0)
              {
                for (let index = 0; index < requestedVerifications.length; index++) 
                {
                    for (let index2 = 0; index2 < verificationDetails.length; index2++) 
                    {
                      if( verificationDetails[index2].connectionId === requestedVerifications[index].connectionId)
                      {
                        const objj = { id: verificationDetails[index2].connectionId,verificationId:requestedVerifications[index].verificationId, title: verificationDetails[index2].name, image: verificationDetails[index2].imageUrl , type:'Verification' }; 
                        connectionDataArray=addConnectionDetails(connectionDataArray,objj.id,objj); 
                      }
                    }
                }
              }  
         }
        }
      }

 const fetchCredentials= async socket => {  
    fetchVerifications();
    var offeredCredentials=[]
    var connectionDetails=[]
    const res = await fetch('https://api.streetcred.id/custodian/v1/api/'+walletID+'/credentials', {
       method: 'GET',
       headers: {
        Authorization: 'Bearer L2JBCYw6UaWWQiRZ3U_k6JHeeIkPCiKyu5aR6gxy4P8',
        XStreetcredSubscriptionKey: '4ed313b114eb49abbd155ad36137df51',
          Accept: 'application/json',
       },
    });
    var cred = await res.json();

    for (let index = 0; index < cred.length ; index++) 
      {
        if(cred[index].state=="Offered")
        {  
          offeredCredentials.push(cred[index])
          let tempConnectionID= cred[index].connectionId;
          const res = await fetch('https://api.streetcred.id/custodian/v1/api/'+walletID+'/connections/'+tempConnectionID, {
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

      }
     
      //  console.log(offeredCredentials.length)
      //  console.log(connectionDetails.length)
      //  console.log(connectionDataArray.length)

      if(connectionDetails.length>0)
          {
            for (let index = 0; index < offeredCredentials.length; index++) {
              for (let index2 = 0; index2 < connectionDetails.length; index2++) {
                if( connectionDetails[index2].connectionId === offeredCredentials[index].connectionId){
                  const obj = { id: connectionDetails[index2].connectionId,credentialId:offeredCredentials[index].credentialId, title: connectionDetails[index2].name, image: connectionDetails[index2].imageUrl, type:'Credential' };  
                  connectionDataArray=addConnectionDetails(connectionDataArray,obj.id,obj); 
                }
              }
            }
          }

    for (let index = 0; index < cred.length; index++) 
    {
      if(cred[index].state=="Issued")
        {
          console.log("hena")
          for (let index2 = 0; index2 < connectionDataArray.length; index2++) {
              if(connectionDataArray[index2].credentialId == cred[index].credentialId)
              {
                connectionDataArray.splice(index2,1)
                //setOfferedCredentialsArraySize(offeredCredentials.length);
              }
          }    
        }
    }



          console.log(connectionDataArray.length)
      socket.emit("FromAPI", connectionDataArray);
      //console.log("My wallet"+walletID)

    
  } 

server.listen(port, () => console.log(`Listening on port ${port}`));

