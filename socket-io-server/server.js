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

io.on("connection", (socket) => {
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


 const fetchCredentials= async socket => {  
    var offeredCredentials=[]
    var connectionDetails=[]
    var connectionDataArray=[]
    const res = await fetch('https://api.streetcred.id/custodian/v1/api/CrtAMYWLD5ZdkowDdHreNz9goN3kLDsUC/credentials', {
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
          const res = await fetch('https://api.streetcred.id/custodian/v1/api/CrtAMYWLD5ZdkowDdHreNz9goN3kLDsUC/connections/'+tempConnectionID, {
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
     
      console.log(offeredCredentials.length)
      console.log(connectionDetails.length)
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
      socket.emit("FromAPI", connectionDataArray);

    
  } 

server.listen(port, () => console.log(`Listening on port ${port}`));

